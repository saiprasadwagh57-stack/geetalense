import React, { useState } from 'react';
import { PROBLEM_TAXONOMY, PERSONA_TAXONOMY, GITA_CONCEPTS_TAXONOMY } from '../data/taxonomy';
import { GITA_KNOWLEDGE_GRAPH } from '../data/knowledgeGraph';
import { PersonaType, ProblemCategory, VerseKnowledgeEntry } from '../types/gitaKnowledge';
import { 
  Compass, 
  Users, 
  Sparkles, 
  Search, 
  ArrowRight, 
  BookOpen, 
  Layers, 
  CheckCircle2,
  X
} from 'lucide-react';

interface KnowledgeBaseExplorerProps {
  language: 'en' | 'mr';
  onSelectVerse: (verse: VerseKnowledgeEntry) => void;
  onSelectProblemQuery: (queryText: string, persona?: PersonaType) => void;
}

export const KnowledgeBaseExplorer: React.FC<KnowledgeBaseExplorerProps> = ({
  language,
  onSelectVerse,
  onSelectProblemQuery
}) => {
  const isMr = language === 'mr';
  const [activeCategory, setActiveCategory] = useState<ProblemCategory | 'all'>('all');
  const [activePersona, setActivePersona] = useState<PersonaType | 'all'>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  const categories: { key: ProblemCategory; label_en: string; label_mr: string; icon: string }[] = [
    { key: 'student_problems', label_en: 'Student & Learning', label_mr: 'विद्यार्थी व शिक्षण', icon: '👨‍🎓' },
    { key: 'emotional_problems', label_en: 'Mind & Anxiety', label_mr: 'मानसिक शांती व तणाव', icon: '🧘' },
    { key: 'career_problems', label_en: 'Career & Work', label_mr: 'करिअर व नोकरी', icon: '💼' },
    { key: 'relationship_problems', label_en: 'Relationships & Family', label_mr: 'नातेसंबंध व कुटुंब', icon: '💖' },
    { key: 'life_problems', label_en: 'Purpose & Meaning', label_mr: 'जीवन सार्थकता व दुःख', icon: '🕊️' },
    { key: 'social_professional_problems', label_en: 'Leadership & Ethics', label_mr: 'नेतृत्व व नीतिमत्ता', icon: '👑' }
  ];

  const filteredProblems = PROBLEM_TAXONOMY.filter(p => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      const matchEn = p.title_en.toLowerCase().includes(q) || p.keywords_en.some(k => k.toLowerCase().includes(q));
      const matchMr = p.title_mr.toLowerCase().includes(q) || p.keywords_mr.some(k => k.toLowerCase().includes(q));
      return matchEn || matchMr;
    }
    return true;
  });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-fadeIn pb-12">
      
      {/* Explorer Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/25 text-[#d4af37] text-xs uppercase tracking-widest font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>{isMr ? 'जीवनातील प्रश्न व गीतेतील उपाय' : 'Life Situations & Gita Solutions'}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif text-[var(--app-text)] tracking-wide">
          {isMr ? 'विषयानुसार मार्गदर्शन शोधा' : 'Browse Guidance by Life Dilemma'}
        </h2>
        <p className="text-xs sm:text-sm text-[var(--app-text-muted)] max-w-2xl mx-auto">
          {isMr
            ? 'विद्यार्थी, पालक, व्यावसायिक आणि साधकांसाठी सर्वसामान्य जीवनातील संभ्रमांवर थेट भगवद्गीतेतील अचूक उपाय.'
            : 'Explore real-world challenges mapped directly to authentic Bhagavad Gita teachings with actionable steps.'}
        </p>
      </div>

      {/* Quick Search & Filter Input */}
      <div className="glass rounded-2xl p-4 flex items-center gap-3 border border-[var(--app-border)]">
        <Search className="w-4 h-4 text-[var(--app-accent)] shrink-0" />
        <input
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder={isMr ? "समस्या शोधा (उदा. परीक्षेची भीती, राग, एकाग्रता, नातेसंबंध)..." : "Filter topics (e.g. exam fear, anger, procrastination, career)..."}
          className="w-full bg-transparent text-sm text-[var(--app-text)] placeholder:text-[var(--app-text-subtle)] focus:outline-none"
        />
        {searchFilter && (
          <button 
            onClick={() => setSearchFilter('')}
            className="p-1 rounded-full hover:bg-white/10 text-[var(--app-text-muted)]"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Persona Filter Bar */}
      <div className="glass rounded-2xl p-4 space-y-2.5 border border-[var(--app-border)]">
        <p className="text-[11px] uppercase tracking-wider text-[var(--app-accent)] font-semibold flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" />
          <span>{isMr ? 'तुमची जीवन भूमिका (Persona):' : 'Filter by Life Role (Persona):'}</span>
        </p>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActivePersona('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              activePersona === 'all'
                ? 'bg-[#d4af37] text-black border-[#d4af37] font-semibold shadow-sm'
                : 'bg-white/[0.03] text-[var(--app-text-muted)] border-[var(--app-border)] hover:text-[var(--app-text)]'
            }`}
          >
            {isMr ? 'सर्व भूमिका' : 'All Roles'}
          </button>
          {PERSONA_TAXONOMY.map((pers) => {
            const isSelected = activePersona === pers.type;
            return (
              <button
                key={`explorer-persona-${pers.type}`}
                onClick={() => setActivePersona(pers.type)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-[#d4af37] text-black border-[#d4af37] font-semibold shadow-sm'
                    : 'bg-white/[0.03] text-[var(--app-text-muted)] border-[var(--app-border)] hover:border-[var(--app-border-hover)] hover:text-[var(--app-text)]'
                }`}
              >
                {isMr ? pers.title_mr.split('/')[0] : pers.title_en.split('/')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto pb-2 gap-2 border-b border-[var(--app-border)] no-scrollbar">
        <button
          onClick={() => setActiveCategory('all')}
          className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
            activeCategory === 'all'
              ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-sm'
              : 'bg-white/[0.02] text-[var(--app-text-muted)] border-transparent hover:text-[var(--app-text)] hover:bg-white/5'
          }`}
        >
          {isMr ? 'सर्व विषय' : 'All Categories'}
        </button>
        {categories.map((cat) => (
          <button
            key={`explorer-category-${cat.key}`}
            onClick={() => setActiveCategory(cat.key)}
            className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              activeCategory === cat.key
                ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-sm'
                : 'bg-white/[0.02] text-[var(--app-text-muted)] border-transparent hover:text-[var(--app-text)] hover:bg-white/5'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{isMr ? cat.label_mr : cat.label_en}</span>
          </button>
        ))}
      </div>

      {/* Problem Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProblems.map((problem) => (
          <div
            key={`explorer-problem-${problem.slug}`}
            className="p-5 rounded-2xl glass border border-[var(--app-border)] hover:border-[var(--app-border-hover)] transition-all space-y-3 group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <h3 className="text-base font-serif font-semibold text-[var(--app-text)] group-hover:text-[var(--app-accent)] transition-colors">
                  {isMr ? problem.title_mr : problem.title_en}
                </h3>
                <span className="text-[10px] uppercase tracking-wider text-[var(--app-text-muted)] font-mono">
                  {problem.category.replace('_', ' ')}
                </span>
              </div>
              <button
                onClick={() => onSelectProblemQuery(
                  isMr ? problem.title_mr : problem.title_en,
                  activePersona !== 'all' ? activePersona : undefined
                )}
                className="px-3 py-1.5 rounded-full text-xs bg-[#d4af37] text-black hover:brightness-110 font-semibold transition-all flex items-center gap-1.5 shrink-0 active:scale-95 shadow-sm"
              >
                <span>{isMr ? 'मार्गदर्शन घ्या' : 'Seek Wisdom'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Keyword tags */}
            <div className="flex flex-wrap gap-1.5">
              {(isMr ? problem.keywords_mr : problem.keywords_en).slice(0, 5).map((kw, i) => (
                <span key={`kw-${problem.slug}-${i}-${kw}`} className="text-[10px] px-2 py-0.5 rounded bg-white/[0.04] text-[var(--app-text-muted)] border border-[var(--app-border)]">
                  #{kw}
                </span>
              ))}
            </div>

            {/* Key Shlokas Buttons */}
            <div className="pt-2 border-t border-[var(--app-border)] flex items-center justify-between">
              <span className="text-[10px] text-[var(--app-text-muted)] uppercase tracking-wider font-semibold">
                {isMr ? 'मार्गदर्शक श्लोक:' : 'Key Shlokas:'}
              </span>
              <div className="flex gap-1.5">
                {problem.recommended_verses.map((vId, vIdx) => {
                  const verse = GITA_KNOWLEDGE_GRAPH.find(v => v.verse_id === vId);
                  return (
                    <button
                      key={`verse-btn-${problem.slug}-${vId}-${vIdx}`}
                      onClick={() => verse && onSelectVerse(verse)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-[var(--app-accent-bg)] hover:bg-[#d4af37] text-[var(--app-accent)] hover:text-black border border-[var(--app-border)] transition-all font-semibold"
                    >
                      {vId.replace('BG_', 'BG ')}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gita Concepts Taxonomy Bar */}
      <div className="glass rounded-3xl p-6 border border-[var(--app-border)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--app-accent)]" />
            <h3 className="text-sm font-serif font-semibold text-[var(--app-text)] tracking-wide">
              {isMr ? '४२ श्रीमद्भगवद्गीता तत्त्वज्ञान संकल्पना (Concepts Index)' : '42 Philosophical Concepts Taxonomy'}
            </h3>
          </div>
          <span className="text-[11px] text-[var(--app-text-muted)]">
            {GITA_CONCEPTS_TAXONOMY.length} {isMr ? 'संकल्पना' : 'Indexed Concepts'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
          {GITA_CONCEPTS_TAXONOMY.map((c) => (
            <button
              key={`concept-${c.id}`}
              onClick={() => {
                onSelectProblemQuery(
                  isMr ? `भगवद्गीतेमध्ये '${c.name_marathi}' ( किंवा ${c.name_sanskrit} ) बद्दल काय सांगितले आहे?` : `What does the Bhagavad Gita teach about ${c.name_english} (${c.name_sanskrit})?`
                );
              }}
              className="px-3 py-1.5 rounded-xl text-xs bg-white/[0.03] hover:bg-[#d4af37] border border-[var(--app-border)] hover:border-[#d4af37] text-[var(--app-text)] hover:text-black transition-all flex items-center gap-1.5"
            >
              <span className="font-serif font-semibold">{isMr ? c.name_marathi : c.name_sanskrit}</span>
              <span className="text-[10px] opacity-60">({c.name_english.split(' ')[0]})</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
