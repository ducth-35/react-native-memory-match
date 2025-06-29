import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import { Card as CardType } from '../../types/game.types';

interface CardProps {
  card: CardType;
  onPress: (cardId: string) => void;
  gridSize: number;
}

const { width } = Dimensions.get('window');

const StaticCard: React.FC<CardProps> = ({ card, onPress, gridSize }) => {
  const handlePress = () => {
    console.log('🎯 Card pressed:', card.id, 'isFlipped:', card.isFlipped, 'isMatched:', card.isMatched);
    if (!card.isFlipped && !card.isMatched) {
      onPress(card.id);
    }
  };

  const getCardSize = () => {
    const padding = 40;
    const spacing = 8;
    let cols = 4;
    
    if (gridSize === 20) cols = 5;
    else if (gridSize === 30) cols = 6;
    
    return (width - padding - (cols - 1) * spacing) / cols;
  };

  const cardSize = getCardSize();

  console.log('🃏 Rendering card:', card.id, {
    isFlipped: card.isFlipped,
    isMatched: card.isMatched,
    emoji: card.emoji
  });

  return (
    <TouchableOpacity
      style={[styles.cardContainer, { width: cardSize, height: cardSize }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.card,
          { width: cardSize, height: cardSize },
          card.isFlipped || card.isMatched ? styles.cardFront : styles.cardBack,
          card.isMatched && styles.cardMatched,
        ]}
      >
        {card.isFlipped || card.isMatched ? (
          <View style={styles.cardFrontContent}>
            <Text style={[styles.emoji, { fontSize: cardSize * 0.45 }]}>
              {card.emoji}
            </Text>
            {card.isMatched && (
              <View style={styles.matchedBadge}>
                <Text style={styles.matchedText}>✓</Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.cardBackContent}>
            <Text style={[styles.cardBackText, { fontSize: cardSize * 0.3 }]}>🧠</Text>
            <View style={styles.cardBackPattern}>
              <View style={styles.patternDot} />
              <View style={styles.patternDot} />
              <View style={styles.patternDot} />
              <View style={styles.patternDot} />
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 4,
  },
  card: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  cardBack: {
    backgroundColor: '#4A90E2',
    borderWidth: 2,
    borderColor: '#357ABD',
  },
  cardBackContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cardBackText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  cardBackPattern: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '50%',
  },
  patternDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    margin: 2,
  },
  cardFront: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  cardFrontContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'relative',
  },
  cardMatched: {
    backgroundColor: '#4CAF50',
    borderColor: '#45A049',
  },
  emoji: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  matchedBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  matchedText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});

export default StaticCard;
