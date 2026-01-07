export interface CardContent {
  id: string;
  title: string;
  tag: string; // 理性 / 温柔 / 冷静 / 鼓励 / 陪伴
  mainText: string;
  subText: string;
}

export interface StarContent {
  id: string;
  text: string;
}

export interface GiftContent {
  id: string;
  type: 'story' | 'joke';
  text: string;
}

export type Mood = '平静' | '焦虑' | '低落' | '疲惫' | '开心' | '生气' | '迷茫';

export type AppView = 'HOME' | 'DIALOGUE' | 'RITUAL' | 'CARD_REVEAL' | 'TRASH_BIN' | 'GALLERY';

export interface UserStats {
  drawCount: number;
  trashCount: number;
  starsCollected: number;
  cardsCollected: string[]; // array of card IDs
  starsHistory: { text: string; date: number }[];
}

export interface DialogueState {
  mood: Mood | null;
  text: string;
  need: string | null;
}
