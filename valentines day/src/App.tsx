import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Music, MailOpen, Lock, Volume2, VolumeX } from 'lucide-react';
import { FloatingHearts } from './components/FloatingHearts';
import { ValentineQuestion } from './components/ValentineQuestion';
import { SuccessScreen } from './components/SuccessScreen';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { LoginScreen } from './components/LoginScreen';

type Stage = 'intro' | 'question' | 'success';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLoginSuccess = () => setIsAuthenticated(true);
  const [stage, setStage] = useState<Stage>('intro');
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Using a romantic, soft piano melody from a public domain source
    audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(err => console.log("Audio play blocked by browser:", err));
    }
    setStage('question');
  };

  if (!isAuthenticated) return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-100"><LoginScreen onLogin={handleLoginSuccess} /></div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-100 font-sans text-gray-900 selection:bg-rose-200 selection:text-rose-900 overflow-x-hidden">
      <FloatingHearts />

      {/* Music Toggle */}
      <button 
        onClick={() => setIsMuted(!isMuted)}
        className="fixed top-6 right-6 z-50 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg text-rose-500 hover:scale-110 transition-transform cursor-pointer"
        aria-label="Toggle Music"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
      
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center py-12 px-4">
        <AnimatePresence mode="wait">
          {stage === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="text-center space-y-8"
            >
              <div className="relative inline-block">
                <motion.div
                  animate={{ 
                    rotate: [0, -5, 5, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-64 h-64 rounded-full overflow-hidden border-8 border-white shadow-2xl"
                >
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1674274197411-fec149074156?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBzdW5mbG93ZXJzJTIwZmllbGQlMjBib3VxdWV0fGVufDF8fHx8MTc3MDYyMjgyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Sunflowers for you"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-full shadow-lg">
                  <div className="text-yellow-500">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <Heart className="text-rose-500" fill="currentColor" size={32} />
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl font-serif text-rose-600 font-black tracking-tight">
                  Hey Gorgeous,
                </h1>
                <p className="text-xl text-rose-800/70 max-w-md mx-auto leading-relaxed">
                  I have a very special question to ask you today. It's something I've been wanting to do for a while... 🌻
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                className="group relative inline-flex items-center gap-3 bg-white text-rose-600 px-10 py-5 rounded-2xl font-bold shadow-xl border-2 border-rose-100 hover:bg-rose-50 transition-all overflow-hidden"
              >
                <MailOpen className="group-hover:translate-x-1 transition-transform" />
                <span>Open Your Valentine Letter</span>
                <motion.div 
                  className="absolute inset-0 bg-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                />
              </motion.button>
              
              <div className="flex items-center justify-center gap-2 text-rose-400 text-sm mt-12">
                <Lock size={14} />
                <span>For Mi Love</span>
              </div>
            </motion.div>
          )}

          {stage === 'question' && (
            <ValentineQuestion 
              key="question" 
              onYes={() => setStage('success')} 
            />
          )}

          {stage === 'success' && (
            <SuccessScreen key="success" />
          )}
        </AnimatePresence>
      </main>

      <footer className="fixed bottom-0 w-full p-4 flex justify-between items-center text-rose-400/50 text-xs pointer-events-none">
        <p>Made with Love</p>
        <div className="flex gap-4">
          <Music size={14} />
          <Heart size={14} fill="currentColor" />
        </div>
      </footer>
    </div>
  );
}
