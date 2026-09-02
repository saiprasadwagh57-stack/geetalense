import { motion, AnimatePresence } from "motion/react";
import { Quote, Lightbulb, MapPin, Share2, X, Download, Star, MessageSquareCode, CheckCircle2 } from "lucide-react";
import { Shloka } from "../data/shlokas";
import { AIGuidance } from "../services/aiService";
import { useState } from "react";
import { submitFeedback } from "../services/firebaseService";

interface WisdomCardProps {
  shloka: Shloka | AIGuidance | any;
  language?: "en" | "mr";
  userQuery?: string;
}

export default function WisdomCard({ shloka, language = "en", userQuery = "" }: WisdomCardProps) {
  const isMR = language === "mr";
  const [showShareModal, setShowShareModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  
  const meaning = shloka.meaning || (isMR ? shloka.meaning_mr : shloka.meaning_en);
  const guidance = shloka.guidance || (isMR ? shloka.guidance_mr : shloka.guidance_en);
  const example = shloka.example;

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
        title: 'GitaLens Wisdom',
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
    grad.addColorStop(0, "#0c0c0c");
    grad.addColorStop(1, "#1a2a6c");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1080);

    ctx.globalAlpha = 0.05;
    ctx.fillStyle = "#fff";
    for(let i=0; i<1080; i+=20) {
      for(let j=0; j<1080; j+=20) {
        ctx.beginPath();
        ctx.arc(i, j, 1, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = "#d4af37";
    ctx.font = "bold 24px Inter";
    ctx.textAlign = "center";
    ctx.letterSpacing = "10px";
    ctx.fillText("GITALENS", 540, 100);

    ctx.fillStyle = "#f2e6d0";
    ctx.font = "48px 'Cormorant Garamond'";
    const words = shloka.shloka.split(" ");
    let line = "";
    let y = 300;
    for(let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + " ";
      let metrics = ctx.measureText(testLine);
      if(metrics.width > 800 && n > 0) {
        ctx.fillText(line, 540, y);
        line = words[n] + " ";
        y += 60;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 540, y);

    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "italic 32px 'Cormorant Garamond'";
    const mWords = meaning.split(" ");
    line = "";
    y += 100;
    for(let n = 0; n < mWords.length; n++) {
      let testLine = line + mWords[n] + " ";
      let metrics = ctx.measureText(testLine);
      if(metrics.width > 800 && n > 0) {
        ctx.fillText(line, 540, y);
        line = mWords[n] + " ";
        y += 45;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 540, y);

    ctx.fillStyle = "#d4af37";
    ctx.font = "bold 20px Inter";
    ctx.fillText(shloka.reference.toUpperCase(), 540, 950);

    const link = document.createElement("a");
    link.download = `GitaLens-${shloka.reference}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${shloka.id || shloka.reference}-${language}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl mx-auto px-4 gpu-accel"
      >
        <div className="relative group">
          {/* Subtle Divine Glow - Floating Element */}
          <div className="absolute inset-0 bg-radial-gradient from-[#d4af37]/5 to-transparent blur-3xl opacity-50" />
          
          <div className="glass breathe rounded-[40px] md:rounded-[80px] p-8 md:p-24 text-center overflow-hidden relative">
            {/* Cinematic Background Image Overlay if exists */}
            {shloka.imageUrl && (
              <div className="absolute inset-0 z-0">
                <img 
                  src={shloka.imageUrl} 
                  alt="" 
                  className="w-full h-full object-cover opacity-10 md:opacity-20 scale-110 blur-2xl transition-opacity duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
              </div>
            )}

            <div className="relative z-10 space-y-16 md:y-24">
              {/* 1. Shloka Reveal */}
              <motion.section 
                initial={{ opacity: 0, scale: 0.98, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 40, damping: 20 }}
                className="space-y-8"
              >
                <div className="flex flex-col items-center gap-4">
                  <span className="label-micro !tracking-[0.6em]">{shloka.reference}</span>
                  <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
                </div>
                
                <h2 className="shloka-title text-[28px] md:text-[56px] font-serif leading-tight italic px-2">
                  {shloka.shloka}
                </h2>
              </motion.section>

              {/* 2. Meaning Reveal */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 40, damping: 20 }}
                className="max-w-2xl mx-auto space-y-4"
              >
                <div className="label-micro !text-white/10 !tracking-[0.4em] text-[8px]">The Eternal Insight</div>
                <p className="text-xl md:text-2xl font-serif text-white/70 leading-relaxed italic">
                  "{meaning}"
                </p>
              </motion.div>

              {/* 3. Guidance & Example Reveal */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 40, damping: 20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 pt-12 border-t border-white/5"
              >
                <div className="space-y-4 text-center md:text-left">
                  <div className="label-micro !text-[#d4af37]/30 flex items-center justify-center md:justify-start gap-2 text-[8px]">
                    <MapPin size={10} />
                    The Soul's Path
                  </div>
                  <p className="text-sm font-light text-white/40 leading-relaxed">
                    {guidance}
                  </p>
                </div>

                <div className="space-y-4 text-center md:text-left">
                  <div className="label-micro !text-[#d4af37]/30 flex items-center justify-center md:justify-start gap-2 text-[8px]">
                    <Lightbulb size={10} />
                    Material Wisdom
                  </div>
                  <p className="text-sm font-light text-white/40 leading-relaxed">
                    {example}
                  </p>
                </div>
              </motion.div>

              {/* Enhanced Action Row - Mobile Focused */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4 }}
                className="flex items-center justify-center gap-10"
              >
                <button onClick={handleShare} className="p-6 rounded-full glass text-white/20 hover:text-[#d4af37] transition-all">
                  <Share2 size={20} />
                </button>
                
                <button onClick={downloadCard} className="p-6 rounded-full glass text-white/20 hover:text-[#d4af37] transition-all">
                  <Download size={20} />
                </button>
              </motion.div>

              {/* 4. Feedback Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3 }}
                className="pt-12 border-t border-white/5 space-y-8"
              >
                {!feedbackSubmitted ? (
                  <div className="max-w-md mx-auto space-y-6">
                    <div className="space-y-4">
                      <div className="label-micro !text-white/20 tracking-[4px]">How relevant is this guidance?</div>
                      <div className="flex justify-center gap-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className={`transition-all duration-300 hover:scale-125 ${rating >= star ? "text-[#d4af37]" : "text-white/5"}`}
                          >
                            <Star size={24} fill={rating >= star ? "currentColor" : "none"} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {rating > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-6"
                      >
                        <div className="relative">
                          <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Report an issue or suggest improvement..."
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-[#d4af37]/40 transition-all resize-none h-24"
                          />
                          <MessageSquareCode className="absolute bottom-4 right-4 text-white/5" size={16} />
                        </div>
                        <button
                          onClick={handleFeedback}
                          disabled={isSubmitting}
                          className="w-full py-4 bg-white/[0.03] border border-white/10 hover:border-[#d4af37]/40 text-white/40 hover:text-[#d4af37] rounded-full text-[10px] font-bold uppercase tracking-[4px] transition-all flex items-center justify-center gap-3 active:scale-95"
                        >
                          {isSubmitting ? "Sending..." : "Submit Response"}
                        </button>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-4 py-8"
                  >
                    <div className="p-4 rounded-full bg-[#d4af37]/10 text-[#d4af37]">
                      <CheckCircle2 size={32} />
                    </div>
                    <div className="label-micro !text-[#d4af37] !opacity-100">Feedback Logged in Eternity</div>
                    <p className="text-[10px] text-white/20 uppercase tracking-[2px]">Thank you for helping us refine the guide.</p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 text-center opacity-10 text-[10px] uppercase tracking-[1em] font-light">
          Boundless • Eternal • One
        </div>
      </motion.div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-black/60">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#0c0c0c] border border-white/10 rounded-[40px] p-8 max-w-sm w-full shadow-2xl relative">
              <button onClick={() => setShowShareModal(false)} className="absolute top-6 right-6 text-white/40 hover:text-white">
                <X size={20} />
              </button>
              <div className="text-center space-y-6">
                <div className="label-micro">Wisdom Card</div>
                <div className="aspect-square bg-gradient-to-br from-[#1a2a6c] to-[#d4af37]/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 border border-white/10 overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_#fff_1px,_transparent_1px)] bg-[size:10px_10px]" />
                  <Quote className="text-[#d4af37] opacity-20" size={40} />
                  <p className="text-lg font-serif text-[#f2e6d0] italic leading-relaxed">
                    "{meaning.length > 150 ? meaning.substring(0, 150) + "..." : meaning}"
                  </p>
                  <p className="text-[10px] text-[#d4af37] tracking-widest uppercase">{shloka.reference}</p>
                </div>
                <div className="flex flex-col gap-3">
                   <button onClick={downloadCard} className="w-full py-4 bg-[#d4af37] text-black rounded-full font-bold text-xs uppercase tracking-[2px] hover:scale-[1.02] active:scale-[0.98] transition-all">
                     Download Card
                   </button>
                   <p className="text-[10px] text-white/20 uppercase tracking-widest">Share on Social Media</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
