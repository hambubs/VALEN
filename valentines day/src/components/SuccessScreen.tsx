import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Calendar, MapPin, Sparkles, Flower2, Plane } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import sunflowerImg from '../assets/2.jpeg'

const BRIDGERTON_QUOTES = [
  "I love you desperately. My heart aches for you.",
  "You are the bane of my existence and the object of all my desires.",
  "To meet a beautiful woman is one thing, but to meet your best friend in the most beautiful of women is something entirely apart.",
  "It has been you. It has always been you."
];

const REASONS_LIST = [
  "Your beautiful smile that brightens my day",
  "The way you always know how to make me laugh",
  "How incredibly kind and supportive you are",
  "Your infectious sense of humor",
  "The way your eyes light up when you talk about things you love",
  "Your patience and understanding",
  "How you make me feel seen and valued",
  "Your strength and resilience",
  "The little things you do without asking",
  "How you listen when I need to talk",
  "Your creativity and unique perspective",
  "The way you care about others so deeply",
  "Your gentle touch and warm hugs",
  "How you remember the small details about me",
  "Your courage to be yourself",
  "The way you dance even when no one's watching",
  "How you challenge me to be better",
  "Your loyalty and dedication",
  "The way your voice sounds when you're genuinely happy",
  "How you make ordinary moments feel special",
  "Your wisdom beyond your years",
  "The way you dream big and take risks",
  "How you handle difficult moments with grace",
  "Your contagious positivity",
  "The way you love unconditionally",
  "Your intelligence and curiosity",
  "How you make me feel alive",
  "Your ability to forgive and move forward",
  "The way you celebrate my victories as your own",
  "How you accept me completely, flaws and all",
  "Your passion for life",
  "The way you make home wherever you are",
  "How you bring out the best in me",
  "Your thoughtful gestures and surprises",
  "The way you fight for what you believe in",
  "How you light up a room just by walking in",
  "Your genuine interest in my day",
  "The way you comfort me without words",
  "How you inspire me daily",
  "Your ability to find joy in simplicity",
  "The way you love our long conversations",
  "How you make ordinary boring moments fun",
  "Your strength when I feel weak",
  "The way you encourage my dreams",
  "How you make the future look so beautiful",
  "Your trust and faith in me",
  "The way you fit perfectly in my arms",
  "How you're my favorite person to be around",
  "Your beautiful soul",
  "The way distance can never change how I feel",
  "Because you make everything worth it"
];

const LETTER_TEXT = "Every day with you feels like Valentine's Day. I can't wait to celebrate another year of us. You mean the world to me, and I'm so lucky to have you in my life.";

export function SuccessScreen() {
  const [displayedReasons, setDisplayedReasons] = useState<string[]>([
    "Your beautiful smile that brightens my day",
    "The way you always know how to make me laugh",
    "How incredibly kind and supportive you are"
  ]);
  const [lastAddedReason, setLastAddedReason] = useState<string | null>(null);
  const [revealedChars, setRevealedChars] = useState(0);
  const [scrambleTick, setScrambleTick] = useState(0);

  useEffect(() => {
    if (revealedChars < LETTER_TEXT.length) {
      const timer = setTimeout(() => {
        setRevealedChars(prev => prev + 1);
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [revealedChars]);

  useEffect(() => {
    if (revealedChars < LETTER_TEXT.length) {
      const timer = setInterval(() => {
        setScrambleTick(prev => prev + 1);
      }, 90);
      return () => clearInterval(timer);
    }
    return undefined;
  }, [revealedChars]);

  const getRandomGlyph = () => {
    const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    return glyphs[Math.floor(Math.random() * glyphs.length)];
  };

  const getDecryptedText = () => {
    const result: { char: string; isNew: boolean }[] = [];
    for (let i = 0; i < LETTER_TEXT.length; i += 1) {
      const char = LETTER_TEXT[i];
      if (i < revealedChars) {
        result.push({ char, isNew: i === revealedChars - 1 });
      } else if (char === ' ') {
        result.push({ char: ' ', isNew: false });
      } else {
        result.push({ char: getRandomGlyph(), isNew: false });
      }
    }
    return result;
  };

  const decryptedText = useMemo(() => getDecryptedText(), [revealedChars, scrambleTick]);

  const getRandomReason = (currentDisplayed: string[]) => {
    // Get reasons not yet shown (based on provided list)
    const availableReasons = REASONS_LIST.filter(r => !currentDisplayed.includes(r));

    if (availableReasons.length === 0) {
      // If we've shown all reasons, reset and show a random one
      return REASONS_LIST[Math.floor(Math.random() * REASONS_LIST.length)];
    }

    return availableReasons[Math.floor(Math.random() * availableReasons.length)];
  };

  const handleAddReason = () => {
    // Use functional update to avoid stale closures when clicking rapidly
    setDisplayedReasons(prev => {
      const newReason = getRandomReason(prev);
      setLastAddedReason(newReason);
      return [...prev, newReason];
    });
  };


  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 flex flex-col items-center text-center space-y-10"
    >
      <div className="relative">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-10 -right-10 text-rose-500"
        >
          <Sparkles size={48} />
        </motion.div>
        
        <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
          <ImageWithFallback 
            src={sunflowerImg}
            alt="Sunflower Celebration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-5xl font-serif text-rose-600 font-black">YAY! SHE SAID YESSSSSSSSSSSSSSS! 🌻</h1>
        <p className="text-xl text-gray-600">We have a special date today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-rose-100 flex flex-col items-center">
          <Calendar className="text-rose-500 mb-3" size={32} />
          <h3 className="font-bold text-gray-800">Date</h3>
          <p className="text-gray-600">February 14th</p>
        </div>
        
        <a 
          href="https://meet.google.com/hjn-ndud-adx" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-rose-100 flex flex-col items-center hover:shadow-lg hover:border-rose-300 transition-all cursor-pointer"
        >
          <MapPin className="text-rose-500 mb-3" size={32} />
          <h3 className="font-bold text-gray-800">Location</h3>
          <p className="text-rose-600 font-semibold hover:underline">Join Google Meet</p>
        </a>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-serif text-rose-600 font-bold">Reasons Why I Love You</h2>
        <div className="grid grid-cols-1 gap-3">
          <AnimatePresence mode="popLayout">
            {displayedReasons.map((reason, i) => (
              <motion.div 
                key={reason}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={`p-4 rounded-xl border flex items-center gap-3 ${
                  reason === lastAddedReason
                    ? 'bg-yellow-100 border-yellow-300 shadow-lg'
                    : 'bg-white/50 border-rose-100'
                }`}
              >
                <div className="bg-yellow-100 p-2 rounded-full text-yellow-600 flex-shrink-0">
                  <Flower2 size={16} fill="currentColor" />
                </div>
                <p className="text-gray-700 font-medium text-sm">{reason}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddReason}
          className="w-full mt-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-black font-bold rounded-xl shadow-lg transition-all"
        >
          ✨ Click for more... 
        </motion.button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="bg-rose-50 p-8 rounded-3xl border-2 border-dashed border-rose-200 max-w-lg"
      >
        <Heart className="text-rose-500 mx-auto mb-4" fill="currentColor" />
        <p className="text-rose-800 italic text-lg leading-relaxed font-serif">
          "{decryptedText.map((item, i) => (
            <span
              key={i}
              className={item.isNew ? 'love-letter-glow text-rose-700' : undefined}
            >
              {item.char}
            </span>
          ))}"
          {revealedChars < LETTER_TEXT.length && <span className="animate-pulse">|</span>}
        </p>
        <motion.p 
          className="mt-4 font-bold text-rose-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: revealedChars === LETTER_TEXT.length ? 1 : 0 }}
          transition={{ delay: 0.5 }}
        >
          — Your Favorite Person
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        className="w-full max-w-lg bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-rose-100 shadow-md"
      >
        <p className="text-rose-700 font-serif text-lg mb-4">350km is nothing for this airline.</p>
        <div className="relative">
          <div className="relative h-10">
            <div className="absolute left-0 top-1/2 -translate-y-1/2">
              <div className="w-3 h-3 rounded-full bg-rose-500 shadow" />
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <div className="w-3 h-3 rounded-full bg-rose-500 shadow" />
            </div>
            <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-rose-300" />
            <div className="love-plane-track">
              <div className="love-plane">
                <Plane size={16} className="text-white" />
                <Heart size={10} className="love-plane-heart" fill="currentColor" />
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs font-semibold text-rose-700 tracking-wide">
            <span className="max-w-[45%] text-left">Bangalore</span>
            <span className="max-w-[45%] text-right">Chennai</span>
          </div>
        </div>
      </motion.div>
      
      <div className="pt-10">
        <p className="text-sm text-rose-400 text-[20px]">Cant wait for you to be in my arms ❤️</p>
      </div>
      <div className="w-full max-w-lg mt-12 space-y-4">
        {BRIDGERTON_QUOTES.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: (i % 2 === 0 ? -50 : 50) }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: (i % 2 === 0 ? -50 : 50) }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`p-6 bg-rose-900/10 rounded-xl border border-rose-200 italic font-serif text-rose-800 text-center ${i % 2 === 0 ? 'mr-auto' : 'ml-auto'} max-w-xs`}
          >
            "{q}"
            <div className="text-xs text-rose-400 mt-2 not-italic uppercase tracking-widest">— Bridgerton (and Me)</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
