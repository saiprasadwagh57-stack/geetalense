import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  LogIn, 
  LogOut, 
  User, 
  Mail, 
  Phone,
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { auth, trackUserActivity } from '../services/firebaseService';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut
} from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: any;
  isAdmin?: boolean;
  language: 'en' | 'mr';
  onCustomLogin?: (userProfile: { uid: string; displayName: string; email: string; phone?: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  language,
  onCustomLogin
}) => {
  const isMr = language === 'mr';
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<{ code: string; message: string } | null>(null);
  const [activeMode, setActiveMode] = useState<'quick' | 'google'>('quick');
  
  // Custom Seeker state - Clean, unpolluted defaults
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [customPhone, setCustomPhone] = useState('');

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setAuthError(null);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const result = await signInWithPopup(auth, provider);
      await trackUserActivity({
        uid: result.user.uid,
        displayName: result.user.displayName || 'Seeker',
        email: result.user.email || '',
        phone: result.user.phoneNumber || customPhone || ''
      });
      onClose();
    } catch (error: any) {
      if (error?.code !== 'auth/popup-closed-by-user' && error?.code !== 'auth/cancelled-popup-request') {
        console.warn('Google Sign-in notice:', error?.code || error?.message);
      }
      let friendlyMsg = isMr 
        ? 'लॉगिन करताना अडचण आली. कृपया Quick Access पर्याय वापरा.' 
        : 'Sign-in encountered an issue. You can use Quick Access mode.';

      if (error?.code === 'auth/popup-blocked') {
        friendlyMsg = isMr
          ? 'ब्राउझरने पॉपअप विंडो ब्लॉक केली. कृपया Quick Access वापरा किंवा ॲप नवीन टॅबमध्ये उघडा.'
          : 'Pop-up window was blocked. Open in a new tab or use Quick Access.';
      } else if (error?.code === 'auth/popup-closed-by-user') {
        friendlyMsg = isMr 
          ? 'लॉगिन विंडो बंद करण्यात आली.' 
          : 'Sign-in window was closed.';
      } else if (error?.message) {
        friendlyMsg = error.message;
      }

      setAuthError({
        code: error?.code || 'AUTH_ERROR',
        message: friendlyMsg
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleQuickSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() && !customEmail.trim() && !customPhone.trim()) return;

    const identifier = customEmail.trim() || customPhone.trim() || `user_${Date.now()}`;
    const mockUid = `seeker_${identifier.replace(/[^a-zA-Z0-9]/g, '_')}`;
    
    const userProfile = {
      uid: mockUid,
      displayName: customName.trim() || 'Spiritual Seeker',
      email: customEmail.trim() || '',
      phone: customPhone.trim() || ''
    };

    // Track user into Firestore & local database
    await trackUserActivity(userProfile);

    if (onCustomLogin) {
      onCustomLogin(userProfile);
    }
    onClose();
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      if (onCustomLogin) {
        onCustomLogin({ uid: '', displayName: '', email: '', phone: '' });
      }
      onClose();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const openAppInNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md glass rounded-3xl p-6 sm:p-8 border border-[var(--app-border)] shadow-2xl space-y-6"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-[var(--app-text-muted)] hover:text-[var(--app-text)] hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] text-xl font-serif mx-auto font-bold shadow-inner">
              ॐ
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[var(--app-text)]">
              {currentUser 
                ? (isMr ? 'साधक प्रोफाइल' : 'Seeker Profile') 
                : (isMr ? 'GitaLens मध्ये प्रवेश करा' : 'Sign in to GitaLens')}
            </h3>
            <p className="text-xs text-[var(--app-text-muted)] max-w-xs mx-auto">
              {currentUser
                ? (isMr ? 'आपल्या आध्यात्मिक शोधाची नोंद व वैयक्तिक इतिहास' : 'Your spiritual reflections and personal journey')
                : (isMr ? 'आपल्या वैयक्तिक प्रवासासाठी नाव व संपर्क नोंदवा' : 'Join our global community of Gita seekers')}
            </p>
          </div>

          {currentUser ? (
            /* Logged In View */
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-[var(--app-border)] space-y-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] font-bold text-lg font-serif">
                    {currentUser.displayName ? currentUser.displayName[0].toUpperCase() : 'ॐ'}
                  </div>
                  <div className="overflow-hidden space-y-0.5">
                    <p className="text-sm font-bold text-[var(--app-text)] truncate">
                      {currentUser.displayName || (isMr ? 'साधक' : 'Seeker')}
                    </p>
                    {currentUser.email && (
                      <p className="text-xs text-[var(--app-text-muted)] truncate flex items-center gap-1">
                        <Mail size={11} /> {currentUser.email}
                      </p>
                    )}
                    {currentUser.phone && (
                      <p className="text-xs text-[var(--app-text-muted)] truncate flex items-center gap-1">
                        <Phone size={11} /> {currentUser.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="w-full py-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <LogOut size={16} />
                <span>{isMr ? 'लॉगआउट करा' : 'Sign Out'}</span>
              </button>
            </div>
          ) : (
            /* Sign In Options */
            <div className="space-y-4">
              
              {/* Mode Switcher */}
              <div className="flex rounded-2xl bg-white/[0.04] p-1 border border-[var(--app-border)]">
                <button
                  onClick={() => setActiveMode('quick')}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    activeMode === 'quick'
                      ? 'bg-[#d4af37] text-black shadow-sm'
                      : 'text-[var(--app-text-muted)] hover:text-[var(--app-text)]'
                  }`}
                >
                  <span>{isMr ? 'साधक नोंदणी (Quick Access)' : 'Quick Access'}</span>
                </button>
                <button
                  onClick={() => setActiveMode('google')}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                    activeMode === 'google'
                      ? 'bg-[#d4af37] text-black shadow-sm'
                      : 'text-[var(--app-text-muted)] hover:text-[var(--app-text)]'
                  }`}
                >
                  <span>Google</span>
                </button>
              </div>

              {/* Error Notice */}
              {authError && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-2"
                >
                  <div className="flex items-start gap-2">
                    <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-400" />
                    <p className="leading-relaxed">{authError.message}</p>
                  </div>
                  <button
                    onClick={openAppInNewTab}
                    className="w-full py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold transition-all flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink size={12} />
                    <span>{isMr ? 'नवीन टॅबमध्ये ॲप उघडा' : 'Open in New Tab'}</span>
                  </button>
                </motion.div>
              )}

              {activeMode === 'quick' ? (
                /* Quick Seeker Form with Name, Email and Mobile Number */
                <form onSubmit={handleQuickSignIn} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-[var(--app-text-muted)]">
                      {isMr ? 'नाव (Full Name)' : 'Full Name'}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder={isMr ? "तुमचे नाव प्रविष्ट करा" : "Enter your full name"}
                        required
                        className="w-full bg-white/[0.04] border border-[var(--app-border)] focus:border-[#d4af37] rounded-xl px-3 py-2.5 text-xs text-[var(--app-text)] outline-none"
                      />
                      <User className="w-3.5 h-3.5 absolute right-3 top-3 text-[var(--app-text-muted)]" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-[var(--app-text-muted)]">
                      {isMr ? 'ईमेल (Email Address)' : 'Email Address'}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={customEmail}
                        onChange={(e) => setCustomEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        className="w-full bg-white/[0.04] border border-[var(--app-border)] focus:border-[#d4af37] rounded-xl px-3 py-2.5 text-xs text-[var(--app-text)] outline-none"
                      />
                      <Mail className="w-3.5 h-3.5 absolute right-3 top-3 text-[var(--app-text-muted)]" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-bold tracking-wider text-[var(--app-text-muted)]">
                      {isMr ? 'मोबाईल नंबर (Mobile Number)' : 'Mobile / Phone Number'}
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={customPhone}
                        onChange={(e) => setCustomPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full bg-white/[0.04] border border-[var(--app-border)] focus:border-[#d4af37] rounded-xl px-3 py-2.5 text-xs text-[var(--app-text)] outline-none"
                      />
                      <Phone className="w-3.5 h-3.5 absolute right-3 top-3 text-[var(--app-text-muted)]" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-[#d4af37] hover:brightness-110 active:scale-98 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/20 cursor-pointer"
                  >
                    <LogIn size={15} />
                    <span>{isMr ? 'प्रवेश करा (Continue)' : 'Continue to GitaLens'}</span>
                  </button>
                </form>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={handleGoogleSignIn}
                    disabled={isSigningIn}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#d4af37] hover:brightness-110 active:scale-98 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#d4af37]/20 disabled:opacity-50"
                  >
                    {isSigningIn ? (
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path
                            fill="#000000"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#000000"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#000000"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          />
                          <path
                            fill="#000000"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          />
                        </svg>
                        <span>{isMr ? 'Google द्वारे लॉगिन करा' : 'Sign in with Google'}</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
