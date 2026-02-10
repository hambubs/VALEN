import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Heart, Stars, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const [overrideTarget, setOverrideTarget] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // 🌹 TARGET DATE: Feb 14, 2026 🌹
  const TARGET_DATE = new Date('2026-02-14T00:00:00').getTime(); 

  const isDev = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.search.includes('dev=true'));

  const VALID_PASSWORDS = ['donkey', 'my love', 'baby', 'mi love', 'testing'];

  const calculateTimeLeft = () => {
    const now = Date.now();
    const target = overrideTarget ?? TARGET_DATE;
    const distance = target - now;

    if (distance < 0) return "It's Time! ❤️";

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const time = calculateTimeLeft();
      setTimeLeft(time ?? "");
    }, 1000);
    return () => clearInterval(timer);
  }, [overrideTarget]);

  // Auto-unlock when the override target passes and timer was showing
  useEffect(() => {
    if (showTimer && (timeLeft === "It's Time! ❤️")) {
      // small delay so UI updates
      const t = setTimeout(() => onLogin(), 600);
      return () => clearTimeout(t);
    }
  }, [showTimer, timeLeft, onLogin]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const pass = password.toLowerCase().trim();

    if (VALID_PASSWORDS.includes(pass)) {
      const time = calculateTimeLeft();
      // "testing" allows bypass for dev
      if (time === "It's Time! ❤️" || pass === 'testing') {
        onLogin();
      } else {
        setShowTimer(true);
      }
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-md p-8 bg-white/10 border border-white/20 rounded-3xl shadow-2xl backdrop-blur-xl text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-rose-500 blur-xl opacity-20 animate-pulse"></div>
            <div className="bg-white/10 p-4 rounded-full border border-white/10 relative">
              <Lock size={32} className="text-rose-400" />
            </div>
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-1 -right-1"
            >
              <Heart size={16} className="text-rose-500 fill-rose-500" />
            </motion.div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2 font-serif tracking-wide">
           <span className="text-rose-400">Heart Gate</span>
        </h2>
        <p className="text-rose-200/60 text-sm mb-8">Enter the password to enter.</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative group">
            <input 
              type={showPassword ? 'text' : 'password'} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password..."
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-black placeholder-white/30 focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all text-center tracking-widest"
              autoFocus
            />
            <div className="absolute right-3 top-3.5 flex items-center gap-2">
              <button type="button" onClick={() => setShowPassword(s => !s)} className="text-rose-400/80 text-xs">{showPassword ? 'Hide' : 'Show'}</button>
              <Stars className="text-rose-500/50 w-4 h-4 opacity-80" />
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-gradient-to-r from-rose-600 to-rose-500 rounded-xl text-black font-medium shadow-lg shadow-rose-900/20 hover:shadow-rose-600/40 transition-all"
          >
            Unlock My Heart
          </motion.button>
        </form>

        <div className="mt-3 text-xs text-rose-200/70">Hint: try <span className="font-mono">sunflower</span> or use <span className="font-mono">testing</span> to bypass (dev).</div>

        {isDev && (
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                // set a short override target (15s) for testing
                setOverrideTarget(Date.now() + 15_000);
                setShowTimer(true);
              }}
              className="text-[12px] px-3 py-2 bg-white/10 border border-white/10 rounded-md text-rose-200"
            >
              Test Timer (15s)
            </button>
            <button
              onClick={() => {
                setOverrideTarget(null);
                setShowTimer(false);
                setTimeLeft("");
              }}
              className="text-[12px] px-3 py-2 bg-white/5 border border-white/5 rounded-md text-zinc-400"
            >
              Clear Test
            </button>
          </div>
        )}

        <AnimatePresence>
          {error && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-red-400 text-xs mt-4 font-medium"
            >
              ⛔ Access Denied: Incorrect Password
            </motion.p>
          )}

          {showTimer && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="mt-6 p-4 bg-black/40 rounded-xl border border-rose-500/30"
             >
               <p className="text-rose-300 text-xs uppercase tracking-widest mb-1">Unlocks In</p>
               <p className="text-2xl font-mono text-black font-bold">{timeLeft || "Loading..."}</p>
               <button 
                 onClick={() => setShowTimer(false)}
                 className="text-[10px] text-zinc-500 mt-2 hover:text-white underline"
               >
                 Close
               </button>
             </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
