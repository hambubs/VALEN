import React from 'react';
import { motion } from 'motion/react';
import { Heart, Flower2, Flower } from 'lucide-react';

export function FloatingHearts() {
  const elements = Array.from({ length: 25 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((_, i) => {
        const t = i % 3;
        return (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              y: '110vh', 
              x: `${Math.random() * 100}vw`,
              scale: Math.random() * 0.5 + 0.5,
              rotate: 0
            }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              y: '-10vh',
              x: `${(Math.random() - 0.5) * 20 + (Math.random() * 100)}vw`,
              rotate: t === 2 ? 360 : 0
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 20,
              ease: "linear"
            }}
            className={`absolute ${t === 1 ? 'text-yellow-400/30' : t === 2 ? 'text-red-600/30' : 'text-rose-300/40'}`}
          >
            {t === 1 ? (
              <Flower2 fill="currentColor" size={Math.random() * 30 + 15} />
            ) : t === 2 ? (
              <Flower className="text-red-600" fill="currentColor" size={Math.random() * 28 + 14} />
            ) : (
              <Heart fill="currentColor" size={Math.random() * 24 + 12} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
