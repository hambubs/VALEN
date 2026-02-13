import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Memory {
  id: number;
  image: string;
  caption: string;
  date?: string;
}

const MEMORIES: Memory[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1474536642117-91fb1cfdc8e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "Our first sunset together 🌅",
    date: "May 15, 2024"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1457269323475-cb2cc9c6a6d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "Coffee dates make everything better ☕",
    date: "June 20, 2024"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1516391318980-8260f2ce5850?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "Laughter is our favorite sound 😄",
    date: "July 10, 2024"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1508690115892-9ca765bf7cd6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "Adventure awaits us always 🏔️",
    date: "August 5, 2024"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1504762260106-5ca8767a9b2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "Your smile is my favorite view 😊",
    date: "September 12, 2024"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1080",
    caption: "Forever isn't long enough with you 💕",
    date: "October 30, 2024"
  }
];

export function MemoryGarden() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [flipped, setFlipped] = useState(false);

  const slideVariants = {
    enter: (dir: 'left' | 'right') => ({
      x: dir === 'left' ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: 'left' | 'right') => ({
      zIndex: 0,
      x: dir === 'left' ? -1000 : 1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: 'left' | 'right') => {
    setDirection(newDirection);
    setFlipped(false);
    if (newDirection === 'right') {
      setCurrentIndex((prev) => (prev + 1) % MEMORIES.length);
    } else {
      setCurrentIndex((prev) => (prev - 1 + MEMORIES.length) % MEMORIES.length);
    }
  };

  const current = MEMORIES[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6 space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-5xl font-serif text-rose-600 font-black">
          ✨ Our Memory Garden ✨
        </h1>
        <p className="text-lg text-rose-500">
          Cherishing every moment we've shared
        </p>
      </div>

      {/* Image Carousel */}
      <div className="relative w-full h-[500px] overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-rose-50 to-pink-50">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            }}
            className="absolute inset-0"
          >
            {!flipped ? (
              <motion.div
                className="w-full h-full cursor-pointer"
                onClick={() => setFlipped(true)}
                whileHover={{ scale: 1.02 }}
              >
                <ImageWithFallback
                  src={current.image}
                  alt={current.caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent flex items-end justify-center p-6">
                  <p className="text-white text-center font-semibold text-lg drop-shadow-lg">
                    Click to see memory
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ rotateY: 90 }}
                animate={{ rotateY: 0 }}
                exit={{ rotateY: 90 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full bg-gradient-to-br from-rose-100 to-pink-100 p-8 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => setFlipped(false)}
                style={{ perspective: '1000px' }}
              >
                <Heart className="text-rose-500 mb-4" size={48} fill="currentColor" />
                <p className="text-2xl font-serif text-rose-800 text-center mb-6 italic">
                  "{current.caption}"
                </p>
                {current.date && (
                  <p className="text-sm text-rose-600 font-semibold">
                    {current.date}
                  </p>
                )}
                <p className="text-xs text-rose-500 mt-6 text-center">
                  Click back to see photo
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => paginate('left')}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all"
          aria-label="Previous memory"
        >
          <ChevronLeft className="text-rose-600" size={24} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => paginate('right')}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all"
          aria-label="Next memory"
        >
          <ChevronRight className="text-rose-600" size={24} />
        </motion.button>
      </div>

      {/* Carousel Indicators */}
      <div className="flex justify-center gap-2">
        {MEMORIES.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 'right' : 'left');
              setCurrentIndex(index);
              setFlipped(false);
            }}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-rose-500 w-8'
                : 'bg-rose-200 w-2 hover:bg-rose-300'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      {/* Memory Count */}
      <div className="text-center">
        <p className="text-sm text-rose-600 font-semibold">
          Memory {currentIndex + 1} of {MEMORIES.length}
        </p>
      </div>

      {/* Decorative Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center space-y-4 pt-6 border-t border-rose-200"
      >
        <p className="text-rose-600 italic text-lg">
          Every photo, every moment, every laugh... they all matter 💕
        </p>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="flex justify-center gap-2 text-2xl"
        >
          <span>🌹</span>
          <span>💕</span>
          <span>🌹</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
