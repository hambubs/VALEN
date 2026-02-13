import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { VALENTINE_QUESTION, SPRING_CONFIG, ANIMATION_DURATIONS } from '../constants/animations';

interface ValentineQuestionProps {
  onYes: () => void;
}

export function ValentineQuestion({ onYes }: ValentineQuestionProps) {
  const [noCount, setNoCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const noButtonRef = useRef<HTMLButtonElement | null>(null);
  const yesButtonRef = useRef<HTMLButtonElement | null>(null);
  
  const getNoButtonText = () => {
    return VALENTINE_QUESTION.NO_PHRASES[Math.min(noCount, VALENTINE_QUESTION.NO_PHRASES.length - 1)];
  };

  const handleNoHover = () => {
    // Move the no button farther as the yes button grows, but keep it inside the container.
    // Use polar coordinates and robust clamping to prevent off-screen jumps.
    const containerRect = containerRef.current?.getBoundingClientRect() ?? document.documentElement.getBoundingClientRect();
    const yesRect = yesButtonRef.current?.getBoundingClientRect();
    const noRect = noButtonRef.current?.getBoundingClientRect();

    const noW = noRect?.width ?? 80;
    const noH = noRect?.height ?? 36;
    const yesW = (yesRect?.width ?? 120) * yesButtonScale;
    const yesH = (yesRect?.height ?? 48) * yesButtonScale;

    // base and extra distance influenced by yes button scale
    const baseDistance = 120;
    const extraPerScale = 50;
    let distance = baseDistance + yesButtonScale * extraPerScale;

    // compute the maximum allowed x/y offsets so the no button stays inside the container
    const maxX = Math.max(8, containerRect.width / 2 - noW / 2 - 8);
    const maxY = Math.max(8, containerRect.height / 2 - noH / 2 - 8);

    // maximum reachable radius inside the container rectangle
    const radiusMax = Math.hypot(maxX, maxY);

    // minimum distance from the yes button to avoid overlap
    const minDistance = (yesW / 2) + (noW / 2) + 18 * yesButtonScale;

    // ensure distance is within allowed range
    distance = Math.min(distance, radiusMax);
    if (distance < minDistance) distance = Math.min(minDistance, radiusMax);

    // pick a random angle and compute coords relative to container center
    const angle = Math.random() * Math.PI * 2;
    let targetX = Math.cos(angle) * distance;
    let targetY = Math.sin(angle) * distance;

    // If the computed point exceeds rectangular bounds, scale it down along the ray
    if (Math.abs(targetX) > maxX || Math.abs(targetY) > maxY) {
      const scaleX = Math.abs(targetX) > 0 ? maxX / Math.abs(targetX) : 1;
      const scaleY = Math.abs(targetY) > 0 ? maxY / Math.abs(targetY) : 1;
      const scale = Math.min(scaleX, scaleY, 1);
      targetX *= scale;
      targetY *= scale;
    }

    // final safety: ensure not overlapping yes button center (which is near 0,0 in this layout)
    const dx = targetX;
    const dy = targetY;
    const actualDist = Math.hypot(dx, dy);
    if (actualDist < minDistance) {
      // push out along same angle to minDistance but clamped to radiusMax
      const wanted = Math.min(minDistance, radiusMax);
      const factor = wanted / (actualDist || 1);
      targetX *= factor;
      targetY *= factor;
    }

    setNoButtonPos({ x: targetX, y: targetY });
    // Cap the noCount at MAX_NO_CLICKS to prevent unbounded state growth
    setNoCount(prev => Math.min(prev + 1, VALENTINE_QUESTION.MAX_NO_CLICKS));
  };

  const yesButtonScale = 1 + noCount * VALENTINE_QUESTION.YES_BUTTON_SCALE_MULTIPLIER;
  const isCoveringScreen = noCount >= VALENTINE_QUESTION.SCREEN_COVER_THRESHOLD;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center space-y-8 p-6 text-center max-w-md mx-auto min-h-[400px]"
    >
      <div className={`w-48 h-48 rounded-2xl overflow-hidden shadow-xl mb-4 border-4 border-white transition-opacity duration-500 ${noCount > VALENTINE_QUESTION.IMAGE_FADE_THRESHOLD ? 'opacity-0' : 'opacity-100'}`}>
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1758748930322-54d750ba4e5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW5nbGUlMjBzdW5mbG93ZXIlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzcwNjIyODM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="A sunflower for my sunflower"
          className="w-full h-full object-cover"
        />
      </div>
      
      <h1 className={`text-4xl font-serif text-rose-600 font-bold leading-tight transition-opacity duration-500 ${noCount > VALENTINE_QUESTION.TEXT_FADE_THRESHOLD ? 'opacity-0' : 'opacity-100'}`}>
        Tamanna, will you be my Valentine? 🌻
      </h1>
      
      <p className={`text-lg text-rose-500/80 font-light transition-opacity duration-500 ${noCount > VALENTINE_QUESTION.TEXT_FADE_THRESHOLD ? 'opacity-0' : 'opacity-100'}`}>
        Distance means so little when you mean so much.
      </p>
      
      <div ref={containerRef} className="flex items-center justify-center gap-4 relative w-full min-h-20">
        <motion.button
          layout
          ref={yesButtonRef}
          onClick={onYes}
          animate={{ 
            scale: yesButtonScale,
            zIndex: isCoveringScreen ? 100 : 10,
            borderRadius: isCoveringScreen ? 0 : "9999px",
          }}
          transition={{ 
            type: "spring", 
            stiffness: SPRING_CONFIG.GENTLE.stiffness, 
            damping: SPRING_CONFIG.GENTLE.damping,
            mass: SPRING_CONFIG.GENTLE.mass,
            layout: { type: "spring", stiffness: SPRING_CONFIG.GENTLE.stiffness, damping: SPRING_CONFIG.GENTLE.damping }
          }}
          className={`bg-rose-500 text-white font-bold shadow-lg hover:bg-rose-600 transition-colors whitespace-nowrap
            ${isCoveringScreen ? 'fixed inset-0 w-screen h-screen flex items-center justify-center text-6xl' : 'px-8 py-3 text-lg relative'}`}
        >
          {isCoveringScreen ? "YES! 💖" : "Yes! 💖"}
        </motion.button>
        
        {!isCoveringScreen && (
          <motion.button
            ref={noButtonRef}
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
            transition={{ type: "spring", stiffness: SPRING_CONFIG.SNAPPY.stiffness, damping: SPRING_CONFIG.SNAPPY.damping }}
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
