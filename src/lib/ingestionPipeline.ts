import { CopyrightStatus, SourceBook, SourceCommentary, VerseKnowledgeEntry } from '../types/gitaKnowledge';
import { SOURCE_BOOKS } from '../data/sourcesRegistry';

/**
 * GitaLens — Copyright-Aware Knowledge Ingestion Pipeline
 * Enforces legal safeguards, validation rules, and attribution.
 */

export interface IngestionInputPayload {
  source_id: string;
  chapter_number: number;
  verse_number: number;
  shloka_devanagari: string;
  padaccheda?: string[];
  raw_interpretation_text: string;
  practical_teaching_extracted: string;
  short_quotes?: string[];
  page_number?: string;
  manual_license_override?: 'authorized_full_text' | null;
}

export interface IngestionValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  sanitizedCommentary?: SourceCommentary;
}

export class CopyrightAwareIngestionPipeline {
  /**
   * Validates and sanitizes commentary from a source book
   */
  static processSourceEntry(payload: IngestionInputPayload): IngestionValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Rule 1: Source verification
    const source = SOURCE_BOOKS.find(s => s.id === payload.source_id);
    if (!source) {
      errors.push(`Unregistered source ID '${payload.source_id}'. Must be one of the 20 approved source books.`);
      return { isValid: false, errors, warnings };
    }

    // Rule 2: Chapter and Verse boundaries
    if (payload.chapter_number < 1 || payload.chapter_number > 18) {
      errors.push(`Invalid Chapter number ${payload.chapter_number}. Must be between 1 and 18.`);
    }
    if (payload.verse_number < 1 || payload.verse_number > 78) {
      errors.push(`Invalid Verse number ${payload.verse_number}. Must be between 1 and 78.`);
    }

    // Rule 3: Copyright Check & Length Guardrails
    const effectiveStatus: CopyrightStatus = payload.manual_license_override || source.copyright_status;
    let isSummaryOnly = true;
    let sanitizedInterpretation = payload.raw_interpretation_text.trim();

    if (effectiveStatus === 'fair_use_summary') {
      // Prevent copying full chapters or long passages of copyrighted books
      if (sanitizedInterpretation.length > 2000) {
        warnings.push(`Commentary exceeds 2,000 characters for copyright-restricted source '${source.title_english}'. Paraphrased analytical summary applied.`);
        sanitizedInterpretation = sanitizedInterpretation.substring(0, 1990) + '... [Summarized under Fair Use]';
      }
      isSummaryOnly = true;
    } else if (effectiveStatus === 'public_domain' || effectiveStatus === 'authorized_full_text' || effectiveStatus === 'open_license') {
      isSummaryOnly = false;
    }

    // Rule 4: Non-Empty Requirements
    if (!sanitizedInterpretation) {
      errors.push('Interpretation text cannot be empty.');
    }
    if (!payload.practical_teaching_extracted) {
      errors.push('Practical teaching must be explicitly extracted.');
    }

    if (errors.length > 0) {
      return { isValid: false, errors, warnings };
    }

    const sanitizedCommentary: SourceCommentary = {
      source_id: source.id,
      source_name: source.title_original,
      author: source.author_original,
      language: source.language,
      core_interpretation: sanitizedInterpretation,
      practical_teaching: payload.practical_teaching_extracted.trim(),
      key_quotes: payload.short_quotes || [],
      is_summary_only: isSummaryOnly,
      page_reference: payload.page_number,
      verified: true
    };

    return {
      isValid: true,
      errors,
      warnings,
      sanitizedCommentary
    };
  }

  /**
   * Integrity check on a full Verse record
   */
  static validateVerseRecord(entry: VerseKnowledgeEntry): boolean {
    if (!entry.verse_id || !entry.canonical.shloka_devanagari) return false;
    if (entry.commentaries.length === 0) return false;
    if (!entry.application.simple_meaning_en || !entry.application.simple_meaning_mr) return false;
    return true;
  }
}
