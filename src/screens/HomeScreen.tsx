import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { DIFFICULTY_LEVELS } from '../types/game.types';
import DifficultySelector from '../components/game/DifficultySelector';
import useGameStore from '../store/useGameStore';
import { GameFeedback } from '../utils/feedbackUtils';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
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
    opacity.value = withTiming(1, { duration: 1000 });
    translateY.value = withTiming(0, { duration: 800 });
  }, []); // Remove loadBestScores from dependencies

  const handleStartGame = () => {
    GameFeedback.buttonPress();
    initializeGame(currentLevel);
    navigation.navigate('GAME_SCREEN');
  };

  const handleLevelSelect = (level: typeof DIFFICULTY_LEVELS[0]) => {
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
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
     <ScrollView>
       <Animated.View
        style={[
          styles.content,
          animatedStyle,
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.gameTitle}>🧠</Text>
          <Text style={styles.gameName}>MatchMind</Text>
          <Text style={styles.gameSubtitle}>Lật Thẻ Ghi Nhớ</Text>
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
          activeOpacity={0.8}
        >
          <Text style={styles.startButtonText}>🎮 Bắt đầu chơi</Text>
        </TouchableOpacity>

        {/* Best Scores Summary */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Thống kê</Text>
          <View style={styles.statsGrid}>
            {DIFFICULTY_LEVELS.map((level) => {
              const bestScore = bestScores[level.id];
              return (
                <View key={level.id} style={styles.statItem}>
                  <Text style={styles.statLevel}>{level.name}</Text>
                  <Text style={styles.statScore}>
                    {bestScore && bestScore.attempts ? `${bestScore.attempts} lượt` : '---'}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Game Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Cách chơi:</Text>
          <Text style={styles.infoText}>
            • Lật 2 thẻ để tìm cặp giống nhau{'\n'}• Ghi nhớ vị trí các thẻ đã lật{'\n'}• Hoàn thành với ít lượt nhất để đạt kỷ lục
          </Text>

          <TouchableOpacity
            style={styles.aboutButton}
            onPress={handleAboutPress}
            activeOpacity={0.8}
          >
            <Text style={styles.aboutButtonText}>ℹ️ Về ứng dụng</Text>
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
    backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  gameTitle: {
    fontSize: 64,
    marginBottom: 8,
  },
  gameName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  gameSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginHorizontal: 40,
    marginVertical: 20,

  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginVertical: 20,
    
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 16,
    textAlign: 'center',
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
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 4,
    textAlign: 'center',
  },
  statScore: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  infoContainer: {
    backgroundColor: '#E8F4FD',
    borderRadius: 12,
    padding: 16,
    marginTop: 'auto',
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#34495E',
    lineHeight: 20,
    marginBottom: 16,
  },
  aboutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  aboutButtonText: {
    color: '#2C3E50',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HomeScreen;
