import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  ScrollView,
} from 'react-native';
import useGameStore from '../store/useGameStore';
import { isNewBestScore } from '../utils/gameUtils';
import { GameFeedback } from '../utils/feedbackUtils';
import ParticleEffect from '../components/game/ParticleEffect';
import {
  getResponsiveFontSizes,
  getResponsiveSpacing,
  getResponsiveBorderRadius,
  getResponsiveGameBoardLayout
} from '../utils/responsiveUtils';

interface GameOverScreenProps {
  navigation: any;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ navigation }) => {
  const {
    attempts,
    timeElapsed,
    currentLevel,
    bestScores,
    resetGame,
    initializeGame,
  } = useGameStore();

  // Get responsive values
  const fontSizes = getResponsiveFontSizes();
  const spacing = getResponsiveSpacing();
  const borderRadius = getResponsiveBorderRadius();
  const layout = getResponsiveGameBoardLayout();

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
        ? `🎉 New Record! Improved by ${previousBest.attempts - attempts} moves!`
        : '🎉 First Record!';
    }
    return '🎊 Congratulations!';
  };

  const getResultEmoji = () => {
    if (attempts <= currentLevel.pairs + 2) return '🏆';
    if (attempts <= currentLevel.pairs + 5) return '🥇';
    if (attempts <= currentLevel.pairs + 10) return '🥈';
    return '🥉';
  };

  // Dynamic styles for responsive design
  const dynamicStyles = {
    content: {
      paddingHorizontal: layout.containerPadding,
      maxWidth: layout.boardMaxWidth,
    },
    resultTitle: {
      fontSize: fontSizes.title,
    },
    resultMessage: {
      fontSize: fontSizes.subtitle,
    },
    statsTitle: {
      fontSize: fontSizes.subtitle,
    },
    statLabel: {
      fontSize: fontSizes.body,
    },
    statValue: {
      fontSize: fontSizes.body,
    },
    button: {
      borderRadius: borderRadius.medium,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
    },
    buttonText: {
      fontSize: fontSizes.body,
    },
  };

  return (
    <SafeAreaView style={styles.container}>
     <ScrollView>
       <StatusBar barStyle="light-content" backgroundColor="#0F0F23" />

      <Animated.View
        style={[
          styles.content,
          dynamicStyles.content,
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
          <Text style={[styles.resultTitle, dynamicStyles.resultTitle]}>Complete!</Text>
          <Text style={[styles.resultMessage, dynamicStyles.resultMessage]}>{getResultMessage()}</Text>
        </View>

        {/* Stats Card */}
        <View style={styles.statsCard}>
          <Text style={[styles.statsTitle, dynamicStyles.statsTitle]}>Results</Text>

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, dynamicStyles.statLabel]}>Difficulty:</Text>
            <Text style={[styles.statValue, dynamicStyles.statValue]}>{currentLevel.name}</Text>
          </View>

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, dynamicStyles.statLabel]}>Moves:</Text>
            <Text style={[styles.statValue, dynamicStyles.statValue, isNewRecord && styles.newRecord]}>
              {attempts}
            </Text>
          </View>

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, dynamicStyles.statLabel]}>Time:</Text>
            <Text style={[styles.statValue, dynamicStyles.statValue]}>
              {formatTime(timeElapsed)}
            </Text>
          </View>

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, dynamicStyles.statLabel]}>Previous Best:</Text>
            <Text style={[styles.statValue, dynamicStyles.statValue]}>
              {previousBest ? `${previousBest.attempts} moves` : '---'}
            </Text>
          </View>

          <View style={styles.statRow}>
            <Text style={[styles.statLabel, dynamicStyles.statLabel]}>Efficiency:</Text>
            <Text style={[styles.statValue, dynamicStyles.statValue]}>
              {Math.round((currentLevel.pairs / attempts) * 100)}%
            </Text>
          </View>
        </View>

        {/* Performance Rating */}
        <View style={styles.ratingCard}>
          <Text style={[styles.ratingTitle, dynamicStyles.statsTitle]}>Rating</Text>
          <Text style={[styles.ratingText, dynamicStyles.statValue]}>
            {attempts <= currentLevel.pairs + 2 && '🌟 Excellent! Amazing memory!'}
            {attempts > currentLevel.pairs + 2 && attempts <= currentLevel.pairs + 5 && '⭐ Very good! Keep it up!'}
            {attempts > currentLevel.pairs + 5 && attempts <= currentLevel.pairs + 10 && '👍 Good! You\'re improving!'}
            {attempts > currentLevel.pairs + 10 && '💪 Keep trying! Practice more!'}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton, dynamicStyles.button]}
            onPress={handleNewGame}
            activeOpacity={0.8}
          >
            <Text style={[styles.primaryButtonText, dynamicStyles.buttonText]}>🎮 Play Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton, dynamicStyles.button]}
            onPress={handleBackToMenu}
            activeOpacity={0.8}
          >
            <Text style={[styles.secondaryButtonText, dynamicStyles.buttonText]}>Back to Menu</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <ParticleEffect
        show={showCelebration}
        onComplete={() => setShowCelebration(false)}
      />
     </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 35,
  },
  resultEmoji: {
    fontSize: 72,
    marginBottom: 20,
    textShadowColor: 'rgba(138, 43, 226, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  resultTitle: {
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    textShadowColor: 'rgba(138, 43, 226, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 1,
  },
  resultMessage: {
    color: '#8A2BE2',
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: 26,
    letterSpacing: 0.5,
  },
  statsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 28,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.3)',
  },
  statsTitle: {
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 24,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(138, 43, 226, 0.2)',
  },
  statLabel: {
    color: '#B8B8D1',
    fontWeight: '600',
  },
  statValue: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  newRecord: {
    color: '#8A2BE2',
    textShadowColor: 'rgba(138, 43, 226, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  ratingCard: {
    backgroundColor: 'rgba(138, 43, 226, 0.15)',
    borderRadius: 18,
    padding: 24,
    marginBottom: 35,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.4)',
  },
  ratingTitle: {
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  ratingText: {
    color: '#B8B8D1',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '600',
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#8A2BE2',
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.8)',
  },
  secondaryButton: {
    backgroundColor: 'rgba(138, 43, 226, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.5)',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default GameOverScreen;
