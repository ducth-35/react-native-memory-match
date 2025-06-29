import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card, DifficultyLevel, BestScore } from '../types/game.types';
import { shuffleArray } from './pureFunctions';

const BEST_SCORES_KEY = 'memory_match_best_scores';

/**
 * Generate card pairs for the game
 */
export const generateCards = (level: DifficultyLevel): Card[] => {
  console.log('🎮 Generating cards for level:', level.name);
  console.log('🎮 Level pairs needed:', level.pairs);
  console.log('🎮 Available emojis:', level.emojis?.length || 0);

  const emojis = level.emojis.slice(0, level.pairs);
  const cardPairs: Card[] = [];

  // Create pairs of cards
  emojis.forEach((emoji, index) => {
    // First card of the pair
    cardPairs.push({
      id: `${emoji}_1_${index}`,
      emoji,
      isFlipped: false,
      isMatched: false,
    });
    
    // Second card of the pair
    cardPairs.push({
      id: `${emoji}_2_${index}`,
      emoji,
      isFlipped: false,
      isMatched: false,
    });
  });

  console.log('✅ Generated', cardPairs.length, 'cards');

  // Shuffle the cards
  const shuffledCards = shuffleArray(cardPairs);
  console.log('✅ Cards shuffled successfully');

  return shuffledCards;
};

// Re-export from pureFunctions
export { cardsMatch, getGridDimensions, getGameProgress, isNewBestScore } from './pureFunctions';

/**
 * Load best scores from AsyncStorage
 */
export const loadBestScores = async (): Promise<Record<string, BestScore>> => {
  try {
    const scoresJson = await AsyncStorage.getItem(BEST_SCORES_KEY);
    if (scoresJson) {
      return JSON.parse(scoresJson);
    }
    return {};
  } catch (error) {
    console.error('Error loading best scores:', error);
    return {};
  }
};

/**
 * Save best scores to AsyncStorage
 */
export const saveBestScores = async (scores: Record<string, BestScore>): Promise<void> => {
  try {
    await AsyncStorage.setItem(BEST_SCORES_KEY, JSON.stringify(scores));
  } catch (error) {
    console.error('Error saving best scores:', error);
  }
};


