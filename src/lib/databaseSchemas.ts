/**
 * GitaLens — Bhagavad Gita Knowledge Database Ingestion Specifications
 * Formal Database Schemas (Relational DDL, Document NoSQL, Vector Embeddings)
 */

export const RELATIONAL_POSTGRES_DDL = `
-- ============================================================================
-- GITALENS KNOWLEDGE DATABASE DDL (PostgreSQL / Relational Architecture)
-- ============================================================================

-- 1. Source Commentaries & Books Registry (20 Planned Marathi & English Sources)
CREATE TABLE source_books (
    source_id VARCHAR(64) PRIMARY KEY,
    source_number INT NOT NULL UNIQUE,
    title_original VARCHAR(255) NOT NULL,
    title_english VARCHAR(255) NOT NULL,
    author_original VARCHAR(255) NOT NULL,
    author_english VARCHAR(255) NOT NULL,
    language VARCHAR(20) NOT NULL CHECK (language IN ('marathi', 'english', 'sanskrit')),
    publisher VARCHAR(255),
    year_or_era VARCHAR(100),
    copyright_status VARCHAR(50) NOT NULL CHECK (copyright_status IN ('public_domain', 'open_license', 'authorized_full_text', 'fair_use_summary')),
    commentary_approach VARCHAR(255),
    legal_notice TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Chapters Registry (18 Chapters of the Bhagavad Gita)
CREATE TABLE gita_chapters (
    chapter_number INT PRIMARY KEY CHECK (chapter_number BETWEEN 1 AND 18),
    name_sanskrit VARCHAR(100) NOT NULL,
    name_marathi VARCHAR(100) NOT NULL,
    name_english VARCHAR(150) NOT NULL,
    total_verses INT NOT NULL,
    theme_overview_en TEXT,
    theme_overview_mr TEXT
);

-- 3. Canonical Verses (Layer 1: The 700 Sacred Verses)
CREATE TABLE canonical_verses (
    verse_id VARCHAR(32) PRIMARY KEY, -- e.g. 'BG_2_47'
    chapter_number INT NOT NULL REFERENCES gita_chapters(chapter_number),
    verse_number INT NOT NULL,
    shloka_devanagari TEXT NOT NULL,
    shloka_transliteration_iast TEXT NOT NULL,
    padaccheda JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of word segments
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_chapter_verse UNIQUE (chapter_number, verse_number)
);

-- 4. Word-by-Word Analysis (Layer 2: Morphology & Padaccheda)
CREATE TABLE word_meanings (
    word_id SERIAL PRIMARY KEY,
    verse_id VARCHAR(32) NOT NULL REFERENCES canonical_verses(verse_id) ON DELETE CASCADE,
    word_order INT NOT NULL,
    word_sanskrit VARCHAR(100) NOT NULL,
    word_transliteration VARCHAR(100) NOT NULL,
    meaning_english TEXT NOT NULL,
    meaning_marathi TEXT NOT NULL,
    grammatical_role VARCHAR(100)
);

-- 5. Translations Layer (Layer 2: Canonical Translations)
CREATE TABLE verse_translations (
    translation_id SERIAL PRIMARY KEY,
    verse_id VARCHAR(32) NOT NULL REFERENCES canonical_verses(verse_id) ON DELETE CASCADE,
    language VARCHAR(20) NOT NULL CHECK (language IN ('marathi', 'english')),
    translation_type VARCHAR(30) NOT NULL CHECK (translation_type IN ('literal', 'poetic', 'simple')),
    translated_text TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT TRUE
);

-- 6. Source Commentaries (Layer 3: Multi-Source Attributed Insights)
CREATE TABLE source_commentaries (
    commentary_id SERIAL PRIMARY KEY,
    verse_id VARCHAR(32) NOT NULL REFERENCES canonical_verses(verse_id) ON DELETE CASCADE,
    source_id VARCHAR(64) NOT NULL REFERENCES source_books(source_id),
    core_interpretation TEXT NOT NULL,
    practical_teaching TEXT NOT NULL,
    short_quotes JSONB DEFAULT '[]'::jsonb,
    is_summary_only BOOLEAN NOT NULL DEFAULT TRUE,
    page_reference VARCHAR(50),
    verified BOOLEAN DEFAULT TRUE,
    CONSTRAINT uq_verse_source UNIQUE (verse_id, source_id)
);

-- 7. Philosophical Concept Taxonomy (Layer 4)
CREATE TABLE gita_concepts (
    concept_id VARCHAR(64) PRIMARY KEY, -- e.g. 'karma_yoga', 'svadharma'
    name_sanskrit VARCHAR(100) NOT NULL,
    name_english VARCHAR(100) NOT NULL,
    name_marathi VARCHAR(100) NOT NULL,
    definition_en TEXT NOT NULL,
    definition_mr TEXT NOT NULL
);

-- 8. Real-Life Problem Taxonomy (Layer 5)
CREATE TABLE problem_taxonomy (
    problem_slug VARCHAR(64) PRIMARY KEY, -- e.g. 'exam_stress', 'anger_frustration'
    category VARCHAR(64) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    title_mr VARCHAR(255) NOT NULL,
    keywords_en TEXT[] NOT NULL,
    keywords_mr TEXT[] NOT NULL
);

-- 9. Practical Real-Life Application (Layer 7)
CREATE TABLE practical_applications (
    application_id SERIAL PRIMARY KEY,
    verse_id VARCHAR(32) NOT NULL UNIQUE REFERENCES canonical_verses(verse_id) ON DELETE CASCADE,
    problem_context TEXT NOT NULL,
    simple_meaning_en TEXT NOT NULL,
    simple_meaning_mr TEXT NOT NULL,
    core_teaching_en TEXT NOT NULL,
    core_teaching_mr TEXT NOT NULL,
    real_life_connection_en TEXT NOT NULL,
    real_life_connection_mr TEXT NOT NULL,
    modern_example_en TEXT NOT NULL,
    modern_example_mr TEXT NOT NULL,
    practical_actions_en JSONB NOT NULL DEFAULT '[]'::jsonb,
    practical_actions_mr JSONB NOT NULL DEFAULT '[]'::jsonb,
    reflection_question_en TEXT NOT NULL,
    reflection_question_mr TEXT NOT NULL
);

-- 10. M:N Mapping Tables (Bidirectional Knowledge Links)
CREATE TABLE verse_concept_links (
    verse_id VARCHAR(32) NOT NULL REFERENCES canonical_verses(verse_id) ON DELETE CASCADE,
    concept_id VARCHAR(64) NOT NULL REFERENCES gita_concepts(concept_id) ON DELETE CASCADE,
    PRIMARY KEY (verse_id, concept_id)
);

CREATE TABLE verse_problem_links (
    verse_id VARCHAR(32) NOT NULL REFERENCES canonical_verses(verse_id) ON DELETE CASCADE,
    problem_slug VARCHAR(64) NOT NULL REFERENCES problem_taxonomy(problem_slug) ON DELETE CASCADE,
    relevance_score FLOAT DEFAULT 1.0,
    PRIMARY KEY (verse_id, problem_slug)
);

CREATE TABLE verse_persona_links (
    verse_id VARCHAR(32) NOT NULL REFERENCES canonical_verses(verse_id) ON DELETE CASCADE,
    persona_type VARCHAR(32) NOT NULL,
    PRIMARY KEY (verse_id, persona_type)
);

-- INDEXES FOR FAST RETRIEVAL
CREATE INDEX idx_verses_chapter ON canonical_verses(chapter_number);
CREATE INDEX idx_commentary_source ON source_commentaries(source_id);
CREATE INDEX idx_problem_keywords ON problem_taxonomy USING GIN(keywords_en);
`;

export const VECTOR_DATABASE_SCHEMA_SPEC = {
  vector_dimension: 768, // Standard Gemini text-embedding-004
  distance_metric: "cosine",
  namespace: "gita_knowledge_v1",
  record_structure: {
    id: "BG_2_47",
    values: "[0.012, -0.043, ... 768 float dimensions]",
    metadata: {
      verse_id: "BG_2_47",
      chapter: 2,
      verse: 47,
      chapter_theme: "Karma Yoga & Equanimity",
      devanagari: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन...",
      text_en: "You have a right to perform your prescribed duty, but not to the fruits...",
      text_mr: "तुला फक्त तुझे विहित कर्तव्य करण्याचा अधिकार आहे...",
      problem_slugs: ["exam_stress", "fear_of_failure", "workplace_stress_burnout", "procrastination_laziness"],
      persona_slugs: ["student", "professional", "entrepreneur", "general_user"],
      concept_slugs: ["karma", "karma_yoga", "detachment", "duty", "equanimity"],
      primary_sources: ["sadhak_sanjivani_mr", "dnyaneshwari_mr", "holy_geeta_chinmayananda_en", "gandhi_gita_en", "gita_as_it_is_en"]
    }
  }
};
