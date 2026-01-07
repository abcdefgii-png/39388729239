import React, { useState } from 'react';
import { MOODS, NEEDS } from '../../constants';
import { DialogueState, Mood } from '../../types';

interface SelfDialogueProps {
  onComplete: (data: DialogueState) => void;
}

export const SelfDialogue: React.FC<SelfDialogueProps> = ({ onComplete }) => {
  const [mood, setMood] = useState<Mood | null>(null);
  const [text, setText] = useState('');
  const [need, setNeed] = useState<string | null>(null);

  const handleStart = () => {
    onComplete({ mood, text, need });
  };

  return (
    <div className="w-full max-w-md px-6 animate-[fadeIn_1s_ease-out]">
      <div className="space-y-12">
        
        {/* Mood Section */}
        <div className="space-y-4">
          <label className="block text-xs tracking-[0.2em] text-gold-600 uppercase text-center">此刻的心情</label>
          <div className="flex flex-wrap justify-center gap-3">
            {MOODS.map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`px-4 py-2 text-sm border rounded-full transition-all duration-500 ${
                  mood === m 
                    ? 'border-gold-500 text-gold-100 bg-gold-900/20' 
                    : 'border-gold-900/30 text-gold-600 hover:border-gold-700 hover:text-gold-400'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Text Input */}
        <div className="space-y-4">
          <label className="block text-xs tracking-[0.2em] text-gold-600 uppercase text-center">今天想说点什么（可选）</label>
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 200))}
              placeholder="..."
              className="w-full h-32 bg-void-light/50 border-b border-gold-900/50 focus:border-gold-500/50 text-gold-200 p-4 resize-none outline-none text-center font-light placeholder-gold-900/50 transition-colors"
            />
            <span className="absolute bottom-2 right-2 text-[10px] text-gold-800">{text.length}/200</span>
          </div>
        </div>

        {/* Needs */}
        <div className="space-y-4">
          <label className="block text-xs tracking-[0.2em] text-gold-600 uppercase text-center">倾向（可选）</label>
          <div className="flex flex-wrap justify-center gap-3">
            {NEEDS.map((n) => (
              <button
                key={n}
                onClick={() => setNeed(n === need ? null : n)}
                className={`px-3 py-1 text-xs border-b transition-all duration-500 ${
                  need === n
                    ? 'border-gold-500 text-gold-200' 
                    : 'border-transparent text-gold-700 hover:text-gold-400'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Action */}
        <div className="pt-8 flex justify-center">
          <button
            onClick={handleStart}
            className="px-8 py-3 bg-gold-900/20 border border-gold-700/50 text-gold-200 tracking-[0.3em] hover:bg-gold-900/40 hover:border-gold-500 transition-all duration-700 uppercase text-sm"
          >
            开始抽卡
          </button>
        </div>

      </div>
    </div>
  );
};
