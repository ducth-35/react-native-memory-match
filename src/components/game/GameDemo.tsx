import React, { useEffect, useState } from 'react';
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

const GameDemo: React.FC = () => {
  const {
    cards,
    attempts,
    matchedPairs,
    timeElapsed,
    currentLevel,
    isGameComplete,
    isGameStarted,
    bestScores,
    initializeGame,
    flipCard,
    resetGame,
    loadBestScores,
  } = useGameStore();

  const [autoPlay, setAutoPlay] = useState(false);
  const [demoSpeed, setDemoSpeed] = useState(1000);

  useEffect(() => {
    loadBestScores();
  }, [loadBestScores]);

  useEffect(() => {
    if (autoPlay && isGameStarted && !isGameComplete) {
      const timer = setTimeout(() => {
        // Auto flip cards for demo
        const unflippedCards = cards.filter(card => !card.isFlipped && !card.isMatched);
        if (unflippedCards.length > 0) {
          const randomCard = unflippedCards[Math.floor(Math.random() * unflippedCards.length)];
          flipCard(randomCard.id);
        }
      }, demoSpeed);

      return () => clearTimeout(timer);
    }
  }, [autoPlay, isGameStarted, isGameComplete, cards, flipCard, demoSpeed]);

  const startDemo = (levelIndex: number) => {
    const level = DIFFICULTY_LEVELS[levelIndex];
    initializeGame(level);
    setAutoPlay(true);
  };

  const stopDemo = () => {
    setAutoPlay(false);
  };

  const handleManualFlip = (cardId: string) => {
    if (!autoPlay) {
      flipCard(cardId);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceRating = () => {
    if (!isGameComplete) return 'Đang chơi...';
    
    const efficiency = (currentLevel.pairs / attempts) * 100;
    if (efficiency >= 90) return '🌟 Xuất sắc!';
    if (efficiency >= 75) return '⭐ Rất tốt!';
    if (efficiency >= 60) return '👍 Tốt!';
    return '💪 Cần cải thiện!';
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎮 Game Demo & Testing</Text>

      {/* Demo Controls */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Demo Controls</Text>
        
        <View style={styles.buttonRow}>
          {DIFFICULTY_LEVELS.map((level, index) => (
            <TouchableOpacity
              key={level.id}
              style={[styles.button, styles.demoButton]}
              onPress={() => startDemo(index)}
            >
              <Text style={styles.buttonText}>Demo {level.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, autoPlay ? styles.stopButton : styles.startButton]}
            onPress={() => setAutoPlay(!autoPlay)}
          >
            <Text style={styles.buttonText}>
              {autoPlay ? '⏸️ Dừng Auto' : '▶️ Bật Auto'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={resetGame}
          >
            <Text style={styles.buttonText}>🔄 Reset</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.speedControl}>
          <Text style={styles.label}>Tốc độ Demo: {demoSpeed}ms</Text>
          <View style={styles.speedButtons}>
            <TouchableOpacity
              style={styles.speedButton}
              onPress={() => setDemoSpeed(500)}
            >
              <Text style={styles.speedButtonText}>Nhanh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.speedButton}
              onPress={() => setDemoSpeed(1000)}
            >
              <Text style={styles.speedButtonText}>Bình thường</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.speedButton}
              onPress={() => setDemoSpeed(2000)}
            >
              <Text style={styles.speedButtonText}>Chậm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Game Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thống kê Game</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Level</Text>
            <Text style={styles.statValue}>{currentLevel.name}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Lượt</Text>
            <Text style={styles.statValue}>{attempts}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Thời gian</Text>
            <Text style={styles.statValue}>{formatTime(timeElapsed)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Tiến độ</Text>
            <Text style={styles.statValue}>{matchedPairs}/{currentLevel.pairs}</Text>
          </View>
        </View>
        <Text style={styles.performance}>{getPerformanceRating()}</Text>
      </View>

      {/* Best Scores */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Kỷ lục</Text>
        {DIFFICULTY_LEVELS.map(level => {
          const bestScore = bestScores[level.id];
          return (
            <View key={level.id} style={styles.scoreRow}>
              <Text style={styles.scoreLevelName}>{level.name}</Text>
              <Text style={styles.scoreValue}>
                {bestScore 
                  ? `${bestScore.attempts} lượt - ${formatTime(bestScore.timeElapsed)}`
                  : 'Chưa chơi'
                }
              </Text>
            </View>
          );
        })}
      </View>

      {/* Mini Game Board */}
      {isGameStarted && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mini Game Board</Text>
          <View style={styles.miniBoard}>
            {cards.slice(0, 8).map(card => (
              <TouchableOpacity
                key={card.id}
                style={[
                  styles.miniCard,
                  card.isFlipped && styles.miniCardFlipped,
                  card.isMatched && styles.miniCardMatched,
                ]}
                onPress={() => handleManualFlip(card.id)}
              >
                <Text style={styles.miniCardText}>
                  {card.isFlipped || card.isMatched ? card.emoji : '?'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.miniNote}>
            {autoPlay ? 'Auto mode đang chạy...' : 'Chạm để lật thẻ thủ công'}
          </Text>
        </View>
      )}
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  demoButton: {
    backgroundColor: '#007AFF',
  },
  startButton: {
    backgroundColor: '#34C759',
  },
  stopButton: {
    backgroundColor: '#FF3B30',
  },
  resetButton: {
    backgroundColor: '#FF9500',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  speedControl: {
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
  },
  speedButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  speedButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  speedButtonText: {
    fontSize: 12,
    color: '#333',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  performance: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#007AFF',
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  scoreLevelName: {
    fontSize: 14,
    color: '#333',
  },
  scoreValue: {
    fontSize: 14,
    color: '#666',
  },
  miniBoard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 4,
  },
  miniCard: {
    width: 40,
    height: 40,
    backgroundColor: '#007AFF',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniCardFlipped: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  miniCardMatched: {
    backgroundColor: '#34C759',
  },
  miniCardText: {
    fontSize: 16,
    color: 'white',
  },
  miniNote: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
});

export default GameDemo;
