import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import useGameStore from '../../store/useGameStore';
import { DIFFICULTY_LEVELS } from '../../types/game.types';

const StoreTest: React.FC = () => {
  const {
    cards,
    attempts,
    matchedPairs,
    currentLevel,
    isGameComplete,
    isGameStarted,
    bestScores,
    initializeGame,
    flipCard,
    resetGame,
    loadBestScores,
  } = useGameStore();

  useEffect(() => {
    console.log('🧪 StoreTest mounted');
    loadBestScores();
  }, []);

  const handleInitGame = () => {
    console.log('🎮 Initializing game...');
    try {
      initializeGame(DIFFICULTY_LEVELS[0]);
      console.log('✅ Game initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing game:', error);
    }
  };

  const handleFlipCard = () => {
    if (cards.length > 0) {
      const firstCard = cards.find(c => !c.isFlipped && !c.isMatched);
      if (firstCard) {
        console.log('🎯 Flipping card:', firstCard.id);
        try {
          flipCard(firstCard.id);
          console.log('✅ Card flipped successfully');
        } catch (error) {
          console.error('❌ Error flipping card:', error);
        }
      }
    }
  };

  const handleReset = () => {
    console.log('🔄 Resetting game...');
    try {
      resetGame();
      console.log('✅ Game reset successfully');
    } catch (error) {
      console.error('❌ Error resetting game:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🧪 Store Test</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Game State</Text>
        <Text style={styles.info}>Started: {isGameStarted ? 'Yes' : 'No'}</Text>
        <Text style={styles.info}>Complete: {isGameComplete ? 'Yes' : 'No'}</Text>
        <Text style={styles.info}>Level: {currentLevel.name}</Text>
        <Text style={styles.info}>Attempts: {attempts}</Text>
        <Text style={styles.info}>Matched: {matchedPairs}/{currentLevel.pairs}</Text>
        <Text style={styles.info}>Cards: {cards.length}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Controls</Text>
        
        <TouchableOpacity style={styles.button} onPress={handleInitGame}>
          <Text style={styles.buttonText}>🎮 Initialize Game</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleFlipCard}>
          <Text style={styles.buttonText}>🎯 Flip First Card</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>🔄 Reset Game</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Best Scores</Text>
        {Object.keys(bestScores).length > 0 ? (
          Object.entries(bestScores).map(([levelId, score]) => (
            <Text key={levelId} style={styles.info}>
              {levelId}: {score.attempts} attempts
            </Text>
          ))
        ) : (
          <Text style={styles.info}>No best scores yet</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cards (First 6)</Text>
        {cards.slice(0, 6).map((card) => (
          <View key={card.id} style={styles.cardInfo}>
            <Text style={styles.cardText}>
              {card.emoji} - {card.isFlipped ? 'Flipped' : 'Hidden'} 
              {card.isMatched ? ' (Matched)' : ''}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Debug Info</Text>
        <Text style={styles.debugText}>
          Check console for detailed logs
        </Text>
        <Text style={styles.debugText}>
          Store should not cause infinite loops
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  info: {
    fontSize: 14,
    marginBottom: 4,
    color: '#666',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cardInfo: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  cardText: {
    fontSize: 12,
    color: '#333',
  },
  debugText: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'monospace',
    marginBottom: 2,
  },
});

export default StoreTest;
