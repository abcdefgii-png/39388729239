import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { SelfDialogue } from './components/DrawCard/SelfDialogue';
import { CardRing } from './components/DrawCard/CardRing';
import { CardReveal } from './components/DrawCard/CardReveal';
import { GiftReveal } from './components/DrawCard/GiftReveal';
import { BinScene } from './components/TrashCan/BinScene';
import { Gallery } from './components/Gallery';

import { AppView, CardContent, GiftContent, StarContent, UserStats } from './types';
import { CARD_LIBRARY, GIFT_LIBRARY, STAR_LIBRARY } from './constants';
import * as Storage from './services/storage';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('HOME');
  const [currentCard, setCurrentCard] = useState<CardContent | null>(null);
  const [currentGift, setCurrentGift] = useState<GiftContent | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [stats, setStats] = useState<UserStats>(Storage.getStats());

  // --- DRAW FLOW ---

  const startDrawFlow = () => {
    setView('DIALOGUE');
  };

  const onDialogueComplete = () => {
    setView('RITUAL');
  };

  const handleSelectCard = (index: number) => {
    // In a real app, 'index' could influence the seed, but here we pick random for variety
    // Filter logic could be added here based on Mood if desired
    const randomIndex = Math.floor(Math.random() * CARD_LIBRARY.length);
    const selected = CARD_LIBRARY[randomIndex];
    
    setCurrentCard(selected);
    
    // Record the draw immediately
    Storage.recordDraw(selected.id);
    refreshStats();

    setView('CARD_REVEAL');
  };

  const handleKeepCard = () => {
    if (currentCard) {
      Storage.recordKeepCard(currentCard.id);
      refreshStats();
    }
  };

  const handleRedraw = () => {
     setView('RITUAL');
     setCurrentGift(null);
  };

  const handleCardFinished = () => {
    // 70% chance of gift
    if (Math.random() < 0.7) {
      const randomGift = GIFT_LIBRARY[Math.floor(Math.random() * GIFT_LIBRARY.length)];
      setCurrentGift(randomGift);
    }
  };

  // --- TRASH FLOW ---

  const startTrashFlow = () => {
    setView('TRASH_BIN');
  };

  const handleThrowTrash = (text: string): StarContent => {
    // Select unique star if possible, otherwise random
    const availableStars = STAR_LIBRARY.filter(s => 
      !stats.starsHistory.some(h => h.text === s.text)
    );
    
    const pool = availableStars.length > 0 ? availableStars : STAR_LIBRARY;
    const star = pool[Math.floor(Math.random() * pool.length)];
    
    Storage.recordTrash(star);
    refreshStats();
    return star;
  };

  const finishTrashFlow = () => {
    setView('HOME');
  };

  // --- GENERAL ---

  const refreshStats = () => {
    setStats(Storage.getStats());
  };

  const goHome = () => {
    setView('HOME');
    setCurrentCard(null);
    setCurrentGift(null);
  };

  return (
    <Layout 
      onOpenGallery={() => setIsGalleryOpen(true)} 
      onGoHome={goHome}
      showGalleryButton={view === 'HOME'}
    >
      
      {view === 'HOME' && (
        <Home onSelectMode={(mode) => mode === 'DRAW' ? startDrawFlow() : startTrashFlow()} />
      )}

      {view === 'DIALOGUE' && (
        <SelfDialogue onComplete={onDialogueComplete} />
      )}

      {view === 'RITUAL' && (
        <CardRing onSelectCard={handleSelectCard} />
      )}

      {view === 'CARD_REVEAL' && currentCard && (
        <>
          <CardReveal 
            card={currentCard} 
            onKeep={handleKeepCard} 
            onRedraw={handleRedraw}
            onFinished={handleCardFinished}
          />
          {currentGift && (
            <GiftReveal gift={currentGift} onClose={() => setCurrentGift(null)} />
          )}
        </>
      )}

      {view === 'TRASH_BIN' && (
        <BinScene onThrow={handleThrowTrash} onFinish={finishTrashFlow} />
      )}

      <Gallery 
        isOpen={isGalleryOpen} 
        onClose={() => setIsGalleryOpen(false)} 
        stats={stats} 
      />
      
    </Layout>
  );
};

export default App;
