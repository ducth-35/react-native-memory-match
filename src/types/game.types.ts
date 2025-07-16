export interface Card {
  id: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  flippedCards: Card[];
  matchedPairs: number;
  attempts: number;
  timeElapsed: number;
  isGameComplete: boolean;
  isGameStarted: boolean;
  currentLevel: DifficultyLevel;
}

export interface DifficultyLevel {
  id: string;
  name: string;
  gridSize: number; // 4x4 = 16, 6x6 = 36, etc.
  pairs: number;
  emojis: string[];
}

export interface BestScore {
  attempts: number;
  timeElapsed: number;
  date: string;
}

export interface GameStore extends GameState {
  // Actions
  initializeGame: (level: DifficultyLevel) => void;
  flipCard: (cardId: string) => void;
  resetGame: () => void;
  setCurrentLevel: (level: DifficultyLevel) => void;
  updateTime: (time: number) => void;

  // Best scores
  bestScores: Record<string, BestScore>;
  loadBestScores: () => Promise<void>;
}

export const DIFFICULTY_LEVELS: DifficultyLevel[] = [
  {
    id: 'easy',
    name: 'Easy (4x4)',
    gridSize: 16,
    pairs: 8,
    emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼']
  },
  {
    id: 'medium',
    name: 'Medium (4x5)',
    gridSize: 20,
    pairs: 10,
    emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯']
  },
  {
    id: 'hard',
    name: 'Hard (5x6)',
    gridSize: 30,
    pairs: 15,
    emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐸', '🐵', '🐔', '🐧']
  }
];
