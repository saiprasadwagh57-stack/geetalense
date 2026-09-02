import { motion, AnimatePresence } from "motion/react";
import { 
  Quote, 
  Lightbulb, 
  MapPin, 
  Share2, 
  X, 
  Download, 
  Star, 
  MessageSquareCode, 
  CheckCircle2, 
  Layers, 
  Feather, 
  ShieldCheck, 
  Sparkles,
  HelpCircle,
  AlertTriangle,
  PhoneCall,
  Volume2,
  Copy,
  Check
} from "lucide-react";
import { Shloka } from "../data/shlokas";
import { AIGuidance } from "../services/aiService";
import { VerseKnowledgeEntry } from "../types/gitaKnowledge";
import { GITA_KNOWLEDGE_GRAPH } from "../data/knowledgeGraph";
import { useState } from "react";
import { submitFeedback } from "../services/firebaseService";
import { MultiSourceComparator } from "./MultiSourceComparator";

interface WisdomCardProps {
  shloka: Shloka | AIGuidance | any;
  language?: "en" | "mr";
  userQuery?: string;
  onOpenKnowledgeExplorer?: () => void;
  onOpenCommentaries?: (verseId?: string) => void;
}

export default function WisdomCard({ 
  shloka, 
  language = "en", 
  userQuery = "",
  onOpenKnowledgeExplorer,
  onOpenCommentaries
}: WisdomCardProps) {
  const isMR = language === "mr";
  const [showShareModal, setShowShareModal] = useState(false);
  const [showComparator, setShowComparator] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  
  const meaning = shloka.meaning || (isMR ? shloka.meaning_mr : shloka.meaning_en);
  const guidance = shloka.guidance || (isMR ? shloka.guidance_mr : shloka.guidance_en);
  const example = shloka.example;

  // Extract structured knowledge verse entry if available or match by reference
  const knowledgeVerse: VerseKnowledgeEntry | undefined = shloka.knowledgeVerse || GITA_KNOWLEDGE_GRAPH.find(v => 
    shloka.reference && (
      shloka.reference.includes(`${v.chapter_number}`) && 
      shloka.reference.includes(`${v.verse_number}`)
    )
  ) || GITA_KNOWLEDGE_GRAPH[0];

  const handleSpeech = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const textToSpeak = `${shloka.shloka}. ${meaning}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.88;
    utterance.lang = isMR ? 'mr-IN' : 'en-IN';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = () => {
    const text = `${shloka.reference}\n${shloka.shloka}\n\n${meaning}\n\nVia GitaLens`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(console.error);
  };

  const handleFeedback = async () => {
    if (rating === 0) return;
    setIsSubmitting(true);
    try {
      await submitFeedback({
        shlokaReference: shloka.reference,
        rating,
        comment,
        query: userQuery
      });
      setFeedbackSubmitted(true);
    } catch (error) {
      console.error("Feedback failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'GitaLens Sacred Wisdom',
        text: `${shloka.reference}: ${shloka.shloka}\n\n${meaning}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      setShowShareModal(true);
    }
  };

  const downloadCard = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const grad = ctx.createLinearGradient(0, 0, 1080, 1080);
    grad.addColorStop(0, "#0a0a0c");
    grad.addColorStop(1, "#1c1917");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1080);

    ctx.fillStyle = "#d4af37";
    ctx.font = "bold 26px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("GITALENS • SHRIMAD BHAGAVAD GITA", 540, 120);

    ctx.fillStyle = "#fef0c7";
    ctx.font = "40px serif";
    const words = (shloka.shloka || "").split(" ");
    let line = "";
    let y = 320;
    for(let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      let metrics = ctx.measureText(testLine);
      if(metrics.width > 850 && n > 0) {
        ctx.fillText(line, 540, y);
        line = words[n] + " ";
        y += 55;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 540, y);

    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.font = "italic 28px serif";
    const mWords = (meaning || "").split(" ");
    line = "";
    y += 100;
    for(let n = 0; n < mWords.length; n++) {
      let testLine = line + mWords[n] + " ";
      let metrics = ctx.measureText(testLine);
      if(metrics.width > 850 && n > 0) {
        ctx.fillText(line, 540, y);
        line = mWords[n] + " ";
        y += 45;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 540, y);

    ctx.fillStyle = "#d4af37";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText((shloka.reference || "").toUpperCase(), 540, 960);

    const link = document.createElement("a");
    link.download = `GitaLens-${shloka.reference}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={`wisdom-card-${shloka.id || shloka.reference || 'verse'}-${language}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl mx-auto px-2 sm:px-4"
        >
          <div className="relative group">
            
            <div className="glass rounded-[32px] sm:rounded-[44px] p-6 sm:p-10 md:p-14 text-center overflow-hidden relative border border-[var(--app-border)]">
              
              {/* Crisis Safety Notification if triggered */}
              {shloka.isCrisis && (
                <div className="mb-8 p-6 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-left space-y-4">
                  <div className="flex items-center gap-3 text-rose-300 font-semibold text-sm">
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                    <span>{isMR ? 'आपत्कालीन मानसिक आधार' : 'Support & Emergency Care'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-rose-100/90 leading-relaxed">
                    {shloka.safetyMessage}
                  </p>
                  {shloka.helplines && (
                    <div className="pt-2 border-t border-rose-500/20 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {shloka.helplines.map((hl: any, idx: number) => (
                        <div key={`helpline-${shloka.id || 'hl'}-${idx}-${hl.name}`} className="p-2.5 rounded-lg bg-black/40 flex items-center gap-2 text-xs text-rose-200">
                          <PhoneCall className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                          <span><strong>{hl.name}:</strong> {hl.contact}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="relative z-10 space-y-8 md:space-y-10">
                
                {/* 1. Shloka Reference, Audio Recitation & Controls */}
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                    <span className="label-micro bg-[var(--app-accent-bg)] px-3.5 py-1.5 rounded-full border border-[var(--app-border)]">
                      {shloka.reference}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 font-medium">
                      <ShieldCheck className="w-3 h-3" />
                      {isMR ? 'प्रमाणित श्लोक' : 'Verified Canonical'}
                    </span>
                    
                    {/* Audio Recitation */}
                    <button
                      onClick={handleSpeech}
                      className={`px-3 py-1 rounded-full text-xs font-medium border transition-all flex items-center gap-1.5 ${
                        isSpeaking
                          ? 'bg-[#d4af37] text-black border-[#d4af37] animate-pulse font-bold'
                          : 'bg-white/[0.04] text-[var(--app-accent)] border-[var(--app-border)] hover:bg-[#d4af37]/20'
                      }`}
                      title="Audio Recitation"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isSpeaking ? (isMR ? 'थांबवा' : 'Playing...') : (isMR ? 'श्लोक ऐका' : 'Listen')}</span>
                    </button>

                    {/* Copy Text */}
                    <button
                      onClick={handleCopy}
                      className="p-1.5 rounded-full bg-white/[0.04] hover:bg-white/10 text-[var(--app-text-muted)] hover:text-[var(--app-text)] border border-[var(--app-border)] transition-all"
                      title="Copy Shloka"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  
                  <h2 className="shloka-title text-xl sm:text-3xl md:text-4xl font-serif leading-relaxed italic px-2">
                    {shloka.shloka}
                  </h2>
                </div>

                {/* 2. Meaning Reveal */}
                <div className="max-w-3xl mx-auto space-y-2.5">
                  <div className="label-micro !text-[var(--app-accent)] text-[9px] uppercase tracking-[3px]">
                    {isMR ? 'शाश्वत बोध (The Eternal Insight)' : 'The Eternal Insight'}
                  </div>
                  <p className="text-base sm:text-lg md:text-xl font-serif text-[var(--app-text)] leading-relaxed italic">
                    "{meaning}"
                  </p>
                </div>

                {/* 3. Multi-Source Commentary & Padaccheda Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      if (onOpenCommentaries) {
                        onOpenCommentaries(knowledgeVerse?.verse_id);
                      } else {
                        setShowComparator(true);
                      }
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#d4af37] text-black hover:brightness-110 font-semibold text-xs tracking-wider transition-all flex items-center gap-2 shadow-md active:scale-95"
                  >
                    <Layers className="w-4 h-4" />
                    <span>{isMR ? '२० भाष्यकारांची तुलना पहा' : 'Compare 20 Commentators & Sources'}</span>
                  </button>

                  <button
                    onClick={() => setShowComparator(true)}
                    className="px-4 py-2.5 rounded-full bg-white/[0.03] hover:bg-white/10 text-[var(--app-text)] border border-[var(--app-border)] text-xs font-medium tracking-wider transition-all flex items-center gap-2"
                  >
                    <Feather className="w-3.5 h-3.5 text-[var(--app-accent)]" />
                    <span>{isMR ? 'पदच्छेद व शब्दार्थ' : 'Sanskrit Padaccheda'}</span>
                  </button>
                </div>

                {/* 4. Guidance & Real Life Example */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-6 border-t border-[var(--app-border)]">
                  <div className="space-y-2.5 text-left p-5 rounded-2xl bg-white/[0.02] border border-[var(--app-border)]">
                    <div className="label-micro !text-[var(--app-accent)] flex items-center gap-2 text-[9px]">
                      <MapPin size={12} />
                      <span>{isMR ? 'आत्मिक मार्गदर्शन (The Soul\'s Path)' : 'The Soul\'s Path'}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--app-text-muted)] leading-relaxed">
                      {guidance}
                    </p>
                  </div>

                  <div className="space-y-2.5 text-left p-5 rounded-2xl bg-white/[0.02] border border-[var(--app-border)]">
                    <div className="label-micro !text-[var(--app-accent)] flex items-center gap-2 text-[9px]">
                      <Lightbulb size={12} />
                      <span>{isMR ? 'प्रत्यक्ष जीवनातील उदाहरण' : 'Material Wisdom & Example'}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[var(--app-text-muted)] leading-relaxed">
                      {example}
                    </p>
                  </div>
                </div>

                {/* 5. Practical Action Steps & Reflection */}
                {knowledgeVerse && (
                  <div className="pt-2 text-left grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    
                    {/* Practical Actions */}
                    <div className="p-5 rounded-2xl bg-[var(--app-accent-bg)] border border-[var(--app-border)] space-y-3">
                      <p className="text-xs font-serif font-bold text-[var(--app-accent)] flex items-center gap-1.5 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isMR ? 'कृती आराखडा (Practical Action Steps)' : 'Practical Action Checklist'}</span>
                      </p>
                      <ul className="space-y-2">
                        {(isMR ? knowledgeVerse.application.practical_actions_mr : knowledgeVerse.application.practical_actions_en).map((act, i) => (
                          <li key={`action-${knowledgeVerse.verse_id}-${i}`} className="text-xs text-[var(--app-text)] flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--app-accent)] shrink-0 mt-0.5" />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Soul Reflection Question */}
                    <div className="p-5 rounded-2xl bg-white/[0.02] border border-[var(--app-border)] space-y-3">
                      <p className="text-xs font-serif font-bold text-[var(--app-text-muted)] flex items-center gap-1.5 uppercase tracking-wider">
                        <HelpCircle className="w-3.5 h-3.5 text-[var(--app-accent)]" />
                        <span>{isMR ? 'आत्मपरीक्षण प्रश्न' : 'Soul Reflection Prompt'}</span>
                      </p>
                      <p className="text-xs sm:text-sm italic text-[var(--app-accent)] leading-relaxed font-serif">
                        "{isMR ? knowledgeVerse.application.reflection_question_mr : knowledgeVerse.application.reflection_question_en}"
                      </p>
                    </div>

                  </div>
                )}

                {/* Action Row: Share & Download Card */}
                <div className="flex items-center justify-center gap-4 pt-2">
                  <button 
                    onClick={handleShare} 
                    className="px-5 py-2.5 rounded-full bg-white/[0.04] text-[var(--app-text)] hover:text-[var(--app-accent)] border border-[var(--app-border)] hover:border-[var(--app-border-hover)] transition-all flex items-center gap-2 text-xs font-medium"
                  >
                    <Share2 size={15} />
                    <span>{isMR ? 'शेअर करा' : 'Share'}</span>
                  </button>
                  
                  <button 
                    onClick={downloadCard} 
                    className="px-5 py-2.5 rounded-full bg-white/[0.04] text-[var(--app-text)] hover:text-[var(--app-accent)] border border-[var(--app-border)] hover:border-[var(--app-border-hover)] transition-all flex items-center gap-2 text-xs font-medium"
                  >
                    <Download size={15} />
                    <span>{isMR ? 'कार्ड डाउनलोड' : 'Save Card Image'}</span>
                  </button>
                </div>

                {/* Feedback Section */}
                <div className="pt-6 border-t border-[var(--app-border)] space-y-4">
                  {!feedbackSubmitted ? (
                    <div className="max-w-md mx-auto space-y-3">
                      <div className="label-micro !text-[var(--app-text-subtle)] tracking-[2px]">
                        {isMR ? 'हे मार्गदर्शन किती समर्पक वाटले?' : 'How relevant was this spiritual guidance?'}
                      </div>
                      <div className="flex justify-center gap-2.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={`star-rating-btn-${star}`}
                            onClick={() => setRating(star)}
                            className={`transition-all duration-200 hover:scale-125 ${rating >= star ? "text-[#d4af37]" : "text-white/20"}`}
                          >
                            <Star size={20} fill={rating >= star ? "currentColor" : "none"} />
                          </button>
                        ))}
                      </div>

                      {rating > 0 && (
                        <div className="space-y-3 pt-2">
                          <div className="relative">
                            <textarea
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder={isMR ? "काही अभिप्राय असल्यास लिहा..." : "Share your thoughts or suggest refinements..."}
                              className="w-full bg-white/[0.03] border border-[var(--app-border)] rounded-2xl p-3 text-xs text-[var(--app-text)] placeholder:text-[var(--app-text-subtle)] focus:outline-none focus:border-[#d4af37] transition-all resize-none h-18"
                            />
                            <MessageSquareCode className="absolute bottom-2.5 right-3 text-[var(--app-text-subtle)]" size={14} />
                          </div>
                          <button
                            onClick={handleFeedback}
                            disabled={isSubmitting}
                            className="w-full py-2.5 bg-[#d4af37] text-black rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95 shadow-sm"
                          >
                            {isSubmitting ? "Submitting..." : (isMR ? "अभिप्राय नोंदवा" : "Submit Feedback")}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1.5 py-2">
                      <div className="p-2 rounded-full bg-[#d4af37]/15 text-[#d4af37]">
                        <CheckCircle2 size={20} />
                      </div>
                      <div className="label-micro !text-[var(--app-accent)]">Feedback Logged</div>
                      <p className="text-xs text-[var(--app-text-muted)]">{isMR ? 'तुमचा अभिप्राय यशस्वीरीत्या नोंदवला गेला आहे.' : 'Thank you for helping us refine the wisdom database.'}</p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Multi-Source Comparison Modal */}
      {showComparator && knowledgeVerse && (
        <MultiSourceComparator
          key={`comparator-${knowledgeVerse.verse_id}`}
          verse={knowledgeVerse}
          onClose={() => setShowComparator(false)}
          language={language}
        />
      )}

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div 
            key="wisdom-card-share-modal"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/70"
          >
            <motion.div 
              key="wisdom-card-share-content"
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.95, opacity: 0 }} 
              className="bg-[#0e0e12] border border-[var(--app-border)] rounded-3xl p-6 max-w-sm w-full shadow-2xl relative"
            >
              <button onClick={() => setShowShareModal(false)} className="absolute top-4 right-4 text-white/50 hover:text-white">
                <X size={18} />
              </button>
              <div className="text-center space-y-4">
                <div className="label-micro">GitaLens Share Card</div>
                <div className="p-5 rounded-2xl bg-black/40 border border-[var(--app-border)] space-y-2 text-left">
                  <p className="text-xs font-serif text-[#d4af37] font-semibold">{shloka.reference}</p>
                  <p className="text-xs font-serif text-white/90 italic">"{meaning}"</p>
                </div>
                <button 
                  onClick={downloadCard} 
                  className="w-full py-3 bg-[#d4af37] text-black rounded-full font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all"
                >
                  {isMR ? 'कार्ड डाउनलोड करा' : 'Download Image Card'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
