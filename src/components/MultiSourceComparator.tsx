import React, { useState } from 'react';
import { VerseKnowledgeEntry, SourceCommentary } from '../types/gitaKnowledge';
import { SOURCE_BOOKS, getSourceById } from '../data/sourcesRegistry';
import { BookOpen, ShieldCheck, Globe, Layers, Feather, Quote, ChevronRight, X, Sparkles } from 'lucide-react';

interface MultiSourceComparatorProps {
  verse: VerseKnowledgeEntry;
  onClose: () => void;
  language: 'en' | 'mr';
}

export const MultiSourceComparator: React.FC<MultiSourceComparatorProps> = ({
  verse,
  onClose,
  language
}) => {
  const [activeTab, setActiveTab] = useState<'commentaries' | 'padaccheda' | 'sources_catalog'>('commentaries');
  const [selectedSourceId, setSelectedSourceId] = useState<string>(
    verse.commentaries[0]?.source_id || 'dnyaneshwari_mr'
  );

  const selectedCommentary = verse.commentaries.find(c => c.source_id === selectedSourceId) || verse.commentaries[0];
  const selectedSourceMeta = SOURCE_BOOKS.find(s => s.id === selectedCommentary?.source_id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0d0f14] border border-[#d4af37]/30 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif tracking-wide text-white flex items-center gap-2">
                <span>Bhagavad Gita {verse.chapter_number}.{verse.verse_number}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20">
                  {verse.canonical.chapter_name_sanskrit}
                </span>
              </h2>
              <p className="text-xs text-white/50">
                {language === 'mr' ? 'अनेक भाष्यकार व पदच्छेद तुलना केंद्र' : 'Multi-Commentator Comparison & Sanskrit Padaccheda'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/5 bg-black/40 px-6">
          <button
            onClick={() => setActiveTab('commentaries')}
            className={`py-3 px-4 text-xs font-medium tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'commentaries'
                ? 'border-[#d4af37] text-[#d4af37]'
                : 'border-transparent text-white/40 hover:text-white/70'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            {language === 'mr' ? 'भाष्यकार तुलना (Commentaries)' : 'Commentator Views'}
          </button>

          <button
            onClick={() => setActiveTab('padaccheda')}
            className={`py-3 px-4 text-xs font-medium tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'padaccheda'
                ? 'border-[#d4af37] text-[#d4af37]'
                : 'border-transparent text-white/40 hover:text-white/70'
            }`}
          >
            <Feather className="w-3.5 h-3.5" />
            {language === 'mr' ? 'पदच्छेद व शब्दार्थ (Word Breakdown)' : 'Padaccheda & Syntax'}
          </button>

          <button
            onClick={() => setActiveTab('sources_catalog')}
            className={`py-3 px-4 text-xs font-medium tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'sources_catalog'
                ? 'border-[#d4af37] text-[#d4af37]'
                : 'border-transparent text-white/40 hover:text-white/70'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            {language === 'mr' ? '२० संदर्भ ग्रंथ (Sources & Attribution)' : '20 Sources & Copyright'}
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Sanskrit Canonical Banner */}
          <div className="bg-gradient-to-br from-[#d4af37]/5 via-white/[0.02] to-transparent border border-[#d4af37]/20 rounded-2xl p-5 text-center">
            <p className="text-xs uppercase tracking-[3px] text-[#d4af37]/70 mb-2">Canonical Sanskrit</p>
            <pre className="font-serif text-lg sm:text-xl text-[#f3e5ab] whitespace-pre-wrap leading-relaxed">
              {verse.canonical.shloka_devanagari}
            </pre>
            <p className="text-xs text-white/50 italic mt-2 font-mono">
              {verse.canonical.shloka_transliteration_iast}
            </p>
          </div>

          {/* TAB 1: Multi-Source Commentator Views */}
          {activeTab === 'commentaries' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Selector: Commentary Sources */}
              <div className="md:col-span-4 space-y-2 border-r border-white/5 pr-0 md:pr-4">
                <p className="text-[11px] uppercase tracking-wider text-white/40 font-semibold mb-3">
                  {language === 'mr' ? 'उपलब्ध भाष्ये निवडा' : 'Select Author / Tradition'}
                </p>
                {verse.commentaries.map((com, cIdx) => {
                  const meta = getSourceById(com.source_id);
                  const isSelected = selectedSourceId === com.source_id;
                  return (
                    <button
                      key={`commentary-btn-${verse.verse_id}-${com.source_id}-${cIdx}`}
                      onClick={() => setSelectedSourceId(com.source_id)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#d4af37]/10 border-[#d4af37]/50 text-white shadow-lg'
                          : 'bg-white/[0.02] border-white/5 text-white/60 hover:bg-white/[0.04] hover:text-white'
                      }`}
                    >
                      <div>
                        <p className="text-xs font-serif font-medium text-white">{com.source_name}</p>
                        <p className="text-[11px] text-[#d4af37]/80">{com.author}</p>
                        <span className="inline-block text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-white/40 mt-1">
                          {com.language}
                        </span>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#d4af37] translate-x-1' : 'text-white/20'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Right: Detailed Author Exposition */}
              <div className="md:col-span-8 space-y-4">
                {selectedCommentary && selectedSourceMeta && (
                  <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 space-y-5">
                    
                    {/* Header with Source Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-4">
                      <div>
                        <h3 className="text-base font-serif text-[#d4af37] flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          <span>{selectedCommentary.source_name}</span>
                        </h3>
                        <p className="text-xs text-white/70">
                          {language === 'mr' ? 'भाष्यकार / व्याख्या:' : 'Author / Lineage:'} {selectedCommentary.author}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30">
                          {selectedSourceMeta.commentary_approach}
                        </span>
                        <span className="text-[10px] px-2 py-1 rounded bg-white/5 text-white/50 border border-white/5">
                          {selectedSourceMeta.copyright_status === 'public_domain' ? 'Public Domain' : 'Fair Use Summary'}
                        </span>
                      </div>
                    </div>

                    {/* Core Philosophical Exposition */}
                    <div className="space-y-2">
                      <p className="text-[11px] uppercase tracking-wider text-white/40 font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                        {language === 'mr' ? 'मूलभूत तात्त्विक अर्थ (Core Interpretation)' : 'Core Philosophical Insight'}
                      </p>
                      <p className="text-sm text-white/90 leading-relaxed font-sans bg-black/30 p-4 rounded-xl border border-white/5">
                        {selectedCommentary.core_interpretation}
                      </p>
                    </div>

                    {/* Practical Teaching */}
                    <div className="space-y-2">
                      <p className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold flex items-center gap-1.5">
                        <Quote className="w-3.5 h-3.5" />
                        {language === 'mr' ? 'साधकासाठी व्यावहारिक बोध' : 'Seeker\'s Practical Living Guidance'}
                      </p>
                      <p className="text-sm text-white/80 leading-relaxed bg-[#d4af37]/5 p-4 rounded-xl border border-[#d4af37]/20">
                        {selectedCommentary.practical_teaching}
                      </p>
                    </div>

                    {/* Legal Attribution Notice */}
                    <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-[10px] text-white/40">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]/60" />
                      <span>{selectedSourceMeta.legal_notice}</span>
                    </div>

                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: Padaccheda & Word-by-Word Breakdown */}
          {activeTab === 'padaccheda' && (
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-3">
                  {language === 'mr' ? 'पदच्छेद (Word Segmentation)' : 'Padaccheda (Exact Word Split)'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {verse.canonical.padaccheda.map((word, idx) => (
                    <span
                      key={`padaccheda-${verse.verse_id}-${idx}-${word}`}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-sm font-serif text-[#d4af37]"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-white/40 font-semibold mb-3">
                  {language === 'mr' ? 'प्रत्येक शब्दाचा सविस्तर अर्थ (Etymology & Morphology)' : 'Word-by-Word Sanskrit Morphological Gloss'}
                </p>
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-left text-xs text-white/80">
                    <thead className="bg-white/5 text-white/40 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3">Sanskrit</th>
                        <th className="p-3">Transliteration</th>
                        <th className="p-3">English Meaning</th>
                        <th className="p-3">मराठी अर्थ</th>
                        <th className="p-3">Grammatical Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-black/20">
                      {verse.canonical.word_analysis.map((item, idx) => (
                        <tr key={`word-gloss-${verse.verse_id}-${idx}-${item.word_sanskrit}`} className="hover:bg-white/[0.02]">
                          <td className="p-3 font-serif font-bold text-[#d4af37]">{item.word_sanskrit}</td>
                          <td className="p-3 font-mono text-white/60">{item.word_transliteration}</td>
                          <td className="p-3 text-white/90">{item.meaning_english}</td>
                          <td className="p-3 text-white/90 font-serif">{item.meaning_marathi}</td>
                          <td className="p-3 text-white/40 text-[10px]">{item.grammatical_role || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 20 Source Books Catalog */}
          {activeTab === 'sources_catalog' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-white/60">
                  {language === 'mr' 
                    ? 'गीता लेन्स ज्ञानकोशात समाविष्ट असलेले २० मराठी व इंग्रजी प्रमाण ग्रंथ आणि त्यांची कॉपीराइट नियमावली:' 
                    : 'The 20 Authoritative Marathi & English Source Treatises with strict copyright compliance & source attribution:'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                {SOURCE_BOOKS.map((src) => (
                  <div key={`source-entry-${src.id}`} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 hover:border-white/20 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#d4af37] flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-[10px] text-white/60">
                          {src.source_number}
                        </span>
                        {src.title_original}
                      </span>
                      <span className={`text-[9px] uppercase px-1.5 py-0.5 rounded ${
                        src.copyright_status === 'public_domain' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      }`}>
                        {src.copyright_status === 'public_domain' ? 'Public Domain' : 'Fair Use'}
                      </span>
                    </div>

                    <p className="text-[11px] text-white/80">
                      <strong>Author:</strong> {src.author_original} ({src.author_english})
                    </p>
                    <p className="text-[10px] text-white/50">
                      <strong>Era/Publisher:</strong> {src.year_or_era} • {src.publisher || 'Heritage'}
                    </p>
                    <p className="text-[10px] text-white/40 italic">
                      {src.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
