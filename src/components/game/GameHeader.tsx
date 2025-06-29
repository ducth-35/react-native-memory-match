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
          <Text style={styles.buttonText}>← Về menu</Text>
        </TouchableOpacity>

        <View style={styles.centerInfo}>
          <Text style={styles.levelText}>{levelName}</Text>
          <Text style={styles.attemptsText}>Lượt: {attempts}</Text>
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
          {matchedPairs}/{totalPairs} cặp ({progress}%)
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    minWidth: 90,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
  },
  centerInfo: {
    alignItems: 'center',
    flex: 1,
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 4,
  },
  attemptsText: {
    fontSize: 16,
    color: '#718096',
    fontWeight: '500',
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#EDF2F7',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#48BB78',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#4A5568',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 8,
  },
  progressIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  progressIcon: {
    fontSize: 16,
    marginHorizontal: 2,
    opacity: 0.3,
  },
  progressIconCompleted: {
    opacity: 1,
  },
});

export default GameHeader;
