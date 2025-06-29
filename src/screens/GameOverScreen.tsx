import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import useGameStore from '../store/useGameStore';
import { isNewBestScore } from '../utils/gameUtils';
import { GameFeedback } from '../utils/feedbackUtils';
import ParticleEffect from '../components/game/ParticleEffect';

interface GameOverScreenProps {
  navigation: any;
}

const { width } = Dimensions.get('window');

const GameOverScreen: React.FC<GameOverScreenProps> = ({ navigation }) => {
  const {
    attempts,
    timeElapsed,
    currentLevel,
    bestScores,
    resetGame,
    initializeGame,
  } = useGameStore();

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.5)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;
  const [showCelebration, setShowCelebration] = React.useState(false);

  const isNewRecord = isNewBestScore(attempts, currentLevel.id, bestScores);
  const previousBest = bestScores[currentLevel.id];

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Show celebration particles after entrance animation
      if (isNewRecord) {
        setShowCelebration(true);
      }
    });
  }, [fadeAnim, scaleAnim, slideAnim, isNewRecord]);

  const handlePlayAgain = () => {
    resetGame();
    navigation.goBack();
  };

  const handleNewGame = () => {
    GameFeedback.buttonPress();
    initializeGame(currentLevel);
    navigation.navigate('GAME_SCREEN');
  };

  const handleBackToMenu = () => {
    GameFeedback.buttonPress();
    navigation.navigate('HOME_SCREEN');
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getResultMessage = () => {
    if (isNewRecord) {
      return previousBest
        ? `🎉 Kỷ lục mới! Cải thiện ${previousBest.attempts - attempts} lượt!`
        : '🎉 Kỷ lục đầu tiên!';
    }
    return '🎊 Chúc mừng!';
  };

  const getResultEmoji = () => {
    if (attempts <= currentLevel.pairs + 2) return '🏆';
    if (attempts <= currentLevel.pairs + 5) return '🥇';
    if (attempts <= currentLevel.pairs + 10) return '🥈';
    return '🥉';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { translateY: slideAnim },
            ],
          },
        ]}
      >
        {/* Result Header */}
        <View style={styles.resultHeader}>
          <Text style={styles.resultEmoji}>{getResultEmoji()}</Text>
          <Text style={styles.resultTitle}>Hoàn thành!</Text>
          <Text style={styles.resultMessage}>{getResultMessage()}</Text>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Kết quả</Text>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Độ khó:</Text>
            <Text style={styles.statValue}>{currentLevel.name}</Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Số lượt:</Text>
            <Text style={[styles.statValue, isNewRecord && styles.newRecord]}>
              {attempts}
            </Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Thời gian:</Text>
            <Text style={styles.statValue}>
              {formatTime(timeElapsed)}
            </Text>
          </View>

          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Kỷ lục cũ:</Text>
            <Text style={styles.statValue}>
              {previousBest ? `${previousBest.attempts} lượt` : '---'}
            </Text>
          </View>
          
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Hiệu quả:</Text>
            <Text style={styles.statValue}>
              {Math.round((currentLevel.pairs / attempts) * 100)}%
            </Text>
          </View>
        </View>

        {/* Performance Rating */}
        <View style={styles.ratingCard}>
          <Text style={styles.ratingTitle}>Đánh giá</Text>
          <Text style={styles.ratingText}>
            {attempts <= currentLevel.pairs + 2 && '🌟 Xuất sắc! Trí nhớ tuyệt vời!'}
            {attempts > currentLevel.pairs + 2 && attempts <= currentLevel.pairs + 5 && '⭐ Rất tốt! Tiếp tục cố gắng!'}
            {attempts > currentLevel.pairs + 5 && attempts <= currentLevel.pairs + 10 && '👍 Tốt! Bạn đang tiến bộ!'}
            {attempts > currentLevel.pairs + 10 && '💪 Cố gắng lên! Luyện tập nhiều hơn!'}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={handleNewGame}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>🎮 Chơi lại</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleBackToMenu}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>🏠 Về menu</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <ParticleEffect
        show={showCelebration}
        onComplete={() => setShowCelebration(false)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  resultEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  resultMessage: {
    fontSize: 16,
    color: '#E74C3C',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 22,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
  },
  statLabel: {
    fontSize: 16,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: 'bold',
  },
  newRecord: {
    color: '#E74C3C',
  },
  ratingCard: {
    backgroundColor: '#E8F4FD',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#34495E',
    textAlign: 'center',
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  primaryButton: {
    backgroundColor: '#3498DB',
  },
  secondaryButton: {
    backgroundColor: '#95A5A6',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GameOverScreen;
