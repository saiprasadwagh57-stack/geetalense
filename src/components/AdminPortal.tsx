import { useState, useEffect } from "react";
import { getAllFeedback, getAllUsers } from "../services/firebaseService";
import { motion } from "motion/react";
import { Users, MessageSquare, Star, Clock, User, Mail, Hash, Activity } from "lucide-react";

export default function AdminPortal() {
  const [feedback, setFeedback] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"feedback" | "users">("feedback");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [feedbackData, usersData] = await Promise.all([
        getAllFeedback(),
        getAllUsers()
      ]);
      setFeedback(feedbackData);
      setUsers(usersData);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="label-micro !text-[#d4af37] animate-pulse tracking-[4px]">Accessing Akashic Records...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-4">
            <div className="label-micro !text-[#d4af37] tracking-[4px]">Divine Governance</div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight">Admin Portal</h1>
          </div>

          <div className="flex bg-white/[0.03] p-1 rounded-2xl border border-white/5">
            <button
              onClick={() => setActiveTab("feedback")}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all ${activeTab === "feedback" ? "bg-white/[0.05] text-[#d4af37] shadow-xl" : "text-white/40 hover:text-white"}`}
            >
              <MessageSquare size={18} />
              <span className="text-[10px] font-bold uppercase tracking-[2px]">Feedback ({feedback.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all ${activeTab === "users" ? "bg-white/[0.05] text-[#d4af37] shadow-xl" : "text-white/40 hover:text-white"}`}
            >
              <Users size={18} />
              <span className="text-[10px] font-bold uppercase tracking-[2px]">Users ({users.length})</span>
            </button>
          </div>
        </header>

        <main className="space-y-8">
          {activeTab === "feedback" ? (
            <div className="grid grid-cols-1 gap-6">
              {feedback.map((item) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={item.id}
                  className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 md:p-8 space-y-6 hover:border-[#d4af37]/20 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[#d4af37]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} size={14} fill={i < item.rating ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <div className="text-xl font-light italic text-white/80">"{item.comment || "No comment provided."}"</div>
                    </div>
                    <div className="text-right">
                      <div className="label-micro !text-white/20">
                        {item.timestamp?.toDate 
                          ? new Date(item.timestamp.toDate()).toLocaleString() 
                          : item.timestamp 
                          ? new Date(item.timestamp).toLocaleString() 
                          : "Recently"}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-white/5">
                    <div className="space-y-1">
                      <div className="label-micro !text-white/20 !text-[8px] tracking-[2px]">Shloka Reference</div>
                      <div className="text-sm font-medium tracking-tight">{item.shlokaReference}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="label-micro !text-white/20 !text-[8px] tracking-[2px]">User Query</div>
                      <div className="text-sm font-medium tracking-tight text-white/60">{item.query || "N/A"}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {feedback.length === 0 && (
                <div className="py-24 text-center space-y-4">
                  <div className="text-white/10 flex justify-center">
                    <MessageSquare size={48} strokeWidth={1} />
                  </div>
                  <p className="text-sm text-white/30 tracking-widest uppercase">No souls have provided feedback yet.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={user.id}
                  className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 space-y-6 hover:border-[#d4af37]/20 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#d4af37] group-hover:scale-110 transition-transform">
                      <User size={24} />
                    </div>
                    <div>
                      <div className="text-lg font-medium tracking-tight truncate max-w-[150px]">{user.displayName || "Unknown Wanderer"}</div>
                      <div className="text-xs text-white/40 flex items-center gap-1">
                        <Mail size={10} />
                        {user.email || "No email linked"}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                      <div className="flex items-center gap-1 text-[8px] uppercase tracking-[1px] text-white/20">
                        <Activity size={10} />
                        <span>Visits</span>
                      </div>
                      <div className="text-xl font-light text-[#d4af37]">{user.visitCount}</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                      <div className="flex items-center gap-1 text-[8px] uppercase tracking-[1px] text-white/20">
                        <Clock size={10} />
                        <span>Last Seen</span>
                      </div>
                      <div className="text-[10px] font-medium leading-tight text-white/60">
                        {user.lastSeen?.toDate 
                          ? new Date(user.lastSeen.toDate()).toLocaleDateString() 
                          : user.lastSeen 
                          ? new Date(user.lastSeen).toLocaleDateString() 
                          : "Recently"}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {users.length === 0 && (
                <div className="col-span-full py-24 text-center space-y-4">
                  <div className="text-white/10 flex justify-center">
                    <Users size={48} strokeWidth={1} />
                  </div>
                  <p className="text-sm text-white/30 tracking-widest uppercase">The path is currently empty.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
