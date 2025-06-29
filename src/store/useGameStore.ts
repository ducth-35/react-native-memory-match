import { create } from 'zustand';
import { GameStore, Card, DifficultyLevel, BestScore, DIFFICULTY_LEVELS } from '../types/game.types';
import {
  generateCards,
  cardsMatch,
  loadBestScores,
  saveBestScores,
  isNewBestScore
} from '../utils/gameUtils';
import { GameFeedback } from '../utils/feedbackUtils';

const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  attempts: 0,
  timeElapsed: 0,
  isGameComplete: false,
  isGameStarted: false,
  currentLevel: DIFFICULTY_LEVELS[0], // Default to easy level
  bestScores: {},

  // Initialize game with selected difficulty level
  initializeGame: (level: DifficultyLevel) => {
    const cards = generateCards(level);
    set({
      cards,
      flippedCards: [],
      matchedPairs: 0,
      attempts: 0,
      timeElapsed: 0,
      isGameComplete: false,
      isGameStarted: true,
      currentLevel: level,
    });
  },

  // Flip a card
  flipCard: (cardId: string) => {
    const state = get();
    
    // Don't allow flipping if game is complete or card is already flipped/matched
    if (state.isGameComplete) return;
    
    const card = state.cards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;
    
    // Don't allow flipping more than 2 cards
    if (state.flippedCards.length >= 2) return;

    const updatedCards = state.cards.map(c =>
      c.id === cardId ? { ...c, isFlipped: true } : c
    );

    const newFlippedCards = [...state.flippedCards, { ...card, isFlipped: true }];

    set({
      cards: updatedCards,
      flippedCards: newFlippedCards,
    });

    // Play card flip feedback
    try {
      GameFeedback.cardFlip();
    } catch (error) {
      console.log('⚠️ GameFeedback cardFlip error:', error);
    }

    // Check for match when 2 cards are flipped
    if (newFlippedCards.length === 2) {
      const [firstCard, secondCard] = newFlippedCards;
      const newAttempts = state.attempts + 1;

      if (cardsMatch(firstCard, secondCard)) {
        console.log('🎯 Cards match!', firstCard.emoji);

        // Cards match - mark them as matched
        const matchedCards = updatedCards.map(c =>
          c.emoji === firstCard.emoji ? { ...c, isMatched: true, isFlipped: true } : c
        );

        const newMatchedPairs = state.matchedPairs + 1;
        const isComplete = newMatchedPairs === state.currentLevel.pairs;

        console.log('📊 Setting matched state:', {
          newMatchedPairs,
          isComplete,
          totalCards: matchedCards.length
        });

        set({
          cards: matchedCards,
          flippedCards: [],
          matchedPairs: newMatchedPairs,
          attempts: newAttempts,
          isGameComplete: isComplete,
        });

        // Play match feedback
        try {
          GameFeedback.cardMatch();
        } catch (error) {
          console.log('⚠️ GameFeedback error:', error);
        }

        // Save best score if game is complete
        if (isComplete) {
          setTimeout(() => {
            try {
              GameFeedback.gameComplete();
            } catch (error) {
              console.log('⚠️ GameFeedback gameComplete error:', error);
            }
          }, 500);

          // Save best score directly without calling store method
          const currentBestScores = get().bestScores;
          const levelId = state.currentLevel.id;

          if (isNewBestScore(newAttempts, levelId, currentBestScores)) {
            const newBestScore: BestScore = {
              attempts: newAttempts,
              timeElapsed: state.timeElapsed,
              date: new Date().toISOString(),
            };

            const updatedBestScores = {
              ...currentBestScores,
              [levelId]: newBestScore,
            };

            set({ bestScores: updatedBestScores });
            saveBestScores(updatedBestScores);
          }
        }
      } else {
        // Cards don't match - flip them back after delay
        set({ attempts: newAttempts });

        // Play no match feedback
        setTimeout(() => {
          try {
            GameFeedback.cardNoMatch();
          } catch (error) {
            console.log('⚠️ GameFeedback cardNoMatch error:', error);
          }
        }, 800);

        setTimeout(() => {
          const currentState = get();
          const resetCards = currentState.cards.map(c =>
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, isFlipped: false }
              : c
          );

          set({
            cards: resetCards,
            flippedCards: [],
          });
        }, 1000);
      }
    }
  },

  // Reset current game
  resetGame: () => {
    const state = get();
    get().initializeGame(state.currentLevel);
  },

  // Set current difficulty level
  setCurrentLevel: (level: DifficultyLevel) => {
    set({ currentLevel: level });
  },

  // Update game time
  updateTime: (time: number) => {
    set({ timeElapsed: time });
  },

  // Load best scores from AsyncStorage
  loadBestScores: async () => {
    const scores = await loadBestScores();
    set({ bestScores: scores });
  },


}));

export default useGameStore;
