import React, { useState } from 'react';
import { GITA_KNOWLEDGE_GRAPH } from '../data/knowledgeGraph';
import { SOURCE_BOOKS, getSourceById } from '../data/sourcesRegistry';
import { VerseKnowledgeEntry } from '../types/gitaKnowledge';
import { 
  BookOpen, 
  Feather, 
  ShieldCheck, 
  Layers, 
  Quote, 
  Sparkles, 
  Volume2,
  ChevronRight
} from 'lucide-react';

interface CommentariesExplorerProps {
  language: 'en' | 'mr';
  onSelectWisdom?: (verse: VerseKnowledgeEntry) => void;
}

export const CommentariesExplorer: React.FC<CommentariesExplorerProps> = ({
  language,
  onSelectWisdom
}) => {
  const isMr = language === 'mr';
  const [selectedVerseId, setSelectedVerseId] = useState<string>(GITA_KNOWLEDGE_GRAPH[0]?.verse_id || 'BG_2_47');
  const [activeSubTab, setActiveSubTab] = useState<'commentaries' | 'padaccheda' | 'sources_catalog'>('commentaries');
  
  const currentVerse = GITA_KNOWLEDGE_GRAPH.find(v => v.verse_id === selectedVerseId) || GITA_KNOWLEDGE_GRAPH[0];
  const [selectedSourceId, setSelectedSourceId] = useState<string>(currentVerse.commentaries[0]?.source_id || 'dnyaneshwari_mr');

  const selectedCommentary = currentVerse.commentaries.find(c => c.source_id === selectedSourceId) || currentVerse.commentaries[0];
  const selectedSourceMeta = SOURCE_BOOKS.find(s => s.id === selectedCommentary?.source_id);

  // Play Sanskrit voice recitation via SpeechSynthesis
  const speakSanskrit = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.lang = 'hi-IN'; // Sanskrit/Hindi phonetic mapping
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-fadeIn pb-12">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/25 text-[#d4af37] text-xs uppercase tracking-widest font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>{isMr ? '२० प्रमाण भाष्ये व पदच्छेद' : '20 Authoritative Treatises & Sanskrit Grammar'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif text-[var(--app-text)] tracking-wide">
          {isMr ? 'भाष्यकार तुलना व शब्दार्थ पृथक्करण' : 'Multi-Commentator Synthesis & Sanskrit Breakdown'}
        </h2>
        <p className="text-xs sm:text-sm text-[var(--app-text-muted)] max-w-2xl mx-auto">
          {isMr 
            ? 'आदि शंकराचार्य, संत ज्ञानेश्वर, लोकमान्य टिळक, स्वामी रामसुखदास आणि महात्मा गांधी यांच्या प्रमाण ग्रंथांमधील तुलनात्मक अभ्यास.'
            : 'Explore side-by-side interpretations from Adi Shankara, Dnyaneshwari, Lokmanya Tilak, Gandhi, Chinmayananda, and word-by-word grammatical analysis.'}
        </p>
      </div>

      {/* Verse Selector Strip */}
      <div className="glass rounded-2xl p-4 space-y-3">
        <p className="text-[11px] uppercase tracking-wider text-[var(--app-accent)] font-semibold flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{isMr ? 'श्लोक निवडा:' : 'Select Shloka to Inspect:'}</span>
        </p>
        
        <div className="flex overflow-x-auto gap-2.5 pb-2 no-scrollbar">
          {GITA_KNOWLEDGE_GRAPH.map((verse) => {
            const isSelected = selectedVerseId === verse.verse_id;
            return (
              <button
                key={`verse-select-${verse.verse_id}`}
                onClick={() => {
                  setSelectedVerseId(verse.verse_id);
                  setSelectedSourceId(verse.commentaries[0]?.source_id || 'dnyaneshwari_mr');
                }}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-lg shadow-[#d4af37]/20 scale-102'
                    : 'bg-white/[0.03] text-[var(--app-text-muted)] border-[var(--app-border)] hover:border-[var(--app-border-hover)] hover:text-[var(--app-text)]'
                }`}
              >
                <span>BG {verse.chapter_number}.{verse.verse_number}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-serif ${isSelected ? 'bg-black/20 text-black' : 'bg-white/5 text-[var(--app-accent)]'}`}>
                  {isMr ? verse.canonical.chapter_name_marathi : verse.canonical.chapter_name_sanskrit}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Verse Sanskrit Hero Card */}
      <div className="glass rounded-3xl p-6 sm:p-8 space-y-4 border border-[var(--app-border)] relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--app-border)] pb-4">
          <div className="flex items-center gap-2">
            <span className="label-micro bg-[var(--app-accent-bg)] px-3 py-1 rounded-full border border-[var(--app-border)]">
              BG {currentVerse.chapter_number}.{currentVerse.verse_number}
            </span>
            <span className="text-xs text-[var(--app-text-muted)] font-serif">
              {isMr ? currentVerse.canonical.chapter_name_marathi : currentVerse.canonical.chapter_name_english}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => speakSanskrit(currentVerse.canonical.shloka_devanagari)}
              className="px-3 py-1.5 rounded-full bg-[var(--app-accent-bg)] hover:bg-[#d4af37]/20 text-[var(--app-accent)] border border-[var(--app-border)] text-xs font-medium transition-all flex items-center gap-1.5 active:scale-95"
              title="Listen to Sanskrit Recitation"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{isMr ? 'उच्चार ऐका' : 'Chant Audio'}</span>
            </button>
            {onSelectWisdom && (
              <button
                onClick={() => onSelectWisdom(currentVerse)}
                className="px-3.5 py-1.5 rounded-full bg-[#d4af37] text-black hover:brightness-110 text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isMr ? 'सखोल बोध पहा' : 'View Full Guidance'}</span>
              </button>
            )}
          </div>
        </div>

        <div className="text-center py-2 space-y-3">
          <p className="shloka-title text-xl sm:text-3xl font-serif leading-relaxed whitespace-pre-line text-[#f8ecc2]">
            {currentVerse.canonical.shloka_devanagari}
          </p>
          <p className="text-xs sm:text-sm font-serif italic text-[var(--app-text-muted)]">
            {currentVerse.canonical.shloka_transliteration_iast}
          </p>
        </div>

        <div className="pt-3 border-t border-[var(--app-border)] text-center max-w-3xl mx-auto">
          <p className="text-sm sm:text-base font-serif text-[var(--app-text)] leading-relaxed italic">
            "{isMr ? currentVerse.translation_literal_mr : currentVerse.translation_literal_en}"
          </p>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex border-b border-[var(--app-border)] gap-2">
        <button
          onClick={() => setActiveSubTab('commentaries')}
          className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === 'commentaries'
              ? 'border-[#d4af37] text-[var(--app-accent)] font-bold'
              : 'border-transparent text-[var(--app-text-muted)] hover:text-[var(--app-text)]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{isMr ? 'भाष्यकार मते (Commentaries)' : 'Commentator Views'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('padaccheda')}
          className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === 'padaccheda'
              ? 'border-[#d4af37] text-[var(--app-accent)] font-bold'
              : 'border-transparent text-[var(--app-text-muted)] hover:text-[var(--app-text)]'
          }`}
        >
          <Feather className="w-4 h-4" />
          <span>{isMr ? 'पदच्छेद व व्याकरण (Word Breakdown)' : 'Padaccheda & Syntax'}</span>
        </button>

        <button
          onClick={() => setActiveSubTab('sources_catalog')}
          className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
            activeSubTab === 'sources_catalog'
              ? 'border-[#d4af37] text-[var(--app-accent)] font-bold'
              : 'border-transparent text-[var(--app-text-muted)] hover:text-[var(--app-text)]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>{isMr ? '२० प्रमाण संदर्भ सूची (20 Sources)' : '20 Sources Registry'}</span>
        </button>
      </div>

      {/* TAB 1: Multi-Commentator Views */}
      {activeSubTab === 'commentaries' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Author Selector Column */}
          <div className="lg:col-span-4 space-y-2.5">
            <p className="text-[11px] uppercase tracking-wider text-[var(--app-text-muted)] font-semibold px-1">
              {isMr ? 'उपलब्ध भाष्यकार निवडा:' : 'Select Author / Tradition:'}
            </p>

            {currentVerse.commentaries.map((com, cIdx) => {
              const meta = getSourceById(com.source_id);
              const isSelected = selectedSourceId === com.source_id;
              return (
                <button
                  key={`explorer-com-${currentVerse.verse_id}-${com.source_id}-${cIdx}`}
                  onClick={() => setSelectedSourceId(com.source_id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#d4af37]/15 border-[#d4af37] shadow-md shadow-[#d4af37]/10'
                      : 'bg-white/[0.02] border-[var(--app-border)] hover:border-[var(--app-border-hover)]'
                  }`}
                >
                  <div className="space-y-1">
                    <p className={`text-sm font-semibold ${isSelected ? 'text-[var(--app-accent)] font-bold' : 'text-[var(--app-text)]'}`}>
                      {com.author}
                    </p>
                    <p className="text-xs text-[var(--app-text-muted)] flex items-center gap-1.5">
                      <span>{com.source_name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/5 uppercase">
                        {com.language}
                      </span>
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[var(--app-accent)] translate-x-1' : 'text-[var(--app-text-subtle)]'}`} />
                </button>
              );
            })}
          </div>

          {/* Detailed Commentary Card */}
          <div className="lg:col-span-8 glass rounded-3xl p-6 sm:p-8 space-y-6 border border-[var(--app-border)]">
            {selectedCommentary && (
              <>
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--app-border)] pb-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-[var(--app-accent)]">
                      {selectedCommentary.author}
                    </h3>
                    <p className="text-xs text-[var(--app-text-muted)]">
                      {selectedCommentary.source_name} {selectedSourceMeta ? `(${selectedSourceMeta.commentary_approach})` : ''}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {isMr ? 'अधिकृत प्रमाण' : 'Verified Exegesis'}
                  </span>
                </div>

                {/* Core Interpretation */}
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-[var(--app-accent)] font-semibold flex items-center gap-1.5">
                    <Quote className="w-3.5 h-3.5" />
                    {isMr ? 'मूल तात्त्विक अर्थ (Core Philosophical Interpretation)' : 'Core Philosophical Interpretation'}
                  </p>
                  <p className="text-sm sm:text-base text-[var(--app-text)] leading-relaxed font-light bg-white/[0.02] p-4 rounded-2xl border border-[var(--app-border)]">
                    {selectedCommentary.core_interpretation}
                  </p>
                </div>

                {/* Practical Application */}
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-[#38bdf8] font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    {isMr ? 'दैनंदिन जीवनातील आचरण (Practical Living Teaching)' : 'Application to Modern Life'}
                  </p>
                  <p className="text-sm sm:text-base text-[var(--app-text)] leading-relaxed bg-[#38bdf8]/5 p-4 rounded-2xl border border-[#38bdf8]/20">
                    {selectedCommentary.practical_teaching}
                  </p>
                </div>

                {/* Source Metadata Citation Footer */}
                {selectedSourceMeta && (
                  <div className="pt-4 border-t border-[var(--app-border)] flex flex-wrap items-center justify-between text-xs text-[var(--app-text-muted)] gap-2">
                    <span><strong>{isMr ? 'दृष्टिकोन:' : 'Approach:'}</strong> {selectedSourceMeta.commentary_approach}</span>
                    <span><strong>{isMr ? 'प्रकाशन:' : 'Publisher:'}</strong> {selectedSourceMeta.publisher}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 uppercase">
                      {selectedSourceMeta.copyright_status}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Padaccheda & Word Gloss */}
      {activeSubTab === 'padaccheda' && (
        <div className="glass rounded-3xl p-6 sm:p-8 space-y-6 border border-[var(--app-border)]">
          <div className="space-y-2">
            <h3 className="text-lg font-serif font-bold text-[var(--app-accent)] flex items-center gap-2">
              <Feather className="w-4 h-4" />
              <span>{isMr ? 'पदच्छेद (Sanskrit Word Segmentation)' : 'Sanskrit Padaccheda'}</span>
            </h3>
            <p className="text-xs text-[var(--app-text-muted)]">
              {isMr 
                ? 'संधी सोडवून प्रत्येक पदाचे मूळ स्वरूप:' 
                : 'Each distinct word identified after resolving Sanskrit Sandhi:'}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {currentVerse.canonical.padaccheda.map((word, idx) => (
                <span
                  key={`padaccheda-comp-${currentVerse.verse_id}-${idx}-${word}`}
                  className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-[var(--app-border)] text-sm font-serif text-[var(--app-accent)] font-semibold"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>

          {/* Word Analysis Table */}
          <div className="space-y-3 pt-4 border-t border-[var(--app-border)]">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--app-text)]">
              {isMr ? 'शब्दार्थ व व्याकरण पृथक्करण (Word-by-Word Analysis)' : 'Word-by-Word Meanings & Grammar'}
            </h4>
            <div className="overflow-x-auto rounded-2xl border border-[var(--app-border)]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-white/[0.05] border-b border-[var(--app-border)] text-[var(--app-text-muted)] uppercase tracking-wider">
                    <th className="p-3.5">{isMr ? 'संस्कृत पद' : 'Sanskrit Word'}</th>
                    <th className="p-3.5">{isMr ? 'IAST उच्चार' : 'Transliteration'}</th>
                    <th className="p-3.5">{isMr ? 'मराठी / इंग्रजी अर्थ' : 'English / Marathi Meaning'}</th>
                    <th className="p-3.5">{isMr ? 'व्याकरण भूमिका' : 'Grammatical Role'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--app-border)] bg-black/20">
                  {currentVerse.canonical.word_analysis.map((item, idx) => (
                    <tr key={`gloss-comp-${currentVerse.verse_id}-${idx}-${item.word_sanskrit}`} className="hover:bg-white/[0.02]">
                      <td className="p-3.5 font-serif font-bold text-[var(--app-accent)] text-sm">{item.word_sanskrit}</td>
                      <td className="p-3.5 font-mono text-[var(--app-text-muted)]">{item.word_transliteration}</td>
                      <td className="p-3.5 text-[var(--app-text)]">{isMr ? (item.meaning_marathi || item.meaning_english) : item.meaning_english}</td>
                      <td className="p-3.5 text-[var(--app-text-muted)] italic">{item.grammatical_role || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 20 Sources & Attribution Catalog */}
      {activeSubTab === 'sources_catalog' && (
        <div className="glass rounded-3xl p-6 sm:p-8 space-y-6 border border-[var(--app-border)]">
          <div className="space-y-2">
            <h3 className="text-lg font-serif font-bold text-[var(--app-accent)] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>{isMr ? '२० प्रमाण संदर्भ ग्रंथ व प्रकाशक सूची' : '20 Authoritative Treatises & Attribution'}</span>
            </h3>
            <p className="text-xs text-[var(--app-text-muted)]">
              {isMr 
                ? 'GitaLens वरील सर्व विश्लेषण हे खालील २० अधिकृत मराठी व इंग्रजी भाष्य ग्रंथांवर आधारलेले आहे.' 
                : 'All synthesis in GitaLens is rigorously mapped against these 20 accredited Sanskrit, Marathi, and English commentaries.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {SOURCE_BOOKS.map((src) => (
              <div key={`src-reg-${src.id}`} className="p-4 rounded-2xl bg-white/[0.02] border border-[var(--app-border)] space-y-2 hover:border-[var(--app-border-hover)] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--app-accent)] flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-[10px] text-[var(--app-text-muted)] font-mono">
                      {src.source_number}
                    </span>
                    {isMr ? src.title_original : src.title_english}
                  </span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 uppercase tracking-wider text-[var(--app-text-muted)]">
                    {src.language}
                  </span>
                </div>

                <p className="text-xs text-[var(--app-text)] font-medium">
                  {isMr ? src.author_original : src.author_english}
                </p>

                <div className="pt-1.5 border-t border-[var(--app-border)] flex items-center justify-between text-[11px] text-[var(--app-text-muted)]">
                  <span>{src.commentary_approach}</span>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    {src.copyright_status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
