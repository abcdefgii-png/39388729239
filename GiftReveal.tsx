import React, { useState } from 'react';
import { GiftContent } from '../../types';
import { Smile, Moon } from 'lucide-react';

interface GiftRevealProps {
  gift: GiftContent;
  onClose: () => void;
}

export const GiftReveal: React.FC<GiftRevealProps> = ({ gift, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Initial trigger prompt
  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-12 left-1/2 -translate-x-1/2 px-6 py-2 border border-dashed border-gold-800/50 text-gold-600 text-xs tracking-widest hover:text-gold-300 hover:border-gold-500 transition-all animate-[pulse_3s_infinite]"
      >
        打开礼物
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.5s_ease-out]">
      <div className="relative w-11/12 max-w-md bg-[#1a1a1e] border border-gold-900 p-8 shadow-2xl rounded-sm">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gold-800 hover:text-gold-500"
        >
          ✕
        </button>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className="text-gold-500 opacity-80">
            {gift.type === 'story' ? <Moon size={24} /> : <Smile size={24} />}
          </div>
          
          <div className="w-8 h-[1px] bg-gold-800/50"></div>

          <p className="text-gold-200 leading-8 font-light text-sm md:text-base px-4">
            {gift.text}
          </p>

          <div className="pt-4">
             <button onClick={onClose} className="text-[10px] text-gold-700 hover:text-gold-400 tracking-[0.2em] uppercase">
               收下
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
