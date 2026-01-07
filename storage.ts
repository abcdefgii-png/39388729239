import { UserStats, StarContent } from '../types';

const STORAGE_KEY = 'quiet_companion_data_v1';

const INITIAL_STATS: UserStats = {
  drawCount: 0,
  trashCount: 0,
  starsCollected: 0,
  cardsCollected: [],
  starsHistory: []
};

export const getStats = (): UserStats => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : INITIAL_STATS;
  } catch (e) {
    return INITIAL_STATS;
  }
};

export const saveStats = (stats: UserStats) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats', e);
  }
};

export const recordDraw = (cardId: string) => {
  const stats = getStats();
  stats.drawCount += 1;
  saveStats(stats);
  // Note: We don't auto-collect cards on draw, only on explicit "Keep" action
};

export const recordKeepCard = (cardId: string) => {
  const stats = getStats();
  if (!stats.cardsCollected.includes(cardId)) {
    stats.cardsCollected.push(cardId);
    saveStats(stats);
  }
};

export const recordTrash = (star: StarContent) => {
  const stats = getStats();
  stats.trashCount += 1;
  stats.starsCollected += 1;
  stats.starsHistory.unshift({ text: star.text, date: Date.now() });
  saveStats(stats);
};
