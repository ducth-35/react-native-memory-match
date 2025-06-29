import { Card } from '../types/game.types';

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Check if two cards match
 */
export const cardsMatch = (card1: Card, card2: Card): boolean => {
  return card1.emoji === card2.emoji && card1.id !== card2.id;
};

/**
 * Get grid dimensions based on grid size
 */
export const getGridDimensions = (gridSize: number): { rows: number; cols: number } => {
  switch (gridSize) {
    case 16:
      return { rows: 4, cols: 4 };
    case 20:
      return { rows: 4, cols: 5 };
    case 30:
      return { rows: 5, cols: 6 };
    default:
      return { rows: 4, cols: 4 };
  }
};

/**
 * Calculate game completion percentage
 */
export const getGameProgress = (matchedPairs: number, totalPairs: number): number => {
  return Math.round((matchedPairs / totalPairs) * 100);
};

/**
 * Check if current score is a new best score
 */
export const isNewBestScore = (
  currentAttempts: number,
  levelId: string,
  bestScores: Record<string, any>
): boolean => {
  const currentBest = bestScores[levelId];
  return !currentBest || currentAttempts < currentBest.attempts;
};
