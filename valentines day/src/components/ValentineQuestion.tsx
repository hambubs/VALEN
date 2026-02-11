import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ValentineQuestionProps {
  onYes: () => void;
}

export function ValentineQuestion({ onYes }: ValentineQuestionProps) {
  const [noCount, setNoCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  
  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "BUT WHY?",
      "HAW",
      "Surely not?",
      "How can you do this to me?!",
      "Give it another thought!",
      "Are you absolutely sure?",
      "EVIL",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
    ];
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const handleNoHover = () => {
    const newX = (Math.random() - 0.5) * 500;
    const newY = (Math.random() - 0.5) * 500;
    setNoButtonPos({ x: newX, y: newY });
    setNoCount(prev => prev + 1);
  };

  const yesButtonScale = 1 + noCount * 0.4;
  const isCoveringScreen = noCount >= 15;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center space-y-8 p-6 text-center max-w-md mx-auto min-h-[400px]"
    >
      <div className={`w-48 h-48 rounded-2xl overflow-hidden shadow-xl mb-4 border-4 border-white transition-opacity duration-500 ${noCount > 8 ? 'opacity-0' : 'opacity-100'}`}>
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1758748930322-54d750ba4e5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nbGUlMjBzdW5mbG93ZXIlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzcwNjIyODM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="A sunflower for my sunflower"
          className="w-full h-full object-cover"
        />
      </div>
      
      <h1 className={`text-4xl font-serif text-rose-600 font-bold leading-tight transition-opacity duration-500 ${noCount > 10 ? 'opacity-0' : 'opacity-100'}`}>
        Tamanna, will you be my Valentine? 🌻
      </h1>
      
      <p className={`text-lg text-rose-500/80 font-light transition-opacity duration-500 ${noCount > 10 ? 'opacity-0' : 'opacity-100'}`}>
        Distance means so little when you mean so much.
      </p>
      
      <div className="flex items-center justify-center gap-4 relative w-full h-32">
        <motion.button
          layout
          onClick={onYes}
          animate={{ 
            scale: yesButtonScale,
            zIndex: isCoveringScreen ? 100 : 10,
            borderRadius: isCoveringScreen ? 0 : "9999px",
          }}
          transition={{ 
            type: "spring", 
            stiffness: 80, 
            damping: 15,
            mass: 1,
            layout: { type: "spring", stiffness: 80, damping: 15 }
          }}
          className={`bg-rose-500 text-white font-bold shadow-lg hover:bg-rose-600 transition-colors whitespace-nowrap
            ${isCoveringScreen ? 'fixed inset-0 w-screen h-screen flex items-center justify-center text-6xl' : 'px-8 py-3 text-lg relative'}`}
        >
          {isCoveringScreen ? "YES! 💖" : "Yes! 💖"}
        </motion.button>
        
        {!isCoveringScreen && (
          <motion.button
            animate={{ x: noButtonPos.x, y: noButtonPos.y }}
            onMouseEnter={handleNoHover}
            onClick={handleNoHover}
            style={{ zIndex: 50 }}
            whileHover={{ 
              backgroundColor: "#fff1f2",
              borderColor: "#fda4af",
              scale: 1.1,
              boxShadow: "0 10px 15px -3px rgba(225, 29, 72, 0.2)"
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="bg-gray-100 text-gray-600 px-6 py-3 rounded-full font-medium shadow-sm border border-transparent relative transition-colors duration-200"
          >
            {getNoButtonText()}
          </motion.button>
        )}
      </div>
      
      {noCount > 3 && !isCoveringScreen && (
        <motion.p 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-rose-600 font-black text-2xl tracking-widest drop-shadow-sm uppercase"
        >
          Resistance is FUTILE
        </motion.p>
      )}
    </motion.div>
  );
}
