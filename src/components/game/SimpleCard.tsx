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

const SimpleCard: React.FC<CardProps> = ({ card, onPress, gridSize }) => {
  const handlePress = () => {
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
          <>
            <Text style={[styles.emoji, { fontSize: cardSize * 0.45 }]}>
              {card.emoji}
            </Text>
            {card.isMatched && (
              <View style={styles.matchedOverlay}>
                <Text style={styles.matchedIcon}>✨</Text>
              </View>
            )}
          </>
        ) : (
          <View style={styles.cardBackContent}>
            <Text style={[styles.cardBackText, { fontSize: cardSize * 0.3 }]}>🧠</Text>
            <View style={styles.cardBackPattern}>
              {Array.from({ length: 4 }, (_, i) => (
                <View key={i} style={styles.patternDot} />
              ))}
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
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  cardBack: {
    backgroundColor: '#667eea',
    borderWidth: 3,
    borderColor: '#5a67d8',
  },
  cardBackContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cardBackText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  cardBackPattern: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '60%',
  },
  patternDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    margin: 1,
  },
  cardFront: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  cardMatched: {
    backgroundColor: '#48BB78',
    borderColor: '#38A169',
  },
  emoji: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  matchedOverlay: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchedIcon: {
    fontSize: 12,
  },
});

export default SimpleCard;
