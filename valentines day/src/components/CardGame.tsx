import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shuffle } from 'lucide-react';

export type CardType = 'question' | 'dare';

interface Card {
  id: number;
  type: CardType;
  text: string;
  emoji: string;
}

const QUESTIONS: Card[] = [
  { id: 1, type: 'question', text: "What's your favorite memory of us?", emoji: '💭' },
  { id: 2, type: 'question', text: "What do you miss most about me when we're apart?", emoji: '💔' },
  { id: 3, type: 'question', text: "If you could have one superpower just to be closer to me, what would it be?", emoji: '⚡' },
  { id: 4, type: 'question', text: "What's something I do that makes you feel loved?", emoji: '😍' },
  { id: 5, type: 'question', text: "Describe me in three words. Go!", emoji: '✨' },
  { id: 6, type: 'question', text: "What's your favorite thing about our long-distance relationship?", emoji: '🌍' },
  { id: 7, type: 'question', text: "If we could spend one day anywhere in the world, where would it be?", emoji: '🌎' },
  { id: 8, type: 'question', text: "What's the sweetest thing I've ever done for you?", emoji: '🍯' },
  { id: 9, type: 'question', text: "How do you feel when you see a text from me?", emoji: '📱' },
  { id: 10, type: 'question', text: "What's something about our future together that excites you?", emoji: '🚀' },
  { id: 11, type: 'question', text: "If I could read your mind right now, what would I find?", emoji: '🧠' },
  { id: 12, type: 'question', text: "What's the most romantic thing you've ever felt?", emoji: '🌹' },
  { id: 13, type: 'question', text: "How did you know I was the one?", emoji: '💫' },
  { id: 14, type: 'question', text: "What's your favorite inside joke between us?", emoji: '😄' },
  { id: 15, type: 'question', text: "If you could go back to the beginning, would you change anything?", emoji: '⏰' }
];

const DARES: Card[] = [
  { id: 101, type: 'dare', text: "Send me your silliest selfie right now!", emoji: '🤪' },
  { id: 102, type: 'dare', text: "Send me a voice message telling me something you love about me.", emoji: '🎤' },
  { id: 103, type: 'dare', text: "Send me a song that reminds you of me (with a reason why).", emoji: '🎵' },
  { id: 104, type: 'dare', text: "Do your best impression of me over video call!", emoji: '🎭' },
  { id: 105, type: 'dare', text: "Send me a photo of you wearing something silly.", emoji: '👕' },
  { id: 106, type: 'dare', text: "Write me a poem (it can be bad—actually, better if it is!)", emoji: '📝' },
  { id: 107, type: 'dare', text: "Tell me a secret you've never told anyone else.", emoji: '🤐' },
  { id: 108, type: 'dare', text: "Send me your favorite photo of us with a caption.", emoji: '📸' },
  { id: 109, type: 'dare', text: "Create a playlist of 5 songs for our next video date.", emoji: '🎶' },
  { id: 110, type: 'dare', text: "Do 10 push-ups and send me a proud selfie!", emoji: '💪' },
  { id: 111, type: 'dare', text: "Send me a video of you dancing to our song.", emoji: '💃' },
  { id: 112, type: 'dare', text: "Write down 5 dreams you have with me and share them.", emoji: '⛅' },
  { id: 113, type: 'dare', text: "Send me your favorite thing you're wearing (story from it!).", emoji: '👗' },
  { id: 114, type: 'dare', text: "Tell me the first thing you noticed about me.", emoji: '👀' },
  { id: 115, type: 'dare', text: "Send me a photo of something that reminds you of me.", emoji: '🌻' }
];

export function CardGame() {
  const [allCards] = useState<Card[]>([...QUESTIONS, ...DARES]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number | null>(null);
  const [revealedCards, setRevealedCards] = useState<Set<number>>(new Set());
  const [isShuffled, setIsShuffled] = useState(false);

  const shuffleCards = () => {
    const randomIndex = Math.floor(Math.random() * allCards.length);
    setCurrentCardIndex(randomIndex);
    setIsShuffled(true);
  };

  const markAsRevealed = () => {
    if (currentCardIndex !== null) {
      setRevealedCards(prev => new Set(prev).add(allCards[currentCardIndex].id));
    }
  };

  const getNextCard = () => {
    markAsRevealed();
    setTimeout(() => shuffleCards(), 300);
  };

  const currentCard = currentCardIndex !== null ? allCards[currentCardIndex] : null;
  const progress = revealedCards.size;
  const totalCards = allCards.length;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-2xl mx-auto p-8 my-8"
    >
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-serif font-bold text-rose-600 mb-2">
          ❤️ Truth or Dare 💕
        </h2>
        <p className="text-gray-600">
          A game designed just for us
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-gray-600 font-medium">
            Cards Explored: <span className="text-rose-600 font-bold">{progress}</span> of {totalCards}
          </p>
          <div className="text-sm text-gray-500">
            {Math.round((progress / totalCards) * 100)}%
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-rose-500 to-pink-500 h-full rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(progress / totalCards) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Card Display */}
      <AnimatePresence mode="wait">
        {!isShuffled && !currentCard ? (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center justify-center min-h-80 space-y-6"
          >
            <div className="text-6xl animate-bounce">🎴</div>
            <p className="text-2xl text-gray-700 text-center font-serif italic">
              Ready to play?
            </p>
            <p className="text-gray-600 text-center max-w-xs">
              Click "Shuffle" to draw a card and discover something new about each other.
            </p>
          </motion.div>
        ) : currentCard ? (
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.5 }}
            className={`min-h-80 rounded-3xl p-8 flex flex-col justify-center items-center text-center space-y-6 cursor-pointer shadow-2xl border-4 ${
              currentCard.type === 'question'
                ? 'bg-gradient-to-br from-blue-400 to-blue-500 border-blue-300 hover:from-blue-500 hover:to-blue-600'
                : 'bg-gradient-to-br from-amber-400 to-orange-500 border-amber-300 hover:from-amber-500 hover:to-orange-600'
            } transition-all transform hover:scale-105`}
            onClick={getNextCard}
          >
            <div className="text-7xl">{currentCard.emoji}</div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-white/80 uppercase tracking-widest">
                {currentCard.type === 'question' ? '❓ Question' : '🎯 Dare'}
              </p>
              <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed font-serif">
                {currentCard.text}
              </p>
            </div>
            <p className="text-sm text-white/70 italic">Click to get another card...</p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={shuffleCards}
        className="w-full mt-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
      >
        <Shuffle size={24} />
        {currentCard ? 'Get Next Card' : 'Draw a Card'}
      </motion.button>

      {/* Helper Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center text-gray-600 text-sm space-y-2"
      >
        <p>💌 This game is our way of connecting across the distance.</p>
        <p>Take your time answering—there's no rush, just us.</p>
      </motion.div>
    </motion.div>
  );
}
