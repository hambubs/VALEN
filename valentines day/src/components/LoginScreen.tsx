import React, { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';

type Props = {
  onLogin: () => void;
};

const VALID_USERNAMES = ['valentine', 'love', 'you'];
const VALID_PASSWORDS = ['rose', 'love', 'testing'];

export function LoginScreen({ onLogin }: Props) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showTimer, setShowTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const TARGET_DATE = new Date('2026-02-14T00:00:00').getTime();
  const [intervalId, setIntervalId] = useState<number | null>(null);

  const checkTimeGate = () => {
    const now = new Date().getTime();
    const distance = TARGET_DATE - now;
    return distance < 0;
  };

  const updateTimer = () => {
    const now = new Date().getTime();
    const distance = TARGET_DATE - now;
    if (distance < 0) return "It's Time! ❤️";
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    // initialize timer text
    setTimeLeft(updateTimer());
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const handleLogin = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (VALID_USERNAMES.includes(user) && VALID_PASSWORDS.includes(pass)) {
      if (checkTimeGate() || pass === 'testing') {
        onLogin();
        return;
      } else {
        setShowTimer(true);
        const id = window.setInterval(() => setTimeLeft(updateTimer()), 1000);
        setIntervalId(id);
        return;
      }
    }
    // simple fallback: if password is 'testing' allow through regardless
    if (pass === 'testing') onLogin();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white/80 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 font-serif">Log in to see the surprise</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Username"
          className="w-full p-3 rounded border"
        />
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password"
          className="w-full p-3 rounded border"
        />
        <div className="flex items-center justify-between">
          <button type="submit" className="px-4 py-2 bg-rose-500 text-white rounded">Enter</button>
          <button type="button" onClick={() => { setUser(''); setPass(''); }} className="text-sm text-zinc-500 underline">Reset</button>
        </div>
      </form>

      {showTimer && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4 text-center">
          <Lock size={64} className="text-rose-500 mb-4 animate-bounce" />
          <h2 className="text-2xl text-white font-serif mb-2">Not Yet, My Love...</h2>
          <p className="text-zinc-400 mb-6">The gates to my heart open on Valentine's Day.</p>
          <div className="text-4xl font-mono text-rose-500 font-bold border-2 border-rose-500/30 p-4 rounded-xl bg-rose-950/20">
            {timeLeft || 'Calculating...'}
          </div>
          <button onClick={() => { setShowTimer(false); if (intervalId) { clearInterval(intervalId); setIntervalId(null); } }} className="mt-8 text-sm text-zinc-500 underline">Okay, I'll wait</button>
        </div>
      )}
    </div>
  );
}
