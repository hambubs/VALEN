import React from 'react';
import { motion } from 'motion/react';
import { Heart, Calendar, MapPin, Sparkles, Flower2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const BRIDGERTON_QUOTES = [
  "I love you desperately. My heart aches for you.",
  "You are the bane of my existence and the object of all my desires.",
  "To meet a beautiful woman is one thing, but to meet your best friend in the most beautiful of women is something entirely apart.",
  "It has been you. It has always been you."
];

export function SuccessScreen() {

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
            src="https://images.unsplash.com/photo-1674274197411-fec149074156?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBzdW5mbG93ZXJzJTIwZmllbGQlMjBib3VxdWV0fGVufDF8fHx8MTc3MDYyMjgyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Sunflower Celebration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-5xl font-serif text-rose-600 font-black">Yay! I knew you'd say yes! 🌻</h1>
        <p className="text-xl text-gray-600">I've got a special virtual date planned for us...</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-rose-100 flex flex-col items-center">
          <Calendar className="text-rose-500 mb-3" size={32} />
          <h3 className="font-bold text-gray-800">Date & Time</h3>
          <p className="text-gray-600">February 14th @ 7:00 PM</p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-rose-100 flex flex-col items-center">
          <MapPin className="text-rose-500 mb-3" size={32} />
          <h3 className="font-bold text-gray-800">Location</h3>
          <p className="text-gray-600">Our Favorite Spot (It's a secret!)</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-serif text-rose-600 font-bold">Reasons Why I Love You</h2>
        <div className="grid grid-cols-1 gap-3">
          {[
            "Your beautiful smile that brightens my day",
            "The way you always know how to make me laugh",
            "How incredibly kind and supportive you are"
          ].map((reason, i) => (
            <motion.div 
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 + (i * 0.2) }}
              className="bg-white/50 p-4 rounded-xl border border-rose-100 flex items-center gap-3"
            >
              <div className="bg-yellow-100 p-2 rounded-full text-yellow-600">
                <Flower2 size={16} fill="currentColor" />
              </div>
              <p className="text-gray-700 font-medium">{reason}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="bg-rose-50 p-8 rounded-3xl border-2 border-dashed border-rose-200 max-w-lg"
      >
        <Heart className="text-rose-500 mx-auto mb-4" fill="currentColor" />
        <p className="text-rose-800 italic text-lg leading-relaxed font-serif">
          "Every day with you feels like Valentine's Day. I can't wait to celebrate another year of us. You mean the world to me, and I'm so lucky to have you in my life."
        </p>
        <p className="mt-4 font-bold text-rose-600">— Your Favorite Person</p>
      </motion.div>
      
      <div className="pt-10">
        <p className="text-sm text-gray-400 text-[20px]">Cant wait for you to be in my arms ❤️</p>
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
