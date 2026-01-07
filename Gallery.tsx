import React, { useState } from 'react';
import { UserStats, CardContent, StarContent } from '../types';
import { CARD_LIBRARY } from '../constants';
import { X, Grid, List, Activity } from 'lucide-react';

interface GalleryProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
}

export const Gallery: React.FC<GalleryProps> = ({ isOpen, onClose, stats }) => {
  const [tab, setTab] = useState<'CARDS' | 'STARS' | 'STATS'>('CARDS');
  const [selectedCard, setSelectedCard] = useState<CardContent | null>(null);

  if (!isOpen) return null;

  const collectedCards = CARD_LIBRARY.filter(c => stats.cardsCollected.includes(c.id));

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-[#0c0c0f] border-l border-gold-900/50 shadow-2xl flex flex-col animate-[slideInRight_0.3s_ease-out]">
        
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-gold-900/30">
          <h2 className="text-lg font-serif text-gold-200 tracking-widest">记忆与痕迹</h2>
          <button onClick={onClose} className="text-gold-700 hover:text-gold-400">
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex w-full border-b border-gold-900/30">
          <button 
            onClick={() => setTab('CARDS')}
            className={`flex-1 py-4 flex justify-center items-center space-x-2 text-xs tracking-widest transition-colors ${tab === 'CARDS' ? 'text-gold-200 bg-gold-900/10' : 'text-gold-700 hover:text-gold-400'}`}
          >
            <Grid size={16} /> <span>卡牌</span>
          </button>
          <button 
            onClick={() => setTab('STARS')}
            className={`flex-1 py-4 flex justify-center items-center space-x-2 text-xs tracking-widest transition-colors ${tab === 'STARS' ? 'text-gold-200 bg-gold-900/10' : 'text-gold-700 hover:text-gold-400'}`}
          >
            <List size={16} /> <span>星星</span>
          </button>
          <button 
            onClick={() => setTab('STATS')}
            className={`flex-1 py-4 flex justify-center items-center space-x-2 text-xs tracking-widest transition-colors ${tab === 'STATS' ? 'text-gold-200 bg-gold-900/10' : 'text-gold-700 hover:text-gold-400'}`}
          >
            <Activity size={16} /> <span>足迹</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
          
          {/* CARDS VIEW */}
          {tab === 'CARDS' && (
            <div className="grid grid-cols-2 gap-4">
              {collectedCards.length === 0 ? (
                <div className="col-span-2 text-center text-gold-800 text-sm py-12">
                  暂无收藏
                </div>
              ) : (
                collectedCards.map(card => (
                  <button 
                    key={card.id} 
                    onClick={() => setSelectedCard(card)}
                    className="aspect-[2/3] bg-void-light border border-gold-900/50 rounded p-4 flex flex-col justify-between hover:border-gold-500/50 transition-all group"
                  >
                     <div className="text-[10px] text-gold-700 text-left">{card.tag}</div>
                     <div className="text-center">
                        <div className="text-gold-300 font-serif text-sm mb-2">{card.title}</div>
                        <div className="w-4 h-[1px] bg-gold-800 mx-auto group-hover:w-8 transition-all" />
                     </div>
                     <div className="text-[10px] text-gold-800 text-right">{card.id}</div>
                  </button>
                ))
              )}
            </div>
          )}

          {/* STARS VIEW */}
          {tab === 'STARS' && (
            <div className="space-y-4">
              {stats.starsHistory.length === 0 ? (
                <div className="text-center text-gold-800 text-sm py-12">
                   还没有收集到星星
                </div>
              ) : (
                stats.starsHistory.map((star, idx) => (
                  <div key={idx} className="p-4 bg-void-light/50 border border-gold-900/30 rounded flex items-start space-x-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-gold-600 shrink-0" />
                    <div>
                      <p className="text-gold-300 text-sm font-serif">{star.text}</p>
                      <p className="text-[10px] text-gold-800 mt-2">{new Date(star.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* STATS VIEW */}
          {tab === 'STATS' && (
            <div className="space-y-8 py-8">
              <div className="text-center">
                 <div className="text-4xl font-serif text-gold-200 mb-2">{stats.drawCount}</div>
                 <div className="text-xs text-gold-600 uppercase tracking-widest">抽卡次数</div>
              </div>
              <div className="w-full h-[1px] bg-gold-900/50" />
              <div className="text-center">
                 <div className="text-4xl font-serif text-gold-200 mb-2">{stats.trashCount}</div>
                 <div className="text-xs text-gold-600 uppercase tracking-widest">扔掉烦恼</div>
              </div>
              <div className="w-full h-[1px] bg-gold-900/50" />
              <div className="text-center">
                 <div className="text-4xl font-serif text-gold-200 mb-2">{stats.starsCollected}</div>
                 <div className="text-xs text-gold-600 uppercase tracking-widest">收集星星</div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Card Detail Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md p-6" onClick={() => setSelectedCard(null)}>
           <div className="max-w-md w-full bg-[#0c0c0f] border border-gold-600/30 p-8 rounded shadow-2xl relative" onClick={e => e.stopPropagation()}>
              <h3 className="text-2xl font-serif text-gold-100 mb-6 text-center">{selectedCard.mainText}</h3>
              <p className="text-gold-500 font-light leading-relaxed text-center mb-8">{selectedCard.subText}</p>
              <div className="text-center">
                <span className="text-xs border border-gold-800 px-2 py-1 rounded-full text-gold-700">{selectedCard.tag}</span>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
