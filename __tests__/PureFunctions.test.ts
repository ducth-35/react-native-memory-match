import {
  shuffleArray,
  cardsMatch,
  getGridDimensions,
  getGameProgress,
  isNewBestScore
} from '../src/utils/pureFunctions';
import { DIFFICULTY_LEVELS } from '../src/types/game.types';

describe('Pure Game Functions', () => {
  describe('shuffleArray', () => {
    it('should shuffle array elements', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(original);
      
      expect(shuffled).toHaveLength(original.length);
      expect(shuffled).toEqual(expect.arrayContaining(original));
    });

    it('should not modify original array', () => {
      const original = [1, 2, 3, 4, 5];
      const originalCopy = [...original];
      shuffleArray(original);
      
      expect(original).toEqual(originalCopy);
    });
  });

  describe('cardsMatch', () => {
    it('should return true for cards with same emoji but different ids', () => {
      const card1 = { id: '1', emoji: '🐶', isFlipped: false, isMatched: false };
      const card2 = { id: '2', emoji: '🐶', isFlipped: false, isMatched: false };
      
      expect(cardsMatch(card1, card2)).toBe(true);
    });

    it('should return false for cards with different emojis', () => {
      const card1 = { id: '1', emoji: '🐶', isFlipped: false, isMatched: false };
      const card2 = { id: '2', emoji: '🐱', isFlipped: false, isMatched: false };
      
      expect(cardsMatch(card1, card2)).toBe(false);
    });

    it('should return false for same card (same id)', () => {
      const card1 = { id: '1', emoji: '🐶', isFlipped: false, isMatched: false };
      const card2 = { id: '1', emoji: '🐶', isFlipped: false, isMatched: false };
      
      expect(cardsMatch(card1, card2)).toBe(false);
    });
  });

  describe('getGridDimensions', () => {
    it('should return correct dimensions for different grid sizes', () => {
      expect(getGridDimensions(16)).toEqual({ rows: 4, cols: 4 });
      expect(getGridDimensions(20)).toEqual({ rows: 4, cols: 5 });
      expect(getGridDimensions(30)).toEqual({ rows: 5, cols: 6 });
    });

    it('should return default dimensions for unknown grid size', () => {
      expect(getGridDimensions(999)).toEqual({ rows: 4, cols: 4 });
    });
  });

  describe('getGameProgress', () => {
    it('should calculate correct progress percentage', () => {
      expect(getGameProgress(0, 8)).toBe(0);
      expect(getGameProgress(4, 8)).toBe(50);
      expect(getGameProgress(8, 8)).toBe(100);
    });

    it('should round progress to nearest integer', () => {
      expect(getGameProgress(1, 3)).toBe(33);
      expect(getGameProgress(2, 3)).toBe(67);
    });
  });
});

describe('Difficulty Levels Configuration', () => {
  it('should have valid configuration for all levels', () => {
    DIFFICULTY_LEVELS.forEach(level => {
      expect(level.id).toBeDefined();
      expect(level.name).toBeDefined();
      expect(level.gridSize).toBeGreaterThan(0);
      expect(level.pairs).toBeGreaterThan(0);
      expect(level.emojis).toHaveLength(level.pairs);
      expect(level.gridSize).toBe(level.pairs * 2);
    });
  });

  it('should have unique emojis for each level', () => {
    DIFFICULTY_LEVELS.forEach(level => {
      const uniqueEmojis = new Set(level.emojis);
      expect(uniqueEmojis.size).toBe(level.emojis.length);
    });
  });

  it('should have unique level IDs', () => {
    const levelIds = DIFFICULTY_LEVELS.map(level => level.id);
    const uniqueIds = new Set(levelIds);
    expect(uniqueIds.size).toBe(levelIds.length);
  });
});

describe('Best Score Logic', () => {
  it('should return true for first score', () => {
    expect(isNewBestScore(10, 'easy', {})).toBe(true);
  });

  it('should return true for better score', () => {
    const bestScores = { easy: { attempts: 15 } };
    expect(isNewBestScore(10, 'easy', bestScores)).toBe(true);
  });

  it('should return false for worse score', () => {
    const bestScores = { easy: { attempts: 8 } };
    expect(isNewBestScore(10, 'easy', bestScores)).toBe(false);
  });

  it('should return false for equal score', () => {
    const bestScores = { easy: { attempts: 10 } };
    expect(isNewBestScore(10, 'easy', bestScores)).toBe(false);
  });
});
