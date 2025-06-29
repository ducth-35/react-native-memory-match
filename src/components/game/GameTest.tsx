import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import useGameStore from '../../store/useGameStore';
import { DIFFICULTY_LEVELS } from '../../types/game.types';

const GameTest: React.FC = () => {
  const {
    cards,
    attempts,
    matchedPairs,
    currentLevel,
    isGameComplete,
    initializeGame,
    flipCard,
    resetGame,
    loadBestScores,
    bestScores,
  } = useGameStore();

  useEffect(() => {
    loadBestScores();
    initializeGame(DIFFICULTY_LEVELS[0]); // Start with easy level
  }, []);

  const handleCardPress = (cardId: string) => {
    flipCard(cardId);
  };

  const handleReset = () => {
    resetGame();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Match Game Test</Text>
      
      <View style={styles.stats}>
        <Text>Level: {currentLevel.name}</Text>
        <Text>Attempts: {attempts}</Text>
        <Text>Matched: {matchedPairs}/{currentLevel.pairs}</Text>
        <Text>Complete: {isGameComplete ? 'Yes' : 'No'}</Text>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset Game</Text>
      </TouchableOpacity>

      <View style={styles.grid}>
        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={[
              styles.card,
              card.isFlipped && styles.flipped,
              card.isMatched && styles.matched,
            ]}
            onPress={() => handleCardPress(card.id)}
          >
            <Text style={styles.cardText}>
              {card.isFlipped || card.isMatched ? card.emoji : '?'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.bestScores}>
        <Text style={styles.scoresTitle}>Best Scores:</Text>
        {Object.entries(bestScores).map(([levelId, score]) => (
          <Text key={levelId}>
            {levelId}: {score.attempts} attempts
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  stats: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  card: {
    width: 60,
    height: 60,
    backgroundColor: '#007AFF',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  flipped: {
    backgroundColor: 'white',
  },
  matched: {
    backgroundColor: '#34C759',
  },
  cardText: {
    fontSize: 24,
    color: 'white',
  },
  bestScores: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  scoresTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default GameTest;
