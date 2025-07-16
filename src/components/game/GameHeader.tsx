import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { getGameProgress } from '../../utils/gameUtils';
import Timer from './Timer';

interface GameHeaderProps {
  attempts: number;
  matchedPairs: number;
  totalPairs: number;
  levelName: string;
  isGameComplete: boolean;
  onBackPress: () => void;
  onResetPress: () => void;
  onTimeUpdate: (time: number) => void;
  resetTrigger: number;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  attempts,
  matchedPairs,
  totalPairs,
  levelName,
  isGameComplete,
  onBackPress,
  onResetPress,
  onTimeUpdate,
  resetTrigger,
}) => {
  const progress = getGameProgress(matchedPairs, totalPairs);
  const progressValue = useRef(useSharedValue(0)).current;

  React.useEffect(() => {
    progressValue.value = withTiming(progress, { duration: 500 });
  }, [progress]);

  const progressBarStyle = useAnimatedStyle(() => ({
    width: `${interpolate(progressValue.value, [0, 100], [0, 100])}%`,
  }));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.button} onPress={onBackPress}>
          <Text style={styles.buttonText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.centerInfo}>
          <Text style={styles.levelText}>{levelName}</Text>
          <Text style={styles.attemptsText}>Moves: {attempts}</Text>
          <Timer
            isRunning={!isGameComplete}
            onTimeUpdate={onTimeUpdate}
            resetTrigger={resetTrigger}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={onResetPress}>
          <Text style={styles.buttonText}>🔄 Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View
            style={[
              styles.progressFill,
              progressBarStyle
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {matchedPairs}/{totalPairs} pairs ({progress}%)
        </Text>
        <View style={styles.progressIcons}>
          {Array.from({ length: totalPairs }, (_, i) => (
            <Text key={i} style={[
              styles.progressIcon,
              i < matchedPairs && styles.progressIconCompleted
            ]}>
              {i < matchedPairs ? '🎯' : '⭕'}
            </Text>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(15, 15, 35, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(138, 43, 226, 0.3)',
    elevation: 8,
    shadowColor: '#8A2BE2',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  button: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: 'rgba(138, 43, 226, 0.2)',
    borderRadius: 15,
    minWidth: 95,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.4)',
    elevation: 3,
    shadowColor: '#8A2BE2',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  centerInfo: {
    alignItems: 'center',
    flex: 1,
  },
  levelText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
    textShadowColor: 'rgba(138, 43, 226, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5,
  },
  attemptsText: {
    fontSize: 17,
    color: '#B8B8D1',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  progressBar: {
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(138, 43, 226, 0.3)',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8A2BE2',
    borderRadius: 6,
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  progressText: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  progressIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  progressIcon: {
    fontSize: 18,
    marginHorizontal: 3,
    opacity: 0.4,
  },
  progressIconCompleted: {
    opacity: 1,
    textShadowColor: 'rgba(138, 43, 226, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
});

export default GameHeader;
