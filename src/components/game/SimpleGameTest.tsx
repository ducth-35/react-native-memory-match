import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import useGameStore from '../../store/useGameStore';
import { DIFFICULTY_LEVELS } from '../../types/game.types';

const SimpleGameTest: React.FC = () => {
  const {
    cards,
    attempts,
    matchedPairs,
    currentLevel,
    isGameComplete,
    isGameStarted,
    initializeGame,
    flipCard,
    resetGame,
    loadBestScores,
  } = useGameStore();

  useEffect(() => {
    console.log('🎮 SimpleGameTest mounted');
    loadBestScores();
  }, [loadBestScores]);

  const handleStartGame = () => {
    console.log('🎮 Starting game with level:', DIFFICULTY_LEVELS[0]);
    try {
      initializeGame(DIFFICULTY_LEVELS[0]);
      console.log('✅ Game initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing game:', error);
      Alert.alert('Error', 'Failed to initialize game: ' + error);
    }
  };

  const handleCardPress = (cardId: string) => {
    console.log('🎯 Card pressed:', cardId);
    try {
      flipCard(cardId);
      console.log('✅ Card flipped successfully');
    } catch (error) {
      console.error('❌ Error flipping card:', error);
      Alert.alert('Error', 'Failed to flip card: ' + error);
    }
  };

  const handleReset = () => {
    console.log('🔄 Resetting game');
    try {
      resetGame();
      console.log('✅ Game reset successfully');
    } catch (error) {
      console.error('❌ Error resetting game:', error);
      Alert.alert('Error', 'Failed to reset game: ' + error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🧪 Simple Game Test</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Game Status</Text>
        <Text style={styles.info}>Started: {isGameStarted ? 'Yes' : 'No'}</Text>
        <Text style={styles.info}>Complete: {isGameComplete ? 'Yes' : 'No'}</Text>
        <Text style={styles.info}>Level: {currentLevel.name}</Text>
        <Text style={styles.info}>Attempts: {attempts}</Text>
        <Text style={styles.info}>Matched: {matchedPairs}/{currentLevel.pairs}</Text>
        <Text style={styles.info}>Cards: {cards.length}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Controls</Text>
        
        <TouchableOpacity style={styles.button} onPress={handleStartGame}>
          <Text style={styles.buttonText}>🎮 Start Game</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>🔄 Reset Game</Text>
        </TouchableOpacity>
      </View>

      {isGameStarted && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Board (First 8 cards)</Text>
          <View style={styles.miniBoard}>
            {cards.slice(0, 8).map((card) => (
              <TouchableOpacity
                key={card.id}
                style={[
                  styles.miniCard,
                  card.isFlipped && styles.miniCardFlipped,
                  card.isMatched && styles.miniCardMatched,
                ]}
                onPress={() => handleCardPress(card.id)}
              >
                <Text style={styles.miniCardText}>
                  {card.isFlipped || card.isMatched ? card.emoji : '?'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.note}>
            Tap cards to flip them. Only showing first 8 cards for testing.
          </Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Debug Info</Text>
        <Text style={styles.debugText}>
          Check console for detailed logs
        </Text>
        <Text style={styles.debugText}>
          Cards array length: {cards.length}
        </Text>
        <Text style={styles.debugText}>
          Expected cards: {currentLevel.gridSize}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  miniBoard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  miniCard: {
    width: 60,
    height: 60,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniCardFlipped: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  miniCardMatched: {
    backgroundColor: '#34C759',
  },
  miniCardText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  note: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  debugText: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'monospace',
    marginBottom: 2,
  },
});

export default SimpleGameTest;
