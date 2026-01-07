import React, { useState, useEffect } from 'react';
import { StarContent } from '../../types';
import { Sparkles, X } from 'lucide-react';

interface BinSceneProps {
  onThrow: (text: string) => StarContent;
  onFinish: () => void;
}

export const BinScene: React.FC<BinSceneProps> = ({ onThrow, onFinish }) => {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState<'INPUT' | 'THROWING' | 'PROCESSING' | 'REWARD'>('INPUT');
  const [rewardStar, setRewardStar] = useState<StarContent | null>(null);

  const handleThrow = () => {
    if (!text.trim()) return;
    setPhase('THROWING');
    
    // Sequence
    setTimeout(() => {
      setPhase('PROCESSING');
      // Logic trigger
      const star = onThrow(text);
      setRewardStar(star);
    }, 1000); // Wait for throw anim
  };

  useEffect(() => {
    if (phase === 'PROCESSING') {
      const t = setTimeout(() => {
        setPhase('REWARD');
      }, 1500); // Wait for bin shake
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
      
      {/* Exit Button */}
      <button onClick={onFinish} className="absolute top-6 left-6 text-gold-700 hover:text-gold-400">
        <X size={24} />
      </button>

      {/* Title */}
      <div className={`absolute top-20 transition-opacity duration-1000 ${phase === 'INPUT' ? 'opacity-100' : 'opacity-0'}`}>
         <h2 className="text-xl font-serif text-gold-200 tracking-widest text-center">
           把烦恼写下来，<br/>然后扔掉。
         </h2>
      </div>

      {/* The Paper (Input) */}
      <div 
        className={`relative z-20 w-full max-w-sm aspect-[3/4] transition-all duration-1000 ease-in-out ${
          phase === 'THROWING' || phase === 'PROCESSING' || phase === 'REWARD'
            ? 'translate-y-[400px] scale-0 opacity-0 rotate-180' 
            : 'translate-y-0 scale-100 opacity-100'
        }`}
      >
        <div className="w-full h-full bg-[#fdf6e3] text-gray-800 p-6 shadow-2xl rotate-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 300))}
            placeholder="写下那些让你疲惫的事..."
            className="w-full h-full bg-transparent resize-none outline-none font-serif text-lg leading-relaxed placeholder-gray-400"
            disabled={phase !== 'INPUT'}
          />
          <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-sans">{text.length}/300</div>
        </div>
      </div>

      {/* Throw Action */}
      {phase === 'INPUT' && text.length > 0 && (
        <button
          onClick={handleThrow}
          className="absolute bottom-24 z-30 px-8 py-3 bg-gold-900 text-gold-100 tracking-[0.3em] uppercase text-sm border border-gold-600 hover:bg-gold-700 transition-colors shadow-lg animate-[fadeIn_0.5s]"
        >
          扔掉
        </button>
      )}

      {/* The Bin (Visual) */}
      <div className="absolute bottom-0 md:bottom-10 flex flex-col items-center justify-end pointer-events-none">
         {/* Bin Lid */}
         <div className={`w-40 h-4 bg-gold-900 rounded-t-lg mb-1 border-t border-gold-700 transition-transform duration-100 ${
           phase === 'PROCESSING' ? 'animate-[pulse_0.2s_ease-in-out_infinite]' : ''
         }`} />
         
         {/* Bin Body */}
         <div className="w-32 h-48 bg-gradient-to-b from-void-light to-black border-x border-b border-gold-900/50 rounded-b-lg relative overflow-hidden">
            {/* Texture */}
            <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#b8860b_10px,#b8860b_11px)]" />
            
            {/* Stardust Emission */}
            {phase === 'PROCESSING' && (
              <div className="absolute inset-x-0 top-0 h-full flex justify-center">
                 <div className="w-2 h-2 bg-white rounded-full animate-[float_2s_infinite] opacity-50 blur-sm" />
                 <div className="w-1 h-1 bg-gold-300 rounded-full animate-[float_3s_infinite_0.5s] opacity-70" />
              </div>
            )}
         </div>
      </div>

      {/* Star Reward */}
      {phase === 'REWARD' && rewardStar && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-40 animate-[fadeIn_1s_ease-out]">
          
          {/* Glowing Star */}
          <div className="mb-8 relative">
             <div className="absolute inset-0 bg-gold-400 blur-xl opacity-40 animate-pulse" />
             <Sparkles size={64} className="text-gold-200 animate-[spin-slow_10s_linear_infinite]" />
          </div>

          <div className="max-w-xs text-center space-y-4">
             <p className="text-xs text-gold-500 tracking-[0.2em] uppercase">Universe Message</p>
             <h3 className="text-xl md:text-2xl font-serif text-gold-100 leading-normal">
               {rewardStar.text}
             </h3>
          </div>

          <button
            onClick={onFinish}
            className="mt-12 text-xs text-gold-600 hover:text-gold-300 tracking-widest uppercase border-b border-transparent hover:border-gold-500 transition-all"
          >
            收下并离开
          </button>
        </div>
      )}

    </div>
  );
};
