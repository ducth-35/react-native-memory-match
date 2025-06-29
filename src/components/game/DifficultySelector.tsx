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
      ? `Kỷ lục: ${bestScore.attempts} lượt`
      : 'Chưa chơi';
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
      <Text style={styles.title}>Chọn độ khó</Text>
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
                {level.pairs} cặp thẻ
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
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  levelCard: {
    width: 150,
    height: 180,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#E2E8F0',
   
  },
  levelIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  levelName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  levelInfo: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 8,
  },
  bestScore: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default DifficultySelector;
