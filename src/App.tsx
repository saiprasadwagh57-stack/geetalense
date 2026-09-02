import React, { useState, useRef, useEffect, FormEvent, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Sparkles, MessageCircle, RefreshCw, ScrollText, Loader2, History, X as CloseIcon, Volume2, VolumeX, Home, Calendar, Compass, ShieldCheck, LogIn, LogOut } from "lucide-react";
import { detectEmotions, findRelevantShloka } from "./lib/logic";
import { shlokas } from "./data/shlokas";
import { getGitaWisdom, generateSpiritualImage } from "./services/aiService";
import WisdomCard from "./components/WisdomCard";
import LightTrail from "./components/LightTrail";
import AdminPortal from "./components/AdminPortal";
import { auth, trackUserActivity } from "./services/firebaseService";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [selectedShloka, setSelectedShloka] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<"en" | "mr">("en");
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"home" | "journey" | "daily" | "admin">("home");
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const ambientAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem("gitaHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsAdmin(currentUser.email === "saiprasadwagh57@gmail.com");
        trackUserActivity();
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setActiveTab("home");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const toggleAudio = () => {
    if (!ambientAudioRef.current) {
      ambientAudioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"); // Replace with subtle ambient flute if possible
      ambientAudioRef.current.loop = true;
      ambientAudioRef.current.volume = 0.1;
    }
    
    if (isAudioEnabled) {
      ambientAudioRef.current.pause();
    } else {
      ambientAudioRef.current.play().catch(console.error);
    }
    setIsAudioEnabled(!isAudioEnabled);
  };

  const handleSearch = async (e?: React.FormEvent, directInput?: string) => {
    e?.preventDefault();
    const query = directInput || userInput;
    if (!query.trim()) return;

    // Fast-feedback: Immediately set loading and clear old state
    setIsLoading(true);
    setError(null);
    setSelectedShloka(null);
    setActiveTab("home");

    // Throttled effect for mobile/slow networks
    try {
      const langName = language === "mr" ? "Marathi" : "English";
      
      const [wisdom, imageUrl] = await Promise.all([
        getGitaWisdom(query, langName),
        generateSpiritualImage(query)
      ]);
      
      setSelectedShloka({ ...wisdom, imageUrl });
      const newHistory = [query, ...history.filter(h => h !== query)].slice(0, 10);
      setHistory(newHistory);
      localStorage.setItem("gitaHistory", JSON.stringify(newHistory));
    } catch (err) {
      console.error(err);
      setError("The aetherial connection is weak. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRandom = () => {
    const randomShloka = shlokas[Math.floor(Math.random() * shlokas.length)];
    setSelectedShloka(randomShloka);
    setActiveTab("home");
    setUserInput("");
  };

  const todayShloka = useMemo(() => shlokas[new Date().getDate() % shlokas.length], []);

  return (
    <div className="min-h-[100dvh] relative selection:bg-[#d4af37]/20 selection:text-[#d4af37] flex flex-col font-sans overflow-hidden bg-black">
      <LightTrail />
      
      {/* Isolated Parallax Background */}
      <ParallaxBackground />
      <div className="fog pointer-events-none" />
      <div className="divine-energy pointer-events-none" />

      {/* Top Navigation - Minimal on Mobile, Full on Desktop */}
      <nav className="w-full pt-8 md:pt-12 pb-6 px-4 md:px-12 flex items-center justify-between fixed top-0 left-0 z-50 pointer-events-auto backdrop-blur-sm lg:backdrop-blur-none">
        <div className="flex items-center gap-8">
          <div className="flex flex-col">
            <div className="font-serif text-base md:text-xl tracking-[4px] md:tracking-[8px] text-[#d4af37] uppercase">GitaLens</div>
            <div className="text-[8px] text-white/20 tracking-[3px] uppercase">Aetherial AI</div>
          </div>

          {/* Desktop Tab Links */}
          <div className="hidden lg:flex items-center gap-8 ml-12">
            <button 
              onClick={() => setActiveTab("home")}
              className={`text-[10px] uppercase tracking-[4px] font-bold transition-all ${activeTab === "home" ? "text-[#d4af37]" : "text-white/20 hover:text-white"}`}
            >
              Home
            </button>
            <button 
              onClick={() => setActiveTab("journey")}
              className={`text-[10px] uppercase tracking-[4px] font-bold transition-all ${activeTab === "journey" ? "text-[#d4af37]" : "text-white/20 hover:text-white"}`}
            >
              Journey
            </button>
            <button 
              onClick={() => setActiveTab("daily")}
              className={`text-[10px] uppercase tracking-[4px] font-bold transition-all ${activeTab === "daily" ? "text-[#d4af37]" : "text-white/20 hover:text-white"}`}
            >
              Daily
            </button>
            {isAdmin && (
              <button 
                onClick={() => setActiveTab("admin")}
                className={`text-[10px] uppercase tracking-[4px] font-bold transition-all ${activeTab === "admin" ? "text-[#d4af37]" : "text-white/20 hover:text-white"} flex items-center gap-2`}
              >
                <ShieldCheck size={14} />
                Admin
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-[8px] text-white/40 uppercase tracking-[2px]">{user.displayName}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="transition-all p-2 md:p-3 rounded-full glass border border-white/5 text-white/20 hover:text-red-400"
                title="Logout"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLogin}
              className="px-6 py-2 rounded-full glass border border-white/5 text-[9px] uppercase tracking-[2px] font-bold text-white/40 hover:text-[#d4af37] transition-all flex items-center gap-2"
            >
              <LogIn size={12} />
              Sign In
            </button>
          )}

          <button 
            onClick={toggleAudio}
            className={`transition-all p-2 md:p-3 rounded-full glass border border-white/5 ${isAudioEnabled ? "text-[#d4af37]" : "text-white/20"}`}
          >
            {isAudioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>

          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value as "en" | "mr")}
            className="bg-black/40 border border-white/10 rounded-full py-1.5 md:py-2 px-3 md:px-6 text-[9px] uppercase tracking-[2px] font-bold text-white/40 hover:text-[#d4af37] transition-all focus:outline-none appearance-none backdrop-blur-md"
          >
            <option value="en">English</option>
            <option value="mr">मराठी</option>
          </select>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className={`flex-1 w-full ${activeTab === "admin" ? "max-w-none" : "max-w-lg md:max-w-2xl lg:max-w-5xl"} mx-auto relative z-10 px-6 pt-32 pb-32 lg:pb-12 overflow-y-auto no-scrollbar gpu-accel`}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center gap-12 pt-20 gpu-accel"
            >
              {/* Skeleton UI for better perceived performance */}
              <div className="w-full max-w-sm space-y-8 animate-pulse">
                <div className="h-4 bg-white/5 rounded-full w-2/3 mx-auto" />
                <div className="h-12 bg-white/5 rounded-[40px] w-full" />
                <div className="space-y-4">
                  <div className="h-3 bg-white/5 rounded-full w-full" />
                  <div className="h-3 bg-white/5 rounded-full w-5/6 mx-auto" />
                </div>
              </div>
              <div className="silhouette" />
              <div className="seeking-text text-[#d4af37] text-xs uppercase tracking-[4px]">
                Seeking the eternal word...
              </div>
            </motion.div>
          ) : activeTab === "admin" && isAdmin ? (
            <motion.div 
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AdminPortal />
            </motion.div>
          ) : activeTab === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col"
            >
              {!selectedShloka ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-16 text-center">
                  <div className="space-y-6">
                    <div className="label-micro opacity-40 !tracking-[0.8em]">Welcome Soul</div>
                    <h1 className="text-4xl font-serif text-white leading-tight">
                      How is your <br/>
                      <span className="text-[#d4af37] italic italic-glow">mind today?</span>
                    </h1>
                  </div>

                  <form onSubmit={handleSearch} className="w-full space-y-10">
                    <div className="relative group">
                      <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Write your problem here..."
                        disabled={isLoading}
                        rows={3}
                        className="w-full bg-white/[0.02] border border-white/5 rounded-[40px] p-8 text-center text-lg text-white placeholder:text-white/10 focus:outline-none focus:border-[#d4af37]/20 focus:bg-white/[0.04] transition-all resize-none shadow-2xl"
                      />
                      
                      <div className="flex justify-center mt-8">
                        <button 
                          type="submit"
                          disabled={!userInput.trim() || isLoading}
                          className={`w-full py-5 rounded-full font-bold text-[12px] uppercase tracking-[6px] transition-all shadow-xl ${
                            userInput.trim() && !isLoading
                            ? "bg-[#d4af37] text-black shadow-[#d4af37]/20 active:scale-95" 
                            : "bg-white/[0.02] text-white/10"
                          }`}
                        >
                          Seek Guidance
                        </button>
                      </div>
                    </div>

                    <p className="text-[10px] text-white/20 tracking-[4px] uppercase font-light">
                      Your journey of a thousand miles <br/> begins with one question
                    </p>
                  </form>
                </div>
              ) : (
                <div className="space-y-12">
                  <WisdomCard shloka={selectedShloka} language={language} userQuery={userInput} />
                  <div className="flex justify-center pt-8">
                    <button 
                      onClick={() => {
                        setSelectedShloka(null);
                        setUserInput("");
                      }}
                      className="px-12 py-4 rounded-full text-[10px] font-bold uppercase tracking-[4px] text-white/30 border border-white/10 hover:text-[#d4af37] transition-all bg-white/[0.02]"
                    >
                      Ask Again
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ) : activeTab === "journey" ? (
            <motion.div
              key="journey"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-12"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="label-micro !tracking-[0.8em]">Sacred Path</div>
                <h2 className="text-3xl font-serif text-white">Your Journey</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {history.length > 0 ? history.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => {
                      setUserInput(item);
                      handleSearch(undefined, item);
                    }}
                    className="glass p-8 rounded-[30px] border border-white/5 active:scale-[0.98] transition-all group cursor-pointer"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <p className="text-base text-white/70 group-hover:text-white transition-colors">{item}</p>
                      <RefreshCw size={14} className="text-[#d4af37]/40 flex-shrink-0 mt-1" />
                    </div>
                    <div className="mt-4 flex items-center gap-2 opacity-20">
                      <div className="h-[1px] flex-1 bg-white" />
                      <span className="text-[8px] uppercase tracking-widest font-bold">Reflect</span>
                    </div>
                  </motion.div>
                )) : (
                  <div className="text-center py-20 text-white/20 text-[10px] uppercase tracking-widest animate-pulse">
                    The path is waiting for you...
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="daily"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center gap-12"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="label-micro !tracking-[0.8em]">Celestial Alignment</div>
                <h2 className="text-3xl font-serif text-white">Daily Guidance</h2>
                <div className="text-[10px] text-white/20 uppercase tracking-widest">{new Date().toLocaleDateString(undefined, { dateStyle: 'full' })}</div>
              </div>
              
              <div className="w-full">
                <WisdomCard shloka={todayShloka} language={language} userQuery="Daily Guidance" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation - Hidden on Desktop */}
      <footer className="fixed bottom-0 left-0 w-full z-50 pb-8 px-6 pointer-events-none lg:hidden">
        <div className="max-w-md mx-auto h-20 glass border border-white/10 rounded-[40px] flex items-center justify-around px-4 pointer-events-auto shadow-2xl relative overflow-hidden">
          <button 
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === "home" ? "text-[#d4af37]" : "text-white/20"}`}
          >
            <Home size={20} />
            <span className="text-[8px] uppercase tracking-[2px] font-bold">Home</span>
          </button>

          <button 
            onClick={() => setActiveTab("journey")}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === "journey" ? "text-[#d4af37]" : "text-white/20"}`}
          >
            <Compass size={20} />
            <span className="text-[8px] uppercase tracking-[2px] font-bold">Journey</span>
          </button>

          <button 
            onClick={() => setActiveTab("daily")}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === "daily" ? "text-[#d4af37]" : "text-white/20"}`}
          >
            <Calendar size={20} />
            <span className="text-[8px] uppercase tracking-[2px] font-bold">Daily</span>
          </button>

          {isAdmin && (
            <button 
              onClick={() => setActiveTab("admin")}
              className={`flex flex-col items-center gap-1 transition-all ${activeTab === "admin" ? "text-[#d4af37]" : "text-white/20"}`}
            >
              <ShieldCheck size={20} />
              <span className="text-[8px] uppercase tracking-[2px] font-bold">Admin</span>
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}

/**
 * Isolated background movement to prevent full App re-renders on mousemove
 */
function ParallaxBackground() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const requestRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (requestRef.current) return;
      
      requestRef.current = requestAnimationFrame(() => {
        setPos({ 
          x: (e.clientX / window.innerWidth - 0.5) * 30,
          y: (e.clientY / window.innerHeight - 0.5) * 30
        });
        requestRef.current = undefined;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <motion.div 
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 50, damping: 20 }}
      className="atmosphere pointer-events-none" 
    />
  );
}
