import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { Heart, Flower2 } from 'lucide-react';
import { FLOATING_HEARTS, ANIMATION_DURATIONS } from '../constants/animations';

export const FloatingHearts = React.memo(() => {
  // Memoize the elements array to prevent recalculation on every render
  const elements = useMemo(() => Array.from({ length: FLOATING_HEARTS.ELEMENT_COUNT }), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          {elements.map((_, i) => {
            const type = i % 3;
            const initialScale = Math.random() * (FLOATING_HEARTS.SCALE_MAX - FLOATING_HEARTS.SCALE_MIN) + FLOATING_HEARTS.SCALE_MIN;
            const duration = Math.random() * (ANIMATION_DURATIONS.FLOATING_HEARTS_MAX - ANIMATION_DURATIONS.FLOATING_HEARTS_MIN) + ANIMATION_DURATIONS.FLOATING_HEARTS_MIN;
            const delay = Math.random() * FLOATING_HEARTS.INITIAL_DELAY_MAX;
            
            return (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0, 
                  y: '110vh', 
                  x: `${Math.random() * 100}vw`,
                  scale: initialScale,
                  rotate: 0
                }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  y: '-10vh',
                  x: `${(Math.random() - 0.5) * 20 + (Math.random() * 100)}vw`,
                  rotate: type === 2 ? 360 : 0
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: "linear"
                }}
                className={`absolute ${type === 1 ? 'text-yellow-400/30' : type === 2 ? 'text-red-600/30' : 'text-rose-300/40'}`}
              >
                {type === 1 ? (
                  <Flower2 
                    fill="currentColor" 
                    size={Math.random() * (FLOATING_HEARTS.FLOWER_SIZE_MAX - FLOATING_HEARTS.FLOWER_SIZE_MIN) + FLOATING_HEARTS.FLOWER_SIZE_MIN} 
                  />
                ) : type === 2 ? (
                  <span style={{ 
                    fontSize: `${Math.random() * (FLOATING_HEARTS.SIZE_MAX - FLOATING_HEARTS.SIZE_MIN) + FLOATING_HEARTS.SIZE_MIN}px`,
                    filter: 'opacity(0.6) drop-shadow(0 0 2px rgba(220, 20, 60, 0.3))'
                  }}>
                    🌹
                  </span>
                ) : (
                  <Heart 
                    fill="currentColor" 
                    size={Math.random() * (FLOATING_HEARTS.SIZE_MAX - FLOATING_HEARTS.SIZE_MIN) + FLOATING_HEARTS.SIZE_MIN} 
                  />
                )}
              </motion.div>
            );
          })}
    </div>
  );
});
