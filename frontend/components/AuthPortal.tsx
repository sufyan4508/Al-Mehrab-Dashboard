"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { MehrabLogo, Eye, EyeOff } from "./icons";

export default function AuthPortal({ onAuthSuccess }: { onAuthSuccess: () => void }) {
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Independent standard dynamic toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
        onAuthSuccess();
      } else if (mode === 'signup') {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match!");
        }
        await createUserWithEmailAndPassword(auth, email, password);
        onAuthSuccess();
      } else if (mode === 'reset') {
        await sendPasswordResetEmail(auth, email);
        setMessage("Password reset link sent to your email!");
      }
    } catch (err: any) {
      setError(err.message || "Authentication layer reject response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-mehrab-bg px-4 font-body transition-colors duration-300">
      <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-mehrab-maroon/10 blur-3xl" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-2xl border border-white/10 bg-mehrab-panel p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-mehrab-maroon via-mehrab-gold to-mehrab-green" />

        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-mehrab-maroon to-mehrab-maroonDeep text-mehrab-gold border border-mehrab-gold/20 mb-4">
            <MehrabLogo size={28} />
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-mehrab-textLight">Al-Mehrab Enterprise</h2>
          <p className="mt-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-mehrab-gold">
            {mode === 'login' ? 'Terminal Access' : mode === 'signup' ? 'Create Administrator' : 'Recovery Subsystem'}
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <AnimatePresence mode="wait">
            {error && <motion.div className="rounded-xl border border-mehrab-rose/20 bg-mehrab-rose/10 p-3 text-xs text-mehrab-rose overflow-hidden break-words">{error}</motion.div>}
            {message && <motion.div className="rounded-xl border border-mehrab-green/20 bg-mehrab-green/10 p-3 text-xs text-mehrab-green">{message}</motion.div>}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-mehrab-textMuted mb-2">Email Address</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@almehrab.com" className="w-full rounded-xl border border-white/10 bg-mehrab-bg/50 px-4 py-3 text-sm text-mehrab-textLight focus:border-mehrab-gold focus:outline-none" />
            </div>

            {mode !== 'reset' && (
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-mehrab-textMuted mb-2">Password</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-xl border border-white/10 bg-mehrab-bg/50 pl-4 pr-11 py-3 text-sm text-mehrab-textLight focus:border-mehrab-gold focus:outline-none" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-mehrab-textMuted hover:text-mehrab-textLight transition">
                    {/* Correct logic: state text hai to EyeOff (hide karney ka option) dikhao, password hai to Eye dikhao */}
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'signup' && (
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-wider text-mehrab-textMuted mb-2">Confirm Password</label>
                <div className="relative">
                  <input type={showConfirmPassword ? "text" : "password"} required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full rounded-xl border border-white/10 bg-mehrab-bg/50 pl-4 pr-11 py-3 text-sm text-mehrab-textLight focus:border-mehrab-gold focus:outline-none" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-mehrab-textMuted hover:text-mehrab-textLight transition">
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'login' && <div className="text-right"><button type="button" onClick={() => setMode('reset')} className="font-mono text-[10px] uppercase tracking-wider text-mehrab-gold hover:underline">Forgot Password?</button></div>}

            <button type="submit" disabled={loading} className="w-full rounded-xl bg-mehrab-gold py-3.5 text-xs font-bold uppercase tracking-wider text-mehrab-bg shadow-lg hover:bg-mehrab-goldSoft active:scale-[0.99] disabled:opacity-50">
              {loading ? "Processing Secure Gateway..." : mode === 'login' ? 'Authenticate' : mode === 'signup' ? 'Register Account' : 'Send Link'}
            </button>
          </form>

          <div className="mt-6 border-t border-white/5 pt-4 text-center text-xs text-mehrab-textMuted">
            {mode === 'login' ? (
              <p>New admin? <button type="button" onClick={() => setMode('signup')} className="font-semibold text-mehrab-gold hover:underline">Request Account</button></p>
            ) : (
              <p>Have an account? <button type="button" onClick={() => setMode('login')} className="font-semibold text-mehrab-gold hover:underline">Log In</button></p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
