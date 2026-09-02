import { SourceBook } from '../types/gitaKnowledge';

/**
 * GitaLens — 20 Authoritative Source Books Registry
 * Preserves source integrity, author attribution, and legal compliance.
 */
export const SOURCE_BOOKS: SourceBook[] = [
  // --------------------------------------------------------------------------
  // Marathi Sources (1 to 10)
  // --------------------------------------------------------------------------
  {
    id: 'sadhak_sanjivani_mr',
    source_number: 1,
    title_original: 'श्रीमद्भगवद्गीता – साधक संजीवनी',
    title_english: 'Srimad Bhagavad Gita – Sadhak Sanjivani',
    author_original: 'स्वामी रामसुखदास',
    author_english: 'Swami Ramsukhdas',
    language: 'marathi',
    publisher: 'Gita Press, Gorakhpur',
    year_or_era: '1984 / Modern Classic',
    copyright_status: 'fair_use_summary',
    legal_notice: 'Structured analytical summaries & verse cross-references under fair educational use. No full copyrighted text reproduced without license.',
    description: 'An exhaustive, seeker-centric commentary focusing on practical sadhana, surrender, and non-attachment.',
    commentary_approach: 'Sadhana & Surrender (साधक दृष्टी)'
  },
  {
    id: 'gita_darpan_mr',
    source_number: 2,
    title_original: 'श्रीमद्भगवद्गीता – दर्पण',
    title_english: 'Srimad Bhagavad Gita – Darpan',
    author_original: 'स्वामी रामसुखदास',
    author_english: 'Swami Ramsukhdas',
    language: 'marathi',
    publisher: 'Gita Press, Gorakhpur',
    year_or_era: 'Modern',
    copyright_status: 'fair_use_summary',
    legal_notice: 'Thematic reflections and practical life mirror summaries retained with strict attribution.',
    description: 'A reflective mirror (Darpan) illuminating day-to-day human dilemmas through concise Gita aphorisms.',
    commentary_approach: 'Reflective Self-Examination (आत्मपरीक्षण)'
  },
  {
    id: 'dnyaneshwari_mr',
    source_number: 3,
    title_original: 'ज्ञानेश्वरी (भावार्थ दीपिका)',
    title_english: 'Dnyaneshwari (Bhavarth Deepika)',
    author_original: 'संत ज्ञानेश्वर महाराज',
    author_english: 'Sant Dnyaneshwar',
    language: 'marathi',
    publisher: 'Historic Heritage (1290 CE)',
    year_or_era: '1290 CE / Public Domain',
    copyright_status: 'public_domain',
    legal_notice: 'Universal Cultural Heritage (Public Domain). Rich ovi-by-ovi philosophical & poetic exposition.',
    description: 'Sublime poetic Marathi commentary in Ovi meter, harmonizing Advaita Vedanta with supreme Bhakti and practical compassion.',
    commentary_approach: 'Bhakti-Advaita Synthesis & Poetic Metaphors (भक्ति-अद्वैत काव्य)'
  },
  {
    id: 'saral_gita_gitapress_mr',
    source_number: 4,
    title_original: 'सरल श्रीमद्भगवद्गीता',
    title_english: 'Saral Srimad Bhagavad Gita',
    author_original: 'गीता प्रेस',
    author_english: 'Gita Press Editorial',
    language: 'marathi',
    publisher: 'Gita Press, Gorakhpur',
    year_or_era: 'Modern Standard',
    copyright_status: 'fair_use_summary',
    legal_notice: 'Simplified phrase meanings and essential summaries for everyday seekers.',
    description: 'Accessible, direct word-by-word Marathi translation intended for universal household study.',
    commentary_approach: 'Literal & Lucid Translation (सरल सुलभ अर्थ)'
  },
  {
    id: 'sarth_gita_ramakrishna_mr',
    source_number: 5,
    title_original: 'श्रीमद्भगवद्गीता : सार्थ',
    title_english: 'Srimad Bhagavad Gita : Sartha',
    author_original: 'रामकृष्ण मठ',
    author_english: 'Ramakrishna Math & Mission',
    language: 'marathi',
    publisher: 'Ramakrishna Math, Nagpur/Pune',
    year_or_era: '20th Century',
    copyright_status: 'fair_use_summary',
    legal_notice: 'Paraphrased insights emphasizing character building, youth empowerment, and practical Vedanta.',
    description: 'Focused on Ramakrishna-Vivekananda practical Vedanta, strength of mind, and service to living beings (Seva).',
    commentary_approach: 'Practical Vedanta & Strength (व्यावहारिक वेदान्त)'
  },
  {
    id: 'gita_as_it_is_mr',
    source_number: 6,
    title_original: 'भगवद्गीता जशी आहे तशी',
    title_english: 'Bhagavad Gita As It Is (Marathi)',
    author_original: 'ए.सी. भक्तिवेदांत स्वामी प्रभुपाद',
    author_english: 'A.C. Bhaktivedanta Swami Prabhupada',
    language: 'marathi',
    publisher: 'BBT (Bhaktivedanta Book Trust)',
    year_or_era: '1972 / Modern Edition',
    copyright_status: 'fair_use_summary',
    legal_notice: 'Thematic summaries of Gaudiya Vaishnava Bhakti purports with author/book attribution.',
    description: 'Uncompromising presentation of Pure Devotional Service (Bhakti Yoga) and surrender to Lord Krishna as the Supreme Personality of Godhead.',
    commentary_approach: 'Pure Devotionalism (शुद्ध भक्ति व शरणागती)'
  },
  {
    id: 'marathi_gita_khair_mr',
    source_number: 7,
    title_original: 'मराठी गीता व विवरण',
    title_english: 'Marathi Gita & Vivaran',
    author_original: 'डॉ. गजानन खैर',
    author_english: 'Dr. Gajanan Khair',
    language: 'marathi',
    publisher: 'Pune Vidyarthi Griha Prakashan',
    year_or_era: '1960s',
    copyright_status: 'fair_use_summary',
    legal_notice: 'Scholarly structure, historical development, and educational applications cataloged.',
    description: 'Scholarly and pedagogical analysis exploring the developmental stages of Gita teachings for educational minds.',
    commentary_approach: 'Scholarly & Pedagogical (शैक्षणिक व तात्त्विक विवरण)'
  },
  {
    id: 'shlokanuvad_kulkarni_mr',
    source_number: 8,
    title_original: 'श्रीमद्भगवद्गीता मराठी श्लोकानुवाद',
    title_english: 'Srimad Bhagavad Gita Marathi Shlokanuvad',
    author_original: 'किशोर कुलकर्णी',
    author_english: 'Kishor Kulkarni',
    language: 'marathi',
    publisher: 'Contemporary Marathi Literature',
    year_or_era: 'Contemporary',
    copyright_status: 'fair_use_summary',
    legal_notice: 'Metrical poetic Marathi translations indexed with concept mapping.',
    description: 'Fluid, rhythmic Marathi poetic rendition preserving Sanskrit meter for chanting and reflection.',
    commentary_approach: 'Poetic & Metrical (पद्यानुवाद)'
  },
  {
    id: 'mool_padaccheda_anvaya_mr',
    source_number: 9,
    title_original: 'श्रीमद्भगवद्गीता – मूळ, पदच्छेद, अन्वय, मराठी',
    title_english: 'Srimad Bhagavad Gita – Text, Word-Split, Syntax & Marathi',
    author_original: 'संस्कृत-मराठी अभ्यासक मंडळ',
    author_english: 'Sanskrit-Marathi Scholarly Guild',
    language: 'marathi',
    publisher: 'Traditional Sanskrit Press',
    year_or_era: 'Traditional',
    copyright_status: 'public_domain',
    legal_notice: 'Grammatical analysis, syntax order (Anvaya), and word-split are linguistic public domain data.',
    description: 'Detailed grammatical word segmentation (Padaccheda), syntactical sequence (Anvaya), and exact etymological roots.',
    commentary_approach: 'Linguistic & Syntactical (अन्वय व पदच्छेद)'
  },
  {
    id: 'anuvadasahit_gitapress_mr',
    source_number: 10,
    title_original: 'श्रीमद्भगवद्गीता – मराठी अनुवादासहित',
    title_english: 'Srimad Bhagavad Gita – with Marathi Translation',
    author_original: 'गीता प्रेस',
    author_english: 'Gita Press Editorial Board',
    language: 'marathi',
    publisher: 'Gita Press, Gorakhpur',
    year_or_era: 'Standard Edition',
    copyright_status: 'fair_use_summary',
    legal_notice: 'Direct verse-by-verse devotional Marathi translations with traditional commentary references.',
    description: 'Canonical Sanskrit verses with direct, reverent Marathi prose translation.',
    commentary_approach: 'Classical Devotional (पारंपरिक मराठी अनुवाद)'
  },

  // --------------------------------------------------------------------------
  // English Sources (11 to 20)
  // --------------------------------------------------------------------------
  {
    id: 'gita_as_it_is_en',
    source_number: 11,
    title_original: 'Bhagavad-gītā As It Is',
    title_english: 'Bhagavad-gītā As It Is',
    author_original: 'A.C. Bhaktivedanta Swami Prabhupāda',
    author_english: 'A.C. Bhaktivedanta Swami Prabhupada',
    language: 'english',
    publisher: 'Bhaktivedanta Book Trust (BBT)',
    year_or_era: '1972 / Modern',
    copyright_status: 'fair_use_summary',
    legal_notice: 'Core purports and thematic Gaudiya Vaishnava insights summarized with full attribution.',
    description: 'Comprehensive English translation and commentary presenting the Bhakti Yoga lineage with emphasis on Krishna consciousness.',
    commentary_approach: 'Achintya Bhedabheda & Krishna Consciousness'
  },
  {
    id: 'holy_geeta_chinmayananda_en',
    source_number: 12,
    title_original: 'The Holy Geeta',
    title_english: 'The Holy Geeta',
    author_original: 'Swami Chinmayananda',
    author_english: 'Swami Chinmayananda',
    language: 'english',
    publisher: 'Central Chinmaya Mission Trust (CCMT)',
    year_or_era: '1960 / Classic',
    copyright_status: 'fair_use_summary',
    legal_notice: 'Logical Vedantic breakdowns and modern psychological dynamics structured for student/professional guidance.',
    description: 'Modern, dynamic, and scientifically presented Advaita Vedanta commentary tailored for modern youth and professionals.',
    commentary_approach: 'Rational Vedanta & Inner Mind Architecture'
  },
  {
    id: 'easwaran_gita_en',
    source_number: 13,
    title_original: 'The Bhagavad Gita',
    title_english: 'The Bhagavad Gita',
    author_original: 'Eknath Easwaran',
    author_english: 'Eknath Easwaran',
    language: 'english',
    publisher: 'Nilgiri Press',
    year_or_era: '1985 / 2007',
    copyright_status: 'fair_use_summary',
    legal_notice: 'Thematic essays and psychological life-application insights distilled into actionable wisdom.',
    description: 'Renowned for warm, accessible English prose, focusing on meditation, selfless action, and spiritual psychology.',
    commentary_approach: 'Passage Meditation & Practical Universal Spirituality'
  },
  {
    id: 'sivananda_gita_en',
    source_number: 14,
    title_original: 'The Bhagavad Gita',
    title_english: 'The Bhagavad Gita',
    author_original: 'Swami Sivananda',
    author_english: 'Swami Sivananda',
    language: 'english',
    publisher: 'Divine Life Society, Rishikesh',
    year_or_era: '1942 / Open Spiritual Heritage',
    copyright_status: 'open_license',
    legal_notice: 'Full spiritual guidelines and practical sadhana notes disseminated by Divine Life Society for human upliftment.',
    description: 'Integral Yoga synthesis combining Karma, Bhakti, Raja, and Jnana Yoga into a comprehensive manual for living.',
    commentary_approach: 'Integral Yoga & Daily Sadhana Synthesis'
  },
  {
    id: 'radhakrishnan_gita_en',
    source_number: 15,
    title_original: 'The Bhagavadgītā',
    title_english: 'The Bhagavadgita',
    author_original: 'Dr. Sarvepalli Radhakrishnan',
    author_english: 'Dr. S. Radhakrishnan',
    language: 'english',
    publisher: 'George Allen & Unwin / HarperCollins',
    year_or_era: '1948',
    copyright_status: 'fair_use_summary',
    legal_notice: 'Comparative philosophical cross-references with Western thought (Plato, Kant, Plotinus) summarized under fair use.',
    description: 'Philosophical tour-de-force connecting Gita metaphysics with world philosophy and global ethics.',
    commentary_approach: 'Comparative Philosophy & Universal Humanism'
  },
  {
    id: 'gambhirananda_gita_en',
    source_number: 16,
    title_original: 'Bhagavad Gita: With the Commentary of Sankaracarya',
    title_english: 'Bhagavad Gita: Shankara Bhashya Translation',
    author_original: 'Swami Gambhirananda',
    author_english: 'Swami Gambhirananda',
    language: 'english',
    publisher: 'Advaita Ashrama, Kolkata',
    year_or_era: '1984',
    copyright_status: 'fair_use_summary',
    legal_notice: 'Scholarly translations of classical Adi Shankara Bhashya represented with rigorous terminological fidelity.',
    description: 'Definitive scholarly English translation of Adi Shankaracharya’s monumental Sanskrit Bhashya on Advaita Vedanta.',
    commentary_approach: 'Classical Shankara Advaita Bhashya'
  },
  {
    id: 'sargeant_gita_en',
    source_number: 17,
    title_original: 'The Bhagavad Gītā (Word-for-Word)',
    title_english: 'The Bhagavad Gita',
    author_original: 'Winthrop Sargeant',
    author_english: 'Winthrop Sargeant',
    language: 'english',
    publisher: 'State University of New York Press (SUNY)',
    year_or_era: '1979 / 2009',
    copyright_status: 'fair_use_summary',
    legal_notice: 'Grammatical analysis and morphological vocabulary breakdowns.',
    description: 'Exhaustive linguistic companion offering Devanagari, transliteration, grammatical role, and interlinear word glosses.',
    commentary_approach: 'Linguistic, Lexical & Interlinear'
  },
  {
    id: 'gandhi_gita_en',
    source_number: 18,
    title_original: 'The Bhagavad Gita According to Gandhi (Anasaktiyoga)',
    title_english: 'The Bhagavad Gita According to Gandhi',
    author_original: 'Mahatma Gandhi (M.K. Gandhi / Mahadev Desai)',
    author_english: 'Mahatma Gandhi',
    language: 'english',
    publisher: 'Navajivan Publishing House',
    year_or_era: '1926 / Public Domain Era',
    copyright_status: 'public_domain',
    legal_notice: 'Public Domain historical text. Focus on Anasakti (selfless detachment), truth (Satya), and non-violence (Ahimsa).',
    description: 'Focuses on "Anasakti Yoga" (gospel of selfless action), viewing the battlefield of Kurukshetra as the internal human heart.',
    commentary_approach: 'Anasakti Yoga, Ethical Activism & Satyagraha'
  },
  {
    id: 'mascaro_gita_en',
    source_number: 19,
    title_original: 'The Bhagavad Gita',
    title_english: 'The Bhagavad Gita',
    author_original: 'Juan Mascaró',
    author_english: 'Juan Mascaro',
    language: 'english',
    publisher: 'Penguin Classics',
    year_or_era: '1962',
    copyright_status: 'fair_use_summary',
    legal_notice: 'Literary summaries capturing mystical poetic resonance and Upanishadic beauty.',
    description: 'Celebrated for lyrical English beauty and mystical spiritual resonance, capturing the transcendental music of the song divine.',
    commentary_approach: 'Mystical Poetry & Universal Resonance'
  },
  {
    id: 'mitchell_gita_en',
    source_number: 20,
    title_original: 'Bhagavad Gita: A New Translation',
    title_english: 'Bhagavad Gita: A New Translation',
    author_original: 'Stephen Mitchell',
    author_english: 'Stephen Mitchell',
    language: 'english',
    publisher: 'Harmony Books / Random House',
    year_or_era: '2000',
    copyright_status: 'fair_use_summary',
    legal_notice: 'Contemporary verse structures and minimalist poetic insights summarized with attribution.',
    description: 'Direct, modern American verse translation capturing the unadorned directness and immediacy of Krishna’s counsel.',
    commentary_approach: 'Modern Minimalist Verse'
  }
];

export function getSourceById(id: string): SourceBook | undefined {
  return SOURCE_BOOKS.find(s => s.id === id);
}

export function getSourcesByLanguage(language: 'marathi' | 'english'): SourceBook[] {
  return SOURCE_BOOKS.filter(s => s.language === language);
}
