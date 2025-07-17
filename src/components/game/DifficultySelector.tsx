import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { DifficultyLevel, BestScore } from '../../types/game.types';

interface DifficultySelectorProps {
  levels: DifficultyLevel[];
  selectedLevel: DifficultyLevel;
  bestScores: Record<string, BestScore>;
  onLevelSelect: (level: DifficultyLevel) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  levels,
  selectedLevel,
  bestScores,
  onLevelSelect,
}) => {
  const getBestScoreText = (levelId: string) => {
    const bestScore = bestScores[levelId];
    return bestScore
      ? `Best: ${bestScore.attempts} moves`
      : 'Not played';
  };

  const getDifficultyColor = (levelId: string) => {
    switch (levelId) {
      case 'easy':
        return '#4CAF50';
      case 'medium':
        return '#FF9800';
      case 'hard':
        return '#F44336';
      default:
        return '#2196F3';
    }
  };

  const getDifficultyIcon = (levelId: string) => {
    switch (levelId) {
      case 'easy':
        return '😊';
      case 'medium':
        return '🤔';
      case 'hard':
        return '😤';
      default:
        return '🎮';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Difficulty</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {levels.map((level) => {
          const isSelected = selectedLevel.id === level.id;
          const color = getDifficultyColor(level.id);

          return (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.levelCard,
                isSelected && { borderColor: color, borderWidth: 3 },
                { backgroundColor: isSelected ? `${color}20` : '#FFFFFF' },
              ]}
              onPress={() => onLevelSelect(level)}
              activeOpacity={0.7}
            >
              <Text style={styles.levelIcon}>
                {getDifficultyIcon(level.id)}
              </Text>
              
              <Text style={[styles.levelName, { color }]}>
                {level.name}
              </Text>
              
              <Text style={styles.levelInfo}>
                {level.pairs} pairs
              </Text>
              
              <Text style={[styles.bestScore, { color }]}>
                {getBestScoreText(level.id)}
              </Text>
              
              {isSelected && (
                <View style={[styles.selectedIndicator, { backgroundColor: color }]}>
                  <Text style={styles.selectedText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 25,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(138, 43, 226, 0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 0.5,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  levelCard: {
    width: 160,
    height: 190,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    padding: 20,
    marginHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(138, 43, 226, 0.3)',
  },
  levelIcon: {
    fontSize: 36,
    marginBottom: 12,
    textShadowColor: 'rgba(138, 43, 226, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  levelName: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  levelInfo: {
    fontSize: 13,
    color: '#B8B8D1',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
  },
  bestScore: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    color: '#B8B8D1',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default DifficultySelector;
