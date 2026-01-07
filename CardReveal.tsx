import React, { useState, useEffect } from 'react';
import { CardContent } from '../../types';
import { Bookmark, RefreshCw } from 'lucide-react';

interface CardRevealProps {
  card: CardContent;
  onKeep: () => void;
  onRedraw: () => void;
  onFinished: () => void; // Trigger for gift check
}

export const CardReveal: React.FC<CardRevealProps> = ({ card, onKeep, onRedraw, onFinished }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showGiftHint, setShowGiftHint] = useState(false);

  useEffect(() => {
    // Auto flip after slight delay for effect
    const t = setTimeout(() => setIsFlipped(true), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isFlipped) {
      const t = setTimeout(() => {
        setShowGiftHint(true);
        onFinished();
      }, 3000); // Show hint after 3s reading
      return () => clearTimeout(t);
    }
  }, [isFlipped, onFinished]);

  const handleKeep = () => {
    onKeep();
    setIsSaved(true);
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-full w-full">
      
      {/* 3D Card Container */}
      <div className="relative w-72 h-[420px] md:w-80 md:h-[480px] perspective-1000 group">
        <div 
          className={`relative w-full h-full duration-1000 transform-style-3d transition-all ${isFlipped ? 'rotate-y-180' : ''}`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front (Card Back Graphic) */}
          <div 
            className="absolute w-full h-full backface-hidden bg-void border border-gold-800 rounded-xl shadow-2xl flex items-center justify-center"
            style={{ backfaceVisibility: 'hidden' }}
          >
             <div className="w-32 h-32 border border-gold-900 rounded-full flex items-center justify-center opacity-30">
                <div className="w-20 h-20 border border-gold-800 rotate-45" />
             </div>
          </div>

          {/* Back (Actual Content) - Rotated 180 initially */}
          <div 
            className="absolute w-full h-full backface-hidden rotate-y-180 bg-[#0c0c0f] border border-gold-700/50 rounded-xl shadow-[0_0_30px_rgba(184,134,11,0.1)] p-8 flex flex-col items-center text-center"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            {/* Header */}
            <div className="w-full flex justify-between items-start mb-12 opacity-80">
              <span className="text-[10px] text-gold-600 tracking-[0.2em]">{card.id.toUpperCase()}</span>
              <span className="text-[10px] text-gold-600 tracking-[0.2em] uppercase border border-gold-900 px-2 py-0.5 rounded-full">{card.tag}</span>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center items-center">
              <h3 className="font-serif text-xl md:text-2xl text-gold-100 leading-relaxed tracking-wide mb-8">
                {card.mainText}
              </h3>
              <p className="text-sm text-gold-600 font-light leading-7 max-w-[80%]">
                {card.subText}
              </p>
            </div>

            {/* Footer Decoration */}
            <div className="mt-8 w-2 h-2 rounded-full bg-gold-800/50" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className={`mt-12 flex space-x-8 transition-opacity duration-1000 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
        <button 
          onClick={handleKeep}
          disabled={isSaved}
          className="flex flex-col items-center space-y-2 group text-gold-600 hover:text-gold-300 transition-colors disabled:opacity-50"
        >
          <div className={`p-3 rounded-full border border-gold-900 group-hover:border-gold-500 transition-all ${isSaved ? 'bg-gold-900/30 text-gold-400' : ''}`}>
             <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
          </div>
          <span className="text-[10px] tracking-[0.2em]">{isSaved ? '已收藏' : '收藏'}</span>
        </button>

        <button 
          onClick={onRedraw}
          className="flex flex-col items-center space-y-2 group text-gold-600 hover:text-gold-300 transition-colors"
        >
          <div className="p-3 rounded-full border border-gold-900 group-hover:border-gold-500 transition-all">
             <RefreshCw size={20} />
          </div>
          <span className="text-[10px] tracking-[0.2em]">重抽</span>
        </button>
      </div>

      {/* Gift Hint */}
      {showGiftHint && (
        <div className="absolute bottom-4 animate-[fadeIn_2s_ease-out]">
           <p className="text-[10px] text-gold-800 tracking-widest">
             今天，也许还有一份小礼物...
           </p>
        </div>
      )}

    </div>
  );
};
