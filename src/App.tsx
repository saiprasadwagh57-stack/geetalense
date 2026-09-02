import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Sparkles, 
  RefreshCw, 
  History, 
  Volume2, 
  VolumeX, 
  Home, 
  Calendar, 
  Compass, 
  ShieldCheck, 
  LogIn, 
  LogOut,
  Layers,
  Users,
  BookOpen,
  ArrowRight,
  Trash2,
  CheckCircle2
} from "lucide-react";
import { shlokas } from "./data/shlokas";
import { getGitaWisdom, generateSpiritualImage } from "./services/aiService";
import WisdomCard from "./components/WisdomCard";
import LightTrail from "./components/LightTrail";
import AdminPortal from "./components/AdminPortal";
import { KnowledgeBaseExplorer } from "./components/KnowledgeBaseExplorer";
import { CommentariesExplorer } from "./components/CommentariesExplorer";
import { ThemeSelector, ThemeType } from "./components/ThemeSelector";
import { AuthModal } from "./components/AuthModal";
import { PERSONA_TAXONOMY } from "./data/taxonomy";
import { PersonaType, VerseKnowledgeEntry } from "./types/gitaKnowledge";
import { auth, trackUserActivity } from "./services/firebaseService";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [selectedPersona, setSelectedPersona] = useState<PersonaType>("general_user");
  const [selectedShloka, setSelectedShloka] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<"en" | "mr">("en");
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"home" | "topics" | "commentaries" | "daily" | "journey" | "admin">("home");
  const [theme, setTheme] = useState<ThemeType>("dark");
  const [isLargeText, setIsLargeText] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("gitaTheme") as ThemeType;
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light' || savedTheme === 'indigo')) {
      setTheme(savedTheme);
    }

    const savedHistory = localStorage.getItem("gitaHistory");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        setHistory([]);
      }
    }

    // Check custom user session fallback
    const savedCustomUser = localStorage.getItem("gitaCustomUser");
    if (savedCustomUser) {
      try {
        const parsed = JSON.parse(savedCustomUser);
        if (parsed?.email || parsed?.displayName || parsed?.phone) {
          setUser(parsed);
          setIsAdmin(parsed.email?.toLowerCase() === "saiprasadwagh57@gmail.com");
        }
      } catch (e) {
        // ignore
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAdmin(currentUser.email?.toLowerCase() === "saiprasadwagh57@gmail.com");
        trackUserActivity();
      } else {
        const localUser = localStorage.getItem("gitaCustomUser");
        if (!localUser) {
          setUser(null);
          setIsAdmin(false);
        }
      }
    });

    // Hash routing for #admin page access
    const checkHashRoute = () => {
      const hash = window.location.hash;
      if (hash === "#admin" || hash.startsWith("#/admin") || hash === "#adminportal") {
        setActiveTab("admin");
      }
    };

    checkHashRoute();
    window.addEventListener("hashchange", checkHashRoute);

    return () => {
      unsubscribe();
      window.removeEventListener("hashchange", checkHashRoute);
    };
  }, []);

  const handleSetTheme = (newTheme: ThemeType) => {
    setTheme(newTheme);
    localStorage.setItem("gitaTheme", newTheme);
  };

  const handleCustomLogin = (profile: { uid: string; displayName: string; email: string; phone?: string }) => {
    if (profile.uid && (profile.email || profile.displayName || profile.phone)) {
      const customUser = {
        uid: profile.uid,
        displayName: profile.displayName,
        email: profile.email,
        phone: profile.phone,
        emailVerified: true
      };
      setUser(customUser);
      setIsAdmin(profile.email?.toLowerCase() === "saiprasadwagh57@gmail.com");
      localStorage.setItem("gitaCustomUser", JSON.stringify(customUser));
    } else {
      setUser(null);
      setIsAdmin(false);
      localStorage.removeItem("gitaCustomUser");
    }
  };

  const handleOpenAuth = () => {
    setIsAuthModalOpen(true);
  };

  const toggleAudio = () => {
    if (!ambientAudioRef.current) {
      ambientAudioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
      ambientAudioRef.current.loop = true;
      ambientAudioRef.current.volume = 0.15;
    }
    
    if (isAudioEnabled) {
      ambientAudioRef.current.pause();
    } else {
      ambientAudioRef.current.play().catch(console.error);
    }
    setIsAudioEnabled(!isAudioEnabled);
  };

  const handleSearch = async (e?: React.FormEvent, directInput?: string, personaParam?: PersonaType) => {
    e?.preventDefault();
    const query = directInput || userInput;
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setSelectedShloka(null);
    setActiveTab("home");

    try {
      const langName = language === "mr" ? "Marathi" : "English";
      
      const wisdom = await getGitaWisdom(query, langName);
      setSelectedShloka(wisdom);
      
      const newHistory = [query, ...history.filter(h => h !== query)].slice(0, 15);
      setHistory(newHistory);
      localStorage.setItem("gitaHistory", JSON.stringify(newHistory));

      generateSpiritualImage(query).then(imageUrl => {
        if (imageUrl) {
          setSelectedShloka((prev: any) => prev ? { ...prev, imageUrl } : prev);
        }
      }).catch(() => {});
    } catch (err) {
      console.error(err);
      setError(language === "mr" ? "कृपया पुन्हा प्रयत्न करा." : "The knowledge query encountered an error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectVerseFromExplorer = (verse: VerseKnowledgeEntry) => {
    const isMr = language === "mr";
    setSelectedShloka({
      id: verse.verse_id,
      theme: verse.canonical.chapter_theme,
      shloka: verse.canonical.shloka_devanagari,
      reference: `Chapter ${verse.chapter_number}, Verse ${verse.verse_number}`,
      meaning: isMr ? verse.translation_literal_mr : verse.translation_literal_en,
      guidance: isMr ? verse.application.gita_core_teaching_mr : verse.application.gita_core_teaching_en,
      example: isMr ? verse.application.modern_realistic_example_mr : verse.application.modern_realistic_example_en,
      knowledgeVerse: verse
    });
    setActiveTab("home");
  };

  const handleSelectProblemQuery = (queryText: string, persona?: PersonaType) => {
    setUserInput(queryText);
    if (persona) setSelectedPersona(persona);
    handleSearch(undefined, queryText, persona);
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("gitaHistory");
  };

  const todayShloka = useMemo(() => shlokas[new Date().getDate() % shlokas.length], []);

  const themeClass = `theme-${theme}`;

  return (
    <div className={`min-h-[100dvh] ${themeClass} ${isLargeText ? 'text-[17px]' : 'text-sm'} selection:bg-[#d4af37]/30 selection:text-[#d4af37] flex flex-col font-sans transition-colors duration-300 relative`}>
      <LightTrail />
      
      {/* Background Atmosphere */}
      <ParallaxBackground />

      {/* Top Header & Navigation Bar */}
      <header className="w-full sticky top-0 z-50 backdrop-blur-xl bg-[var(--app-nav-bg)] border-b border-[var(--app-border)] shadow-md">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
          
          {/* Brand Logo & Version */}
          <div 
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0" 
            onClick={() => setActiveTab("home")}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] font-serif font-bold text-base sm:text-lg group-hover:scale-105 transition-transform shadow-inner shrink-0">
              ॐ
            </div>
            <div className="shrink-0">
              <div className="font-serif text-base sm:text-lg font-bold tracking-[2px] sm:tracking-[3px] text-[var(--app-accent)] uppercase flex items-center gap-1.5">
                <span>GitaLens</span>
                <span className="text-[8px] sm:text-[9px] px-1.5 py-0.2 rounded-full bg-[var(--app-accent-bg)] text-[var(--app-accent)] border border-[var(--app-border)] font-sans lowercase">
                  v2.5
                </span>
              </div>
              <div className="text-[8px] sm:text-[9px] text-[var(--app-text-muted)] tracking-wider hidden sm:block">
                {language === "mr" ? "श्रीमद्भगवद्गीता ज्ञानकोश" : "Timeless Wisdom & 20 Commentaries"}
              </div>
            </div>
          </div>

          {/* Center Desktop Tabs - Sleek, adaptive layout for md+ screens */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 p-1 rounded-full bg-white/[0.03] border border-[var(--app-border)]">
            <button 
              onClick={() => setActiveTab("home")}
              className={`px-2.5 lg:px-3.5 py-1.5 rounded-full text-[11px] lg:text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1 lg:gap-1.5 ${
                activeTab === "home" 
                  ? "bg-[#d4af37] text-black shadow-sm" 
                  : "text-[var(--app-text-muted)] hover:text-[var(--app-text)] hover:bg-white/5"
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>{language === "mr" ? "मार्गदर्शन" : "Seek"}</span>
            </button>

            <button 
              onClick={() => setActiveTab("topics")}
              className={`px-2.5 lg:px-3.5 py-1.5 rounded-full text-[11px] lg:text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1 lg:gap-1.5 ${
                activeTab === "topics" 
                  ? "bg-[#d4af37] text-black shadow-sm" 
                  : "text-[var(--app-text-muted)] hover:text-[var(--app-text)] hover:bg-white/5"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{language === "mr" ? "विषय" : "Topics"}</span>
            </button>

            <button 
              onClick={() => setActiveTab("commentaries")}
              className={`px-2.5 lg:px-3.5 py-1.5 rounded-full text-[11px] lg:text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1 lg:gap-1.5 ${
                activeTab === "commentaries" 
                  ? "bg-[#d4af37] text-black shadow-sm" 
                  : "text-[var(--app-text-muted)] hover:text-[var(--app-text)] hover:bg-white/5"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{language === "mr" ? "२० भाष्ये" : "20 Books"}</span>
            </button>

            <button 
              onClick={() => setActiveTab("daily")}
              className={`px-2.5 lg:px-3.5 py-1.5 rounded-full text-[11px] lg:text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1 lg:gap-1.5 ${
                activeTab === "daily" 
                  ? "bg-[#d4af37] text-black shadow-sm" 
                  : "text-[var(--app-text-muted)] hover:text-[var(--app-text)] hover:bg-white/5"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{language === "mr" ? "दैनंदिन" : "Daily"}</span>
            </button>

            <button 
              onClick={() => setActiveTab("journey")}
              className={`px-2.5 lg:px-3.5 py-1.5 rounded-full text-[11px] lg:text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1 lg:gap-1.5 ${
                activeTab === "journey" 
                  ? "bg-[#d4af37] text-black shadow-sm" 
                  : "text-[var(--app-text-muted)] hover:text-[var(--app-text)] hover:bg-white/5"
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>{language === "mr" ? "प्रवास" : "Journey"}</span>
            </button>

            {isAdmin && (
              <button 
                onClick={() => setActiveTab("admin")}
                className={`px-2.5 lg:px-3 py-1.5 rounded-full text-[11px] lg:text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1 lg:gap-1.5 ${
                  activeTab === "admin" 
                    ? "bg-[#d4af37] text-black shadow-sm" 
                    : "text-[var(--app-text-muted)] hover:text-[var(--app-text)] hover:bg-white/5"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin</span>
              </button>
            )}
          </nav>

          {/* Right Action Tools: Themes, Audio, Language, Auth - Fixed in place without overflow */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Theme Selector */}
            <ThemeSelector
              theme={theme}
              setTheme={handleSetTheme}
              isLargeText={isLargeText}
              setIsLargeText={setIsLargeText}
              language={language}
            />

            {/* Ambient Music */}
            <button 
              onClick={toggleAudio}
              className={`w-8 h-8 rounded-full border transition-all flex items-center justify-center shrink-0 ${
                isAudioEnabled 
                  ? "bg-[#d4af37] text-black border-[#d4af37] shadow-sm animate-pulse" 
                  : "bg-white/[0.04] text-[var(--app-text-muted)] border-[var(--app-border)] hover:text-[var(--app-text)]"
              }`}
              title="Ambient Meditation Chants"
              aria-label="Ambient Chants"
            >
              {isAudioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === "en" ? "mr" : "en")}
              className="h-8 px-2.5 rounded-full bg-white/[0.04] border border-[var(--app-border)] hover:border-[#d4af37] text-xs font-bold text-[var(--app-text)] transition-all flex items-center gap-1 shadow-sm shrink-0"
              title="Toggle Language (English / मराठी)"
              aria-label="Toggle Language"
            >
              <span className="text-[11px]">🌐</span>
              <span className="text-[11px]">{language === "en" ? "मराठी" : "EN"}</span>
            </button>

            {/* Auth / Profile Button */}
            {user ? (
              <button 
                onClick={handleOpenAuth}
                className="h-8 flex items-center gap-1.5 px-2.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-[var(--app-border)] transition-all cursor-pointer group shrink-0"
                title="View Profile / Account"
              >
                <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[10px] font-bold text-[#d4af37] shrink-0">
                  {user.displayName ? user.displayName[0].toUpperCase() : 'ॐ'}
                </div>
                <span className="text-xs font-semibold text-[var(--app-text)] group-hover:text-[var(--app-accent)] transition-colors max-w-[65px] sm:max-w-[90px] truncate">
                  {user.displayName?.split(' ')[0] || 'Seeker'}
                </span>
                {isAdmin && (
                  <span className="text-[8px] px-1.5 py-0.2 rounded-full bg-[#d4af37] text-black font-bold uppercase shrink-0 hidden sm:inline">
                    Admin
                  </span>
                )}
              </button>
            ) : (
              <button 
                onClick={handleOpenAuth}
                className="h-8 px-3 rounded-full bg-[#d4af37] hover:brightness-110 active:scale-95 text-black border border-[#d4af37] text-xs font-bold tracking-wider transition-all flex items-center gap-1.5 shadow-sm shrink-0"
              >
                <LogIn size={13} />
                <span>Sign In</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* Main Content View with Tab Routing */}
      <main className={`flex-1 w-full ${activeTab === "admin" ? "max-w-none" : "max-w-5xl"} mx-auto relative z-10 px-4 sm:px-6 pt-6 pb-24 md:pb-12`}>
        <AnimatePresence mode="wait">
          
          {/* Loading View */}
          {isLoading ? (
            <motion.div 
              key="loading-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="min-h-[50vh] flex flex-col items-center justify-center gap-6 text-center py-16"
            >
              <div className="w-16 h-16 rounded-full border-3 border-[#d4af37]/20 border-t-[#d4af37] animate-spin flex items-center justify-center shadow-lg">
                <Sparkles className="w-7 h-7 text-[#d4af37] animate-pulse" />
              </div>
              <div className="space-y-2">
                <p className="text-base font-serif font-bold text-[var(--app-accent)] tracking-wider">
                  {language === "mr" ? "२० अधिकृत भाष्य ग्रंथांमधून मार्गदर्शन शोधत आहे..." : "Consulting 20 Authoritative Gita Treatises..."}
                </p>
                <p className="text-xs text-[var(--app-text-muted)]">
                  {language === "mr" ? "तुमच्या प्रश्नासाठी सत्य, प्रमाण व व्यावहारिक उत्तर..." : "Synthesizing authentic wisdom with practical action steps..."}
                </p>
              </div>
            </motion.div>
          ) : activeTab === "home" ? (
            
            /* TAB 1: SEEK WISDOM */
            <motion.div
              key="tab-home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              {!selectedShloka ? (
                <div className="flex flex-col items-center justify-center min-h-[55vh] space-y-8 text-center py-4">
                  
                  {/* Hero Title */}
                  <div className="space-y-3 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs uppercase tracking-widest font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{language === "mr" ? "भगवद्गीता ज्ञान व उपाय" : "Universal Dilemma Solver"}</span>
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-serif text-[var(--app-text)] leading-tight tracking-tight">
                      {language === "mr" ? (
                        <>तुमच्या मनातील संभ्रम <br/><span className="text-[var(--app-accent)] italic">येथे व्यक्त करा</span></>
                      ) : (
                        <>Find Timeless Answers <br/><span className="text-[var(--app-accent)] italic">for Everyday Life</span></>
                      )}
                    </h1>
                    <p className="text-xs sm:text-sm text-[var(--app-text-muted)] max-w-lg mx-auto">
                      {language === "mr" 
                        ? "विद्यार्थी, नोकरदार, पालक व साधकांसाठी भगवद्गीतेतील २० प्रमाण ग्रंथांवर आधारित अचूक मार्गदर्शन." 
                        : "Ask any personal question, stress point, or career dilemma to receive verified Gita guidance."}
                    </p>
                  </div>

                  {/* Persona Selector Pill Row */}
                  <div className="w-full max-w-2xl space-y-2.5">
                    <p className="text-[11px] uppercase tracking-wider text-[var(--app-accent)] font-semibold flex items-center justify-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      <span>{language === "mr" ? "तुमची भूमिका निवडा (Persona):" : "Choose Your Context:"}</span>
                    </p>
                    <div className="flex flex-wrap justify-center gap-1.5">
                      {PERSONA_TAXONOMY.map((pers) => {
                        const isSelected = selectedPersona === pers.type;
                        return (
                          <button
                            key={`app-persona-${pers.type}`}
                            type="button"
                            onClick={() => setSelectedPersona(pers.type)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                              isSelected
                                ? "bg-[#d4af37] text-black border-[#d4af37] font-semibold shadow-md scale-102"
                                : "bg-white/[0.03] text-[var(--app-text-muted)] border-[var(--app-border)] hover:border-[var(--app-border-hover)] hover:text-[var(--app-text)]"
                            }`}
                          >
                            {language === "mr" ? pers.title_mr.split('/')[0] : pers.title_en.split('/')[0]}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Search Input Box */}
                  <form onSubmit={handleSearch} className="w-full max-w-2xl space-y-5">
                    <div className="glass rounded-3xl p-3 sm:p-4 border border-[var(--app-border)] focus-within:border-[#d4af37] shadow-xl transition-all">
                      <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder={
                          language === "mr" 
                            ? "उदा. परीक्षेची भीती वाटते, कामात लक्ष लागत नाही, रागावर नियंत्रण कसे मिळवावे, अपयशाचे दुःख..." 
                            : "Type your dilemma (e.g. fear of exams, career confusion, dealing with anger, finding life purpose)..."
                        }
                        disabled={isLoading}
                        rows={3}
                        className="w-full bg-transparent p-3 text-base text-[var(--app-text)] placeholder:text-[var(--app-text-subtle)] focus:outline-none resize-none"
                      />
                      
                      <div className="flex items-center justify-between pt-2 border-t border-[var(--app-border)]">
                        <span className="text-[11px] text-[var(--app-text-muted)] hidden sm:inline">
                          {language === "mr" ? "२० भाष्य ग्रंथांमधून संदर्भ शोधले जातील" : "Referencing 20 verified commentaries"}
                        </span>
                        
                        <button 
                          type="submit"
                          disabled={!userInput.trim() || isLoading}
                          className={`px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                            userInput.trim() && !isLoading
                            ? "bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20 active:scale-95 hover:brightness-110" 
                            : "bg-white/[0.04] text-[var(--app-text-subtle)] border border-[var(--app-border)] cursor-not-allowed"
                          }`}
                        >
                          <Search className="w-4 h-4" />
                          <span>{language === "mr" ? "मार्गदर्शन मिळवा" : "Seek Guidance"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Quick Dilemma Suggestions */}
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--app-text-subtle)] font-semibold">
                        {language === "mr" ? "वारंवार विचारले जाणारे प्रश्न:" : "Popular Everyday Questions:"}
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {(language === "mr" ? [
                          "परीक्षेची भीती आणि तणाव कसा घालवावा?",
                          "कामात एकाग्रता कशी वाढवावी?",
                          "रागावर नियंत्रण कसे मिळवावे?",
                          "भविष्याची चिंता आणि अनिर्णय",
                          "अपयशाची भीती कशी घालवावी?"
                        ] : [
                          "Exam anxiety & fear of failure",
                          "How to master focus & conquer procrastination",
                          "Dealing with anger & emotional pain",
                          "Overcoming overthinking & anxiety",
                          "Finding my true purpose (Svadharma)"
                        ]).map((promptText, idx) => (
                          <button
                            key={`quick-prompt-${language}-${idx}`}
                            type="button"
                            onClick={() => {
                              setUserInput(promptText);
                              handleSearch(undefined, promptText);
                            }}
                            className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/[0.03] border border-[var(--app-border)] text-[var(--app-text-muted)] hover:text-[var(--app-text)] hover:border-[var(--app-border-hover)] hover:bg-white/5 transition-all active:scale-95"
                          >
                            {promptText}
                          </button>
                        ))}
                      </div>
                    </div>

                  </form>
                </div>
              ) : (
                <div className="space-y-8">
                  <WisdomCard 
                    shloka={selectedShloka} 
                    language={language} 
                    userQuery={userInput} 
                    onOpenKnowledgeExplorer={() => setActiveTab("topics")}
                    onOpenCommentaries={() => setActiveTab("commentaries")}
                  />
                  
                  {/* Action Bar Below Result */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button 
                      onClick={() => {
                        setSelectedShloka(null);
                        setUserInput("");
                      }}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[var(--app-text)] border border-[var(--app-border)] hover:border-[var(--app-border-hover)] transition-all bg-white/[0.03]"
                    >
                      {language === "mr" ? "दुसरा प्रश्न विचारा" : "Ask Another Question"}
                    </button>
                    <button 
                      onClick={() => setActiveTab("commentaries")}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#d4af37] text-black hover:brightness-110 transition-all flex items-center gap-2 shadow-sm"
                    >
                      <BookOpen size={14} />
                      <span>{language === "mr" ? "भाष्यकार मते पहा" : "Compare 20 Commentaries"}</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ) : activeTab === "topics" ? (

            /* TAB 2: LIFE TOPICS EXPLORER */
            <motion.div
              key="tab-topics"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <KnowledgeBaseExplorer
                language={language}
                onSelectVerse={handleSelectVerseFromExplorer}
                onSelectProblemQuery={handleSelectProblemQuery}
              />
            </motion.div>
          ) : activeTab === "commentaries" ? (

            /* TAB 3: 20 COMMENTARIES & SANSKRIT ANALYSIS */
            <motion.div
              key="tab-commentaries"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <CommentariesExplorer
                language={language}
                onSelectWisdom={handleSelectVerseFromExplorer}
              />
            </motion.div>
          ) : activeTab === "daily" ? (

            /* TAB 4: DAILY CELESTIAL SHLOKA */
            <motion.div
              key="tab-daily"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 text-center"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs uppercase tracking-widest font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{language === "mr" ? "आजचा श्लोक" : "Verse of the Day"}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-serif text-[var(--app-text)]">
                  {language === "mr" ? "दैनंदिन भगवद्गीता चिंतन" : "Daily Sacred Contemplation"}
                </h2>
                <p className="text-xs text-[var(--app-text-muted)] font-mono">
                  {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              
              <div className="w-full text-left">
                <WisdomCard 
                  shloka={todayShloka} 
                  language={language} 
                  userQuery="Daily Guidance" 
                  onOpenCommentaries={() => setActiveTab("commentaries")}
                />
              </div>
            </motion.div>
          ) : activeTab === "journey" ? (

            /* TAB 5: MY SACRED JOURNEY & SEARCH HISTORY */
            <motion.div
              key="tab-journey"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--app-border)] pb-4">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-[var(--app-text)] flex items-center gap-2">
                    <History className="w-5 h-5 text-[var(--app-accent)]" />
                    <span>{language === "mr" ? "माझा शोध प्रवास" : "Your Sacred Inquiries & History"}</span>
                  </h2>
                  <p className="text-xs text-[var(--app-text-muted)]">
                    {language === "mr" ? "तुम्ही विचारलेले मागील प्रश्न व संदर्भ" : "Quickly revisit your previous life inquiries and reflections."}
                  </p>
                </div>

                {history.length > 0 && (
                  <button
                    onClick={handleClearHistory}
                    className="px-3 py-1.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-medium transition-all flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{language === "mr" ? "इतिहास पुसा" : "Clear History"}</span>
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {history.length > 0 ? history.map((item, idx) => (
                  <div
                    key={`journey-item-${idx}-${item.slice(0, 15)}`}
                    onClick={() => {
                      setUserInput(item);
                      handleSearch(undefined, item);
                    }}
                    className="p-4 rounded-2xl glass border border-[var(--app-border)] hover:border-[#d4af37] transition-all cursor-pointer group flex items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-[var(--app-text)] group-hover:text-[var(--app-accent)] transition-colors">
                        {item}
                      </p>
                      <span className="text-[10px] text-[var(--app-text-muted)] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {language === "mr" ? "पुन्हा मार्गदर्शन मिळवण्यासाठी क्लिक करा" : "1-tap to re-consult"}
                      </span>
                    </div>
                    <RefreshCw size={15} className="text-[var(--app-text-muted)] group-hover:text-[var(--app-accent)] shrink-0 transition-transform group-hover:rotate-180 duration-500" />
                  </div>
                )) : (
                  <div className="col-span-2 text-center py-16 glass rounded-3xl border border-[var(--app-border)] space-y-3">
                    <p className="text-sm text-[var(--app-text-muted)]">
                      {language === "mr" ? "अद्याप कोणताही मागील शोध नाही." : "Your inquiry path will appear here as you seek wisdom."}
                    </p>
                    <button
                      onClick={() => setActiveTab("home")}
                      className="px-5 py-2 rounded-full bg-[#d4af37] text-black font-semibold text-xs transition-all shadow-sm"
                    >
                      {language === "mr" ? "पहिले मार्गदर्शन विचारा" : "Ask Your First Question"}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ) : activeTab === "admin" && isAdmin ? (

            /* TAB 6: ADMIN PORTAL */
            <motion.div 
              key="tab-admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AdminPortal />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {/* Mobile Sticky Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 p-2.5 bg-[var(--app-nav-bg)] backdrop-blur-2xl border-t border-[var(--app-border)] shadow-2xl">
        <div className="flex items-center justify-around">
          <button 
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
              activeTab === "home" ? "text-[var(--app-accent)] font-bold" : "text-[var(--app-text-muted)]"
            }`}
          >
            <Home size={18} />
            <span className="text-[9px] uppercase tracking-wider">Seek</span>
          </button>

          <button 
            onClick={() => setActiveTab("topics")}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
              activeTab === "topics" ? "text-[var(--app-accent)] font-bold" : "text-[var(--app-text-muted)]"
            }`}
          >
            <Compass size={18} />
            <span className="text-[9px] uppercase tracking-wider">Topics</span>
          </button>

          <button 
            onClick={() => setActiveTab("commentaries")}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
              activeTab === "commentaries" ? "text-[var(--app-accent)] font-bold" : "text-[var(--app-text-muted)]"
            }`}
          >
            <BookOpen size={18} />
            <span className="text-[9px] uppercase tracking-wider">20 Books</span>
          </button>

          <button 
            onClick={() => setActiveTab("daily")}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
              activeTab === "daily" ? "text-[var(--app-accent)] font-bold" : "text-[var(--app-text-muted)]"
            }`}
          >
            <Calendar size={18} />
            <span className="text-[9px] uppercase tracking-wider">Daily</span>
          </button>

          <button 
            onClick={() => setActiveTab("journey")}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
              activeTab === "journey" ? "text-[var(--app-accent)] font-bold" : "text-[var(--app-text-muted)]"
            }`}
          >
            <History size={18} />
            <span className="text-[9px] uppercase tracking-wider">Journey</span>
          </button>

          {isAdmin && (
            <button 
              onClick={() => setActiveTab("admin")}
              className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all ${
                activeTab === "admin" ? "text-[var(--app-accent)] font-bold" : "text-[var(--app-text-muted)]"
              }`}
            >
              <ShieldCheck size={18} />
              <span className="text-[9px] uppercase tracking-wider">Admin</span>
            </button>
          )}

          {/* Mobile Profile Trigger */}
          <button
            onClick={handleOpenAuth}
            className="flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-[var(--app-text-muted)]"
          >
            <LogIn size={18} />
            <span className="text-[9px] uppercase tracking-wider">
              {user ? (user.displayName ? user.displayName.slice(0, 5) : 'User') : 'Login'}
            </span>
          </button>
        </div>
      </nav>

      {/* Dedicated Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={user}
        isAdmin={isAdmin}
        language={language}
        onCustomLogin={handleCustomLogin}
      />

    </div>
  );
}

/**
 * Atmospheric background movement
 */
function ParallaxBackground() {
  return (
    <div className="atmosphere pointer-events-none" />
  );
}
