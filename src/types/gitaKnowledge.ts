/**
 * GitaLens — Bhagavad Gita Knowledge Database Ingestion Specification
 * Core Type Definitions & 8-Layer Knowledge Architecture
 */

export type SourceLanguage = 'marathi' | 'english' | 'sanskrit';

export type CopyrightStatus = 
  | 'public_domain'       // e.g. Dnyaneshwari, Gandhi (Gita according to Gandhi), Historical texts
  | 'open_license'        // Creative Commons or open cultural licenses
  | 'authorized_full_text'// Provided with explicit publisher rights
  | 'fair_use_summary';   // Copyright-protected: stores metadata, summaries, concepts, short quotes only

export interface SourceBook {
  id: string;
  source_number: number;
  title_original: string;
  title_english: string;
  author_original: string;
  author_english: string;
  language: SourceLanguage;
  publisher?: string;
  year_or_era: string;
  copyright_status: CopyrightStatus;
  legal_notice: string;
  description: string;
  commentary_approach: string; // e.g. "Advaita", "Bhakti", "Karma Yoga", "Universal/Psychological", "Philosophical"
}

// -------------------------------------------------------------
// Layer 1 & 2: Canonical Gita & Word Analysis
// -------------------------------------------------------------
export interface WordAnalysis {
  word_sanskrit: string;
  word_transliteration: string;
  meaning_english: string;
  meaning_marathi: string;
  grammatical_role?: string;
}

export interface CanonicalVerse {
  verse_id: string; // e.g., "BG_2_47"
  chapter_number: number;
  verse_number: number;
  chapter_name_sanskrit: string;
  chapter_name_marathi: string;
  chapter_name_english: string;
  chapter_theme: string;
  shloka_devanagari: string;
  shloka_transliteration_iast: string;
  padaccheda: string[]; // Word segmentation
  word_analysis: WordAnalysis[];
}

// -------------------------------------------------------------
// Layer 3: Attributed Commentary from Sources
// -------------------------------------------------------------
export interface SourceCommentary {
  source_id: string;
  source_name: string;
  author: string;
  language: SourceLanguage;
  core_interpretation: string; // Source-specific insight
  practical_teaching: string;  // How this specific author applies it
  key_quotes?: string[];       // Legally permissible short quotes
  is_summary_only: boolean;
  page_reference?: string;
  verified: boolean;
}

// -------------------------------------------------------------
// Layer 4, 5, 6: Concepts, Problems, Personas
// -------------------------------------------------------------
export type PersonaType = 
  | 'student'
  | 'child'
  | 'teacher'
  | 'parent'
  | 'professional'
  | 'entrepreneur'
  | 'leader'
  | 'senior_citizen'
  | 'general_user';

export type ProblemCategory = 
  | 'student_problems'
  | 'emotional_problems'
  | 'career_problems'
  | 'relationship_problems'
  | 'life_problems'
  | 'social_professional_problems';

export interface GitaConcept {
  id: string;
  name_sanskrit: string;
  name_english: string;
  name_marathi: string;
  definition_en: string;
  definition_mr: string;
  related_concepts: string[];
}

// -------------------------------------------------------------
// Layer 7: Practical Real-Life Application
// -------------------------------------------------------------
export interface StructuredApplication {
  problem_context: string;
  simple_meaning_en: string;
  simple_meaning_mr: string;
  gita_core_teaching_en: string;
  gita_core_teaching_mr: string;
  real_life_connection_en: string;
  real_life_connection_mr: string;
  modern_realistic_example_en: string;
  modern_realistic_example_mr: string;
  practical_actions_en: string[];
  practical_actions_mr: string[];
  reflection_question_en: string;
  reflection_question_mr: string;
}

// -------------------------------------------------------------
// Layer 8: Semantic Embedding & Retrieval Metadata
// -------------------------------------------------------------
export interface RetrievalMetadata {
  search_keywords_en: string[];
  search_keywords_mr: string[];
  emotion_tags: string[];
  problem_slugs: string[];
  persona_slugs: PersonaType[];
  concept_slugs: string[];
  semantic_summary: string;
  relevance_weight_default: number;
}

// -------------------------------------------------------------
// Unified Master Verse Knowledge Entry (8-Layer Record)
// -------------------------------------------------------------
export interface VerseKnowledgeEntry {
  verse_id: string; // e.g. "BG_2_47"
  chapter_number: number;
  verse_number: number;
  canonical: CanonicalVerse;
  translation_literal_en: string;
  translation_literal_mr: string;
  translation_poetic_en: string;
  translation_poetic_mr: string;
  commentaries: SourceCommentary[];
  application: StructuredApplication;
  retrieval: RetrievalMetadata;
  verification_status: 'verified' | 'unverified';
}

// -------------------------------------------------------------
// Query & Search Interfaces
// -------------------------------------------------------------
export interface GitaSearchQuery {
  queryText: string;
  language?: 'en' | 'mr' | 'auto';
  persona?: PersonaType;
  category?: ProblemCategory;
  selectedSourceId?: string;
  limit?: number;
}

export interface RankedVerseMatch {
  verse: VerseKnowledgeEntry;
  score: number; // 0.0 - 1.0
  matchedEmotions: string[];
  matchedProblems: string[];
  matchedPersonas: PersonaType[];
  matchedConcepts: string[];
  matchedSourceCommentary?: SourceCommentary;
  relevanceReason: string;
}

export interface CrisisSafetyCheck {
  isCrisis: boolean;
  category?: 'self_harm' | 'medical' | 'immediate_danger' | 'severe_abuse' | 'legal';
  safetyMessage_en?: string;
  safetyMessage_mr?: string;
  helplines?: { name: string; contact: string }[];
}
