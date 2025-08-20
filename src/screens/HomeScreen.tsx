import React, {useEffect, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import DifficultySelector from '../components/game/DifficultySelector';
import useGameStore from '../store/useGameStore';
import {DIFFICULTY_LEVELS} from '../types/game.types';
import {GameFeedback} from '../utils/feedbackUtils';
import {SafeAreaView} from 'react-native-safe-area-context';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {
    currentLevel,
    bestScores,
    setCurrentLevel,
    initializeGame,
    loadBestScores,
  } = useGameStore();

  const opacity = useRef(useSharedValue(0)).current;
  const translateY = useRef(useSharedValue(50)).current;

  useEffect(() => {
    loadBestScores();

    // Entrance animation
    opacity.value = withTiming(1, {duration: 1000});
    translateY.value = withTiming(0, {duration: 800});
  }, []); // Remove loadBestScores from dependencies

  const handleStartGame = () => {
    GameFeedback.buttonPress();
    initializeGame(currentLevel);
    navigation.navigate('GAME_SCREEN');
  };

  const handleLevelSelect = (level: (typeof DIFFICULTY_LEVELS)[0]) => {
    GameFeedback.buttonPress();
    setCurrentLevel(level);
  };

  const handleAboutPress = () => {
    GameFeedback.buttonPress();
    navigation.navigate('ABOUT_SCREEN');
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{translateY: translateY.value}],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Animated.View style={[styles.content, animatedStyle]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.gameName}>MatchMind</Text>
            <Text style={styles.gameSubtitle}>Memory Card Mini Game</Text>
          </View>

          {/* Difficulty Selector */}
          <DifficultySelector
            levels={DIFFICULTY_LEVELS}
            selectedLevel={currentLevel}
            bestScores={bestScores}
            onLevelSelect={handleLevelSelect}
          />

          {/* Start Game Button */}
          <TouchableOpacity
            style={styles.startButton}
            onPress={handleStartGame}
            activeOpacity={0.8}>
            <Text style={styles.startButtonText}>Start Game</Text>
          </TouchableOpacity>

          {/* Best Scores Summary */}
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Statistics</Text>
            <View style={styles.statsGrid}>
              {DIFFICULTY_LEVELS.map(level => {
                const bestScore = bestScores[level.id];
                return (
                  <View key={level.id} style={styles.statItem}>
                    <Text style={styles.statLevel}>{level.name}</Text>
                    <Text style={styles.statScore}>
                      {bestScore && bestScore.attempts
                        ? `${bestScore.attempts} moves`
                        : '---'}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Game Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>How to play:</Text>
            <Text style={styles.infoText}>
              • Flip 2 cards to find matching pairs{'\n'}• Remember the
              positions of flipped cards{'\n'}• Complete with fewest moves to
              set a record
            </Text>

            <TouchableOpacity
              style={styles.aboutButton}
              onPress={handleAboutPress}
              activeOpacity={0.8}>
              <Text style={styles.aboutButtonText}>About App</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
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
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
    paddingVertical: 20,
  },
  gameTitle: {
    fontSize: 72,
    marginBottom: 12,
    textShadowColor: 'rgba(138, 43, 226, 0.5)',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 20,
  },
  gameName: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(138, 43, 226, 0.8)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 8,
    letterSpacing: 1,
  },
  gameSubtitle: {
    fontSize: 18,
    color: '#B8B8D1',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  startButton: {
    backgroundColor: '#9932CC',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginHorizontal: 30,
    marginVertical: 25,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
  statsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 24,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.3)',
    // shadowColor: '#8A2BE2',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.2,
    // shadowRadius: 10,
    // elevation: 5,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 18,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLevel: {
    fontSize: 13,
    color: '#B8B8D1',
    marginBottom: 6,
    textAlign: 'center',
    fontWeight: '600',
  },
  statScore: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  infoContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 20,
    padding: 24,
    marginVertical: 15,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.2)',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  infoText: {
    fontSize: 15,
    color: '#B8B8D1',
    lineHeight: 24,
    marginBottom: 20,
    fontWeight: '500',
  },
  aboutButton: {
    backgroundColor: 'rgba(138, 43, 226, 0.3)',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.5)',
  },
  aboutButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default HomeScreen;
