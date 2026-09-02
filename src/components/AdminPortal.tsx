import React, { useState, useEffect } from "react";
import { getAllFeedback, getAllUsers } from "../services/firebaseService";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  MessageSquare, 
  Star, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Activity, 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Download, 
  Search, 
  RefreshCw, 
  LogOut, 
  CheckCircle2, 
  AlertCircle,
  Smartphone,
  Eye,
  EyeOff
} from "lucide-react";

interface AdminPortalProps {
  onExit?: () => void;
  language?: 'en' | 'mr';
}

export default function AdminPortal({ onExit, language = 'en' }: AdminPortalProps) {
  const isMr = language === 'mr';
  const [feedback, setFeedback] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"users" | "feedback" | "security">("users");
  const [loading, setLoading] = useState(true);
  
  // Security PIN State
  const [isUnlocked, setIsUnlocked] = useState(() => {
    return sessionStorage.getItem("gitaAdminUnlocked") === "true";
  });
  const [enteredPin, setEnteredPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [showPin, setShowPin] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");

  // Custom PIN Settings
  const [newPin, setNewPin] = useState("");
  const [pinSuccessMsg, setPinSuccessMsg] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [feedbackData, usersData] = await Promise.all([
        getAllFeedback().catch(() => []),
        getAllUsers().catch(() => [])
      ]);
      setFeedback(feedbackData || []);
      setUsers(usersData || []);
    } catch (err) {
      console.warn("Admin fetch notice:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isUnlocked) {
      fetchData();
    }
  }, [isUnlocked]);

  // Handle PIN verification
  const handlePinSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const storedPin = localStorage.getItem("gitaCustomAdminPin");
    // Accepted PINs: Custom saved PIN, or default master PINs: 5757, 1080, 7777
    const validPins = [storedPin, "5757", "1080", "7777"].filter(Boolean);

    if (validPins.includes(enteredPin.trim())) {
      setIsUnlocked(true);
      sessionStorage.setItem("gitaAdminUnlocked", "true");
      setPinError(false);
      setEnteredPin("");
    } else {
      setPinError(true);
      setTimeout(() => setPinError(false), 2000);
    }
  };

  const handleKeypadPress = (val: string) => {
    if (enteredPin.length < 6) {
      const updated = enteredPin + val;
      setEnteredPin(updated);
      const storedPin = localStorage.getItem("gitaCustomAdminPin");
      const validPins = [storedPin, "5757", "1080", "7777"].filter(Boolean);
      if (validPins.includes(updated)) {
        setIsUnlocked(true);
        sessionStorage.setItem("gitaAdminUnlocked", "true");
        setEnteredPin("");
      }
    }
  };

  const handleBackspace = () => {
    setEnteredPin(prev => prev.slice(0, -1));
  };

  const handleLockOut = () => {
    setIsUnlocked(false);
    sessionStorage.removeItem("gitaAdminUnlocked");
    if (onExit) {
      onExit();
    } else {
      window.location.hash = "";
    }
  };

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length >= 4) {
      localStorage.setItem("gitaCustomAdminPin", newPin.trim());
      setPinSuccessMsg(isMr ? "नवीन पिन यशस्वीरित्या सेव्ह केला!" : "New Admin PIN saved successfully!");
      setNewPin("");
      setTimeout(() => setPinSuccessMsg(""), 4000);
    }
  };

  // Export Users CSV
  const handleExportUsersCSV = () => {
    if (users.length === 0) return;
    const headers = ["User ID", "Name", "Email", "Mobile Number", "Visits", "Last Seen"];
    const rows = users.map(u => [
      `"${u.id || u.uid || ''}"`,
      `"${u.displayName || 'Seeker'}"`,
      `"${u.email || ''}"`,
      `"${u.phone || ''}"`,
      u.visitCount || 1,
      `"${u.lastSeen?.toDate ? u.lastSeen.toDate().toISOString() : (u.lastSeen || '')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gitalens_users_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Users
  const filteredUsers = users.filter(u => {
    const term = searchQuery.toLowerCase();
    const name = (u.displayName || '').toLowerCase();
    const email = (u.email || '').toLowerCase();
    const phone = (u.phone || '').toLowerCase();
    return name.includes(term) || email.includes(term) || phone.includes(term);
  });

  const usersWithPhoneCount = users.filter(u => u.phone && u.phone.trim().length > 0).length;

  // 1. PIN Gateway Screen
  if (!isUnlocked) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 bg-black text-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full max-w-sm glass rounded-3xl p-6 sm:p-8 border border-[#d4af37]/30 shadow-2xl text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-3xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mx-auto shadow-inner">
            <Lock size={28} />
          </div>

          <div className="space-y-1.5">
            <div className="text-[10px] font-bold tracking-[3px] uppercase text-[#d4af37]">
              {isMr ? "प्रशासक प्रवेश" : "Divine Governance"}
            </div>
            <h2 className="text-2xl font-serif font-bold text-white">
              {isMr ? "सुरक्षा पिन प्रविष्ट करा" : "Enter Admin PIN"}
            </h2>
            <p className="text-xs text-white/50">
              {isMr ? "अधिकार पडताळणीसाठी आपला गुप्त पिन टाका" : "Please enter your security PIN to access user data"}
            </p>
          </div>

          {/* Form / PIN Input */}
          <form onSubmit={handlePinSubmit} className="space-y-5">
            <div className="flex justify-center items-center gap-2">
              <input
                type={showPin ? "text" : "password"}
                maxLength={6}
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="• • • •"
                className={`w-44 text-center tracking-[8px] font-mono text-2xl py-2.5 rounded-2xl bg-white/[0.05] border outline-none transition-all ${
                  pinError
                    ? "border-rose-500 text-rose-400 animate-shake"
                    : "border-[#d4af37]/40 focus:border-[#d4af37] text-[#d4af37]"
                }`}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="p-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white/50 hover:text-white transition-colors"
                title={showPin ? "Hide PIN" : "Show PIN"}
              >
                {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {pinError && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-rose-400 flex items-center justify-center gap-1.5"
              >
                <AlertCircle size={13} />
                <span>{isMr ? "चुकीचा पिन. कृपया पुन्हा प्रयत्न करा." : "Incorrect PIN. Please try again."}</span>
              </motion.div>
            )}

            {/* Quick Keypad */}
            <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto pt-2">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeypadPress(num)}
                  className="h-11 rounded-xl bg-white/[0.04] hover:bg-white/[0.12] border border-white/5 text-base font-medium text-white transition-all active:scale-95 flex items-center justify-center cursor-pointer"
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setEnteredPin("")}
                className="h-11 rounded-xl bg-white/[0.02] hover:bg-rose-500/20 border border-white/5 text-[11px] font-bold text-rose-300 uppercase transition-all flex items-center justify-center"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => handleKeypadPress("0")}
                className="h-11 rounded-xl bg-white/[0.04] hover:bg-white/[0.12] border border-white/5 text-base font-medium text-white transition-all active:scale-95 flex items-center justify-center cursor-pointer"
              >
                0
              </button>
              <button
                type="button"
                onClick={handleBackspace}
                className="h-11 rounded-xl bg-white/[0.02] hover:bg-white/[0.1] border border-white/5 text-xs text-white/70 transition-all flex items-center justify-center"
              >
                ⌫
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#d4af37] hover:brightness-110 active:scale-98 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/20 cursor-pointer"
            >
              <KeyRound size={15} />
              <span>{isMr ? "प्रवेश उघडा (Unlock)" : "Unlock Admin Portal"}</span>
            </button>
          </form>

          <div className="pt-2 border-t border-white/5">
            <button
              onClick={() => {
                if (onExit) onExit();
                else window.location.hash = "";
              }}
              className="text-xs text-white/40 hover:text-white transition-colors"
            >
              ← {isMr ? "मुख्य पृष्ठावर परत जा" : "Back to Home"}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // 2. Unlocked Admin Portal
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-10 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] font-bold uppercase tracking-wider">
                {isMr ? "प्रशासक नियंत्रण" : "Master Admin"}
              </span>
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 size={13} /> {isMr ? "सक्रिय" : "Live Session"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
              {isMr ? "GitaLens ॲडमिन पोर्टल" : "GitaLens Admin Portal"}
            </h1>
            <p className="text-xs text-white/50">
              {isMr 
                ? "वेबसाइट वापरकर्त्यांची नावे, ईमेल, मोबाईल नंबर व प्रतिक्रियांची नोंद" 
                : "Live directory of seekers, registered mobile numbers, emails, and reflections"}
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            <button
              onClick={fetchData}
              disabled={loading}
              className="px-3.5 py-2 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-xs font-semibold text-white/80 transition-all flex items-center gap-2 cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              <span>{isMr ? "रिफ्रेश" : "Refresh"}</span>
            </button>

            <button
              onClick={handleExportUsersCSV}
              className="px-3.5 py-2 rounded-2xl bg-[#d4af37]/20 hover:bg-[#d4af37] text-[#d4af37] hover:text-black border border-[#d4af37]/40 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              title="Download Seekers Directory CSV"
            >
              <Download size={14} />
              <span>{isMr ? "CSV डाऊनलोड" : "Export CSV"}</span>
            </button>

            <button
              onClick={handleLockOut}
              className="px-3.5 py-2 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Lock & Exit Admin"
            >
              <LogOut size={14} />
              <span>{isMr ? "लॉगआउट" : "Lock & Exit"}</span>
            </button>
          </div>
        </header>

        {/* Analytics Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-white/40">
              <span className="text-[10px] font-bold uppercase tracking-wider">{isMr ? "एकूण साधक" : "Total Users"}</span>
              <Users size={16} className="text-[#d4af37]" />
            </div>
            <div className="text-2xl sm:text-3xl font-light text-white font-serif">{users.length}</div>
            <div className="text-[11px] text-white/40">{isMr ? "वेबसाइट वापरकर्ते" : "Registered Seekers"}</div>
          </div>

          <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-white/40">
              <span className="text-[10px] font-bold uppercase tracking-wider">{isMr ? "मोबाईल नंबर" : "With Mobile"}</span>
              <Smartphone size={16} className="text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-light text-emerald-400 font-serif">{usersWithPhoneCount}</div>
            <div className="text-[11px] text-white/40">{isMr ? "फोन नंबर नोंदणीकृत" : "Mobile Contacts"}</div>
          </div>

          <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-white/40">
              <span className="text-[10px] font-bold uppercase tracking-wider">{isMr ? "अभिप्राय" : "Feedbacks"}</span>
              <MessageSquare size={16} className="text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-light text-blue-400 font-serif">{feedback.length}</div>
            <div className="text-[11px] text-white/40">{isMr ? "साधक प्रतिक्रिया" : "Spiritual Reviews"}</div>
          </div>

          <div className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-white/40">
              <span className="text-[10px] font-bold uppercase tracking-wider">{isMr ? "सरासरी रेटिंग" : "Avg Rating"}</span>
              <Star size={16} className="text-amber-400" fill="currentColor" />
            </div>
            <div className="text-2xl sm:text-3xl font-light text-amber-400 font-serif">
              {feedback.length > 0 
                ? (feedback.reduce((acc, curr) => acc + (curr.rating || 5), 0) / feedback.length).toFixed(1) 
                : "5.0"}
            </div>
            <div className="text-[11px] text-white/40">{isMr ? "समाधान निर्देशांक" : "Satisfaction Score"}</div>
          </div>
        </div>

        {/* Tab Navigation & Search Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex bg-white/[0.04] p-1 rounded-2xl border border-white/10 max-w-md">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "users" ? "bg-[#d4af37] text-black font-bold shadow-md" : "text-white/60 hover:text-white"
              }`}
            >
              <Users size={16} />
              <span className="text-xs uppercase tracking-wider">{isMr ? "वापरकर्ते" : "Users"} ({users.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("feedback")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "feedback" ? "bg-[#d4af37] text-black font-bold shadow-md" : "text-white/60 hover:text-white"
              }`}
            >
              <MessageSquare size={16} />
              <span className="text-xs uppercase tracking-wider">{isMr ? "अभिप्राय" : "Feedback"} ({feedback.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "security" ? "bg-[#d4af37] text-black font-bold shadow-md" : "text-white/60 hover:text-white"
              }`}
            >
              <KeyRound size={16} />
              <span className="text-xs uppercase tracking-wider">{isMr ? "पिन बदला" : "PIN"}</span>
            </button>
          </div>

          {activeTab === "users" && (
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isMr ? "नाव, ईमेल किंवा फोन शोधा..." : "Search name, email, phone..."}
                className="w-full bg-white/[0.04] border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder-white/40 outline-none focus:border-[#d4af37]"
              />
            </div>
          )}
        </div>

        {/* Tab 1: Users Directory */}
        {activeTab === "users" && (
          <div className="space-y-4">
            {filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map((u, index) => (
                  <motion.div
                    key={u.id || u.uid || `user-${index}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="p-5 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#d4af37]/30 transition-all space-y-4 relative group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] font-bold text-base font-serif">
                          {u.displayName ? u.displayName[0].toUpperCase() : 'ॐ'}
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="text-sm font-bold text-white truncate">
                            {u.displayName || "Spiritual Seeker"}
                          </h4>
                          <span className="text-[10px] text-[#d4af37] font-mono">
                            {u.id?.slice(0, 14) || 'seeker'}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-white/50 shrink-0">
                        {u.visitCount || 1} {isMr ? "भेटी" : "visits"}
                      </span>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/5 text-xs text-white/70">
                      {/* Email */}
                      <div className="flex items-center gap-2 truncate">
                        <Mail size={13} className="text-[#d4af37] shrink-0" />
                        <span className="truncate">{u.email || <em className="text-white/30">No email registered</em>}</span>
                      </div>

                      {/* Mobile Number */}
                      <div className="flex items-center gap-2">
                        <Phone size={13} className="text-emerald-400 shrink-0" />
                        {u.phone ? (
                          <a 
                            href={`tel:${u.phone}`} 
                            className="text-emerald-400 hover:underline font-mono font-medium"
                          >
                            {u.phone}
                          </a>
                        ) : (
                          <span className="text-white/30 italic">No mobile registered</span>
                        )}
                      </div>

                      {/* Last Seen */}
                      <div className="flex items-center gap-2 text-[11px] text-white/40">
                        <Clock size={12} className="shrink-0" />
                        <span>
                          {isMr ? "शेवटची भेट: " : "Last seen: "}
                          {u.lastSeen?.toDate 
                            ? new Date(u.lastSeen.toDate()).toLocaleString() 
                            : u.lastSeen 
                            ? new Date(u.lastSeen).toLocaleString() 
                            : "Recently"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-16 rounded-3xl bg-white/[0.02] border border-white/5 text-center space-y-3">
                <Users size={40} className="text-white/20 mx-auto" />
                <p className="text-sm text-white/40">
                  {searchQuery ? "No seekers match your search criteria." : "No users registered yet."}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Feedback Logs */}
        {activeTab === "feedback" && (
          <div className="space-y-4">
            {feedback.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {feedback.map((item, idx) => (
                  <motion.div
                    key={item.id || `feedback-${idx}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#d4af37]/30 transition-all space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-1.5 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={14} fill={i < item.rating ? "currentColor" : "none"} />
                        ))}
                        <span className="text-xs font-bold text-white/70 ml-1">({item.rating}/5)</span>
                      </div>
                      <span className="text-[10px] text-white/40">
                        {item.timestamp?.toDate 
                          ? new Date(item.timestamp.toDate()).toLocaleString() 
                          : item.timestamp 
                          ? new Date(item.timestamp).toLocaleString() 
                          : "Recently"}
                      </span>
                    </div>

                    <p className="text-sm font-light italic text-white/90 leading-relaxed">
                      "{item.comment || "No written review provided."}"
                    </p>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5 text-xs">
                      <div>
                        <div className="text-[9px] uppercase tracking-wider text-white/30">Shloka</div>
                        <div className="font-semibold text-[#d4af37]">{item.shlokaReference || "Gita Guidance"}</div>
                      </div>
                      <div>
                        <div className="text-[9px] uppercase tracking-wider text-white/30">User Query</div>
                        <div className="text-white/60 truncate">{item.query || "Spiritual Inquire"}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-16 rounded-3xl bg-white/[0.02] border border-white/5 text-center space-y-3">
                <MessageSquare size={40} className="text-white/20 mx-auto" />
                <p className="text-sm text-white/40">No feedbacks recorded yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Security & PIN Management */}
        {activeTab === "security" && (
          <div className="max-w-md mx-auto p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mx-auto">
                <KeyRound size={22} />
              </div>
              <h3 className="text-xl font-serif font-bold text-white">
                {isMr ? "ॲडमिन पिन बदला" : "Update Admin PIN"}
              </h3>
              <p className="text-xs text-white/50">
                {isMr ? "आपल्या ॲडमिन पोर्टलसाठी नवीन ४ ते ६ अंकी गुप्त पिन सेट करा" : "Set your custom 4 to 6 digit security PIN"}
              </p>
            </div>

            {pinSuccessMsg && (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 size={15} />
                <span>{pinSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleUpdatePin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-wider text-white/50">
                  {isMr ? "नवीन पिन (New PIN)" : "New Security PIN (4-6 digits)"}
                </label>
                <input
                  type="password"
                  maxLength={6}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="Enter 4-6 digits"
                  required
                  className="w-full bg-white/[0.05] border border-white/10 focus:border-[#d4af37] rounded-xl px-4 py-2.5 text-sm text-white tracking-widest text-center outline-none font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#d4af37] hover:brightness-110 active:scale-98 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/20 cursor-pointer"
              >
                <ShieldCheck size={16} />
                <span>{isMr ? "पिन सेव्ह करा" : "Save New PIN"}</span>
              </button>
            </form>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px] text-white/40 space-y-1.5">
              <p className="font-semibold text-white/60">ℹ️ {isMr ? "माहिती:" : "Admin Direct Access:"}</p>
              <p>• {isMr ? "ब्राउझरमध्ये URL च्या शेवटी" : "Navigate anytime to"} <code className="text-[#d4af37]">/#admin</code> {isMr ? "टाकल्यास हे पोर्टल उघडेल." : "to open this admin screen."}</p>
              <p>• {isMr ? "डीफॉल्ट मास्टर पिन:" : "Default Master PINs:"} <code className="text-[#d4af37]">5757</code> {isMr ? "किंवा" : "or"} <code className="text-[#d4af37]">1080</code></p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
