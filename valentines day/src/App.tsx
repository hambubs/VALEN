import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Music, MailOpen, Lock, Volume2, VolumeX } from 'lucide-react';
import { FloatingHearts } from './components/FloatingHearts';
import { ValentineQuestion } from './components/ValentineQuestion';
import { SuccessScreen } from './components/SuccessScreen';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { LoginScreen } from './components/LoginScreen';
import { ANIMATION_DURATIONS, AUDIO_CONFIG } from './constants/animations';

type Stage = 'intro' | 'question' | 'success';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLoginSuccess = () => setIsAuthenticated(true);
  const [stage, setStage] = useState<Stage>('intro');
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioErrorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Using a romantic, soft piano melody from a public domain source
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    audio.loop = true;
    audio.volume = AUDIO_CONFIG.DEFAULT_VOLUME;
    audioRef.current = audio;

    // Restart audio if it ends (fallback for older browsers/sources)
    const handleAudioEnd = () => {
      if (audioRef.current && !isMuted) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {
          // Silently handle if play fails
        });
      }
    };
    
    audio.addEventListener('ended', handleAudioEnd);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', handleAudioEnd);
        audioRef.current = null;
      }
      if (audioErrorTimeoutRef.current) {
        clearTimeout(audioErrorTimeoutRef.current);
      }
    };
  }, [isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      // If unmuted and not already playing, start playing
      if (!isMuted && (stage === 'question' || stage === 'success')) {
        if (audioRef.current.paused) {
          audioRef.current.play().catch(() => {
            // Silently handle if play fails
          });
        }
      }
    }
  }, [isMuted, stage]);

  const handleStart = () => {
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch((err: Error) => {
        console.warn('Audio play blocked by browser:', err.message);
        setAudioError(true);
        // Auto-dismiss error after timeout
        if (audioErrorTimeoutRef.current) {
          clearTimeout(audioErrorTimeoutRef.current);
        }
        audioErrorTimeoutRef.current = setTimeout(() => {
          setAudioError(false);
        }, AUDIO_CONFIG.PLAY_ERROR_TIMEOUT);
      });
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

      {/* Audio Error Feedback */}
      <AnimatePresence>
        {audioError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-amber-100 text-amber-800 px-4 py-3 rounded-lg shadow-lg border border-amber-200"
          >
            <p className="text-sm font-medium">🔇 Audio is muted by your browser. Click the speaker icon to enable.</p>
          </motion.div>
        )}
      </AnimatePresence>
      
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
                    duration: ANIMATION_DURATIONS.INTRO_IMAGE_BOUNCE, 
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
                      transition={{ duration: ANIMATION_DURATIONS.HEART_ROTATE, repeat: Infinity, ease: "linear" }}
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
