import React from 'react';
import { Layers, Trash2 } from 'lucide-react';

interface HomeProps {
  onSelectMode: (mode: 'DRAW' | 'TRASH') => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectMode }) => {
  return (
    <div className="w-full max-w-4xl px-6 flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center animate-float">
      {/* Card 1: Draw */}
      <button 
        onClick={() => onSelectMode('DRAW')}
        className="group relative w-full md:w-80 h-96 border border-gold-900/40 bg-void-light/30 backdrop-blur-sm rounded-sm flex flex-col items-center justify-center transition-all duration-700 hover:border-gold-500/30 hover:bg-gold-900/5"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,_rgba(184,134,11,0.05),transparent_70%)]" />
        
        <div className="mb-6 text-gold-700 group-hover:text-gold-400 transition-colors duration-500">
          <Layers size={48} strokeWidth={1} />
        </div>
        <h2 className="text-2xl font-serif tracking-widest text-gold-200 group-hover:text-gold-100 transition-colors">抽一张卡</h2>
        <div className="w-8 h-[1px] bg-gold-800 my-4 group-hover:w-16 transition-all duration-700"></div>
        <p className="text-xs text-gold-600/70 tracking-widest uppercase">Ritual</p>
      </button>

      {/* Card 2: Trash */}
      <button 
        onClick={() => onSelectMode('TRASH')}
        className="group relative w-full md:w-80 h-96 border border-gold-900/40 bg-void-light/30 backdrop-blur-sm rounded-sm flex flex-col items-center justify-center transition-all duration-700 hover:border-gold-500/30 hover:bg-gold-900/5"
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,_rgba(184,134,11,0.05),transparent_70%)]" />

        <div className="mb-6 text-gold-700 group-hover:text-gold-400 transition-colors duration-500">
          <Trash2 size={48} strokeWidth={1} />
        </div>
        <h2 className="text-2xl font-serif tracking-widest text-gold-200 group-hover:text-gold-100 transition-colors">扔掉烦恼</h2>
        <div className="w-8 h-[1px] bg-gold-800 my-4 group-hover:w-16 transition-all duration-700"></div>
        <p className="text-xs text-gold-600/70 tracking-widest uppercase">Release</p>
      </button>
    </div>
  );
};
