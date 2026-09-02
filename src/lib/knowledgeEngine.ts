import { 
  CrisisSafetyCheck, 
  GitaSearchQuery, 
  RankedVerseMatch, 
  SourceCommentary, 
  VerseKnowledgeEntry 
} from '../types/gitaKnowledge';
import { GITA_KNOWLEDGE_GRAPH } from '../data/knowledgeGraph';
import { PROBLEM_TAXONOMY, PERSONA_TAXONOMY, GITA_CONCEPTS_TAXONOMY } from '../data/taxonomy';
import { SOURCE_BOOKS } from '../data/sourcesRegistry';

/**
 * GitaLens — High-Performance Reverse Retrieval & Knowledge Engine
 */

// --------------------------------------------------------------------------
// 1. Safety Boundary & Crisis Detection Layer
// --------------------------------------------------------------------------
const CRISIS_KEYWORDS = [
  'suicide', 'kill myself', 'end my life', 'want to die', 'harm myself', 'cutting',
  'आत्महत्या', 'जीव द्यावा', 'मरावे वाटते', 'स्वतःला संपवणे', 'कापून घेणे',
  'severe abuse', 'assault', 'violence', 'heart attack', 'overdose'
];

export function checkSafetyBoundaries(input: string): CrisisSafetyCheck {
  const lower = input.toLowerCase();
  const matched = CRISIS_KEYWORDS.find(kw => lower.includes(kw));

  if (matched) {
    return {
      isCrisis: true,
      category: 'self_harm',
      safetyMessage_en: 'If you or someone you know is going through a severe emotional crisis, experiencing thoughts of self-harm, or facing an emergency, please connect immediately with compassionate, professional support. The Bhagavad Gita offers spiritual solace, but it is not a substitute for crisis intervention.',
      safetyMessage_mr: 'जर तुम्ही किंवा तुमची ओळखीची व्यक्ती गंभीर मानसिक तणावातून जात असेल किंवा स्वतःला इजा पोहोचवण्याचा विचार करत असेल, तर कृपया त्वरित तज्ज्ञांची मदत घ्या. श्रीमद्भगवद्गीता आत्मिक शांती देते, परंतु आपत्कालीन वैद्यकीय किंवा मानसिक उपचारांची ही जागा घेऊ शकत नाही.',
      helplines: [
        { name: 'KIRAN Mental Health Helpline (India)', contact: '1800-599-0019 (24/7 Toll-Free)' },
        { name: 'Vandrevala Foundation (India)', contact: '+91 9999 666 555' },
        { name: 'Tele-MANAS (Govt of India)', contact: '14416 / 1800-891-4416' },
        { name: 'Crisis Support (International)', contact: 'Dial 988 or visit 988lifeline.org' }
      ]
    };
  }

  return { isCrisis: false };
}

// --------------------------------------------------------------------------
// 2. Multi-Stage Problem-to-Verse Reverse Retrieval System
// --------------------------------------------------------------------------
export function searchGitaKnowledge(query: GitaSearchQuery): {
  matches: RankedVerseMatch[];
  detectedLanguage: 'en' | 'mr';
  detectedProblems: string[];
  detectedPersonas: string[];
  detectedConcepts: string[];
  safetyCheck: CrisisSafetyCheck;
} {
  const queryText = (query.queryText || '').trim();
  const lowerText = queryText.toLowerCase();

  // Step 1: Safety check
  const safetyCheck = checkSafetyBoundaries(queryText);

  // Step 2: Language detection
  const isMarathiText = /[\u0900-\u097F]/.test(queryText) || query.language === 'mr';
  const detectedLanguage = isMarathiText ? 'mr' : 'en';

  // Step 3: Taxonomy concept & problem tag matching
  const matchedProblems: string[] = [];
  const matchedPersonas: string[] = query.persona ? [query.persona] : [];
  const matchedConcepts: string[] = [];

  // Problem extraction
  for (const prob of PROBLEM_TAXONOMY) {
    const kwList = isMarathiText ? prob.keywords_mr : prob.keywords_en;
    const hit = kwList.some(kw => lowerText.includes(kw.toLowerCase()));
    if (hit || prob.slug.includes(lowerText)) {
      matchedProblems.push(prob.slug);
    }
  }

  // Persona extraction
  for (const persona of PERSONA_TAXONOMY) {
    if (query.persona && persona.type === query.persona) {
      if (!matchedPersonas.includes(persona.type)) matchedPersonas.push(persona.type);
    } else {
      const matchPersonaKw = isMarathiText 
        ? persona.title_mr.toLowerCase().split(' ')
        : persona.title_en.toLowerCase().split(' ');
      if (matchPersonaKw.some(kw => kw.length > 3 && lowerText.includes(kw))) {
        if (!matchedPersonas.includes(persona.type)) matchedPersonas.push(persona.type);
      }
    }
  }

  // Concept extraction
  for (const concept of GITA_CONCEPTS_TAXONOMY) {
    if (
      lowerText.includes(concept.name_sanskrit.toLowerCase()) ||
      lowerText.includes(concept.name_english.toLowerCase()) ||
      lowerText.includes(concept.name_marathi.toLowerCase()) ||
      concept.related_concepts.some(rc => lowerText.includes(rc))
    ) {
      matchedConcepts.push(concept.id);
    }
  }

  // Step 4: Scoring every verse entry in knowledge graph
  const scoredMatches: RankedVerseMatch[] = GITA_KNOWLEDGE_GRAPH.map((verseEntry) => {
    let score = 0;
    const matchedEmotionsList: string[] = [];
    const matchedProblemList: string[] = [];
    const matchedPersonaList: any[] = [];
    const matchedConceptList: string[] = [];

    // Factor A: Direct problem intersection (Weight: 40%)
    for (const prob of matchedProblems) {
      if (verseEntry.retrieval.problem_slugs.includes(prob)) {
        score += 0.40;
        matchedProblemList.push(prob);
      }
    }

    // Factor B: Keyword and semantic text match (Weight: 30%)
    const allKeywords = [
      ...verseEntry.retrieval.search_keywords_en,
      ...verseEntry.retrieval.search_keywords_mr,
      verseEntry.canonical.chapter_theme,
      verseEntry.application.problem_context
    ];

    const tokens = queryText.toLowerCase().split(/\s+/).filter(t => t.length > 2);
    let tokenHits = 0;
    for (const token of tokens) {
      if (allKeywords.some(kw => kw.toLowerCase().includes(token))) {
        tokenHits++;
      }
    }
    if (tokens.length > 0) {
      score += Math.min(0.30, (tokenHits / tokens.length) * 0.35);
    }

    // Factor C: Persona alignment (Weight: 15%)
    for (const p of matchedPersonas) {
      if (verseEntry.retrieval.persona_slugs.includes(p as any)) {
        score += 0.15;
        matchedPersonaList.push(p);
      }
    }

    // Factor D: Concept intersection (Weight: 15%)
    for (const c of matchedConcepts) {
      if (verseEntry.retrieval.concept_slugs.includes(c)) {
        score += 0.15;
        matchedConceptList.push(c);
      }
    }

    // Base default weight
    score += (verseEntry.retrieval.relevance_weight_default || 0.8) * 0.1;

    // Optional: Filter by selected commentary source if requested
    let matchedSourceCommentary: SourceCommentary | undefined;
    if (query.selectedSourceId) {
      matchedSourceCommentary = verseEntry.commentaries.find(c => c.source_id === query.selectedSourceId);
      if (matchedSourceCommentary) {
        score += 0.2;
      }
    }

    const normalizedScore = Math.min(1.0, Math.round(score * 100) / 100);

    const reasonEn = matchedProblemList.length > 0
      ? `Addresses ${matchedProblemList.join(', ')} with timeless clarity.`
      : `Provides foundational wisdom for spiritual equanimity and disciplined action.`;

    const reasonMr = matchedProblemList.length > 0
      ? `${matchedProblemList.join(', ')} या समस्येवर मार्गदर्शन प्रदान करते.`
      : `समत्व बुद्धी आणि निष्काम कर्मयोगासाठी मार्गदर्शक.`;

    return {
      verse: verseEntry,
      score: normalizedScore,
      matchedEmotions: matchedEmotionsList,
      matchedProblems: matchedProblemList,
      matchedPersonas: matchedPersonaList,
      matchedConcepts: matchedConceptList,
      matchedSourceCommentary,
      relevanceReason: isMarathiText ? reasonMr : reasonEn
    };
  });

  // Step 5: Sort descending by score
  scoredMatches.sort((a, b) => b.score - a.score);

  const limit = query.limit || 5;
  const topMatches = scoredMatches.slice(0, limit);

  return {
    matches: topMatches,
    detectedLanguage,
    detectedProblems: matchedProblems,
    detectedPersonas: matchedPersonas,
    detectedConcepts: matchedConcepts,
    safetyCheck
  };
}

// --------------------------------------------------------------------------
// 3. Multi-Source Commentary Comparison Utility
// --------------------------------------------------------------------------
export function compareVerseCommentaries(verseId: string): {
  verse: VerseKnowledgeEntry | undefined;
  marathiCommentaries: SourceCommentary[];
  englishCommentaries: SourceCommentary[];
  allSourcesMetadata: typeof SOURCE_BOOKS;
} {
  const verse = GITA_KNOWLEDGE_GRAPH.find(v => v.verse_id === verseId);
  if (!verse) {
    return {
      verse: undefined,
      marathiCommentaries: [],
      englishCommentaries: [],
      allSourcesMetadata: SOURCE_BOOKS
    };
  }

  const marathi = verse.commentaries.filter(c => c.language === 'marathi');
  const english = verse.commentaries.filter(c => c.language === 'english');

  return {
    verse,
    marathiCommentaries: marathi,
    englishCommentaries: english,
    allSourcesMetadata: SOURCE_BOOKS
  };
}
