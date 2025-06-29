import React, { useEffect, useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { Card as CardType } from '../../types/game.types';

interface CardProps {
  card: CardType;
  onPress: (cardId: string) => void;
  gridSize: number;
}

const { width } = Dimensions.get('window');

const Card: React.FC<CardProps> = ({ card, onPress, gridSize }) => {
  // Use useRef to prevent re-creation of shared values on every render
  const flipRotation = useRef(useSharedValue(0)).current;
  const scale = useRef(useSharedValue(1)).current;
  const pulseScale = useRef(useSharedValue(1)).current;

  useEffect(() => {
    flipRotation.value = withTiming(card.isFlipped || card.isMatched ? 180 : 0, {
      duration: 600,
    });
  }, [card.isFlipped, card.isMatched]);

  useEffect(() => {
    if (card.isMatched) {
      // Pulse animation for matched cards
      pulseScale.value = withSpring(1.1, { damping: 10 }, () => {
        pulseScale.value = withSpring(1, { damping: 10 });
      });
    }
  }, [card.isMatched]);

  const handlePress = () => {
    if (!card.isFlipped && !card.isMatched) {
      // Scale animation on press
      scale.value = withSpring(0.95, { damping: 15 }, () => {
        scale.value = withSpring(1, { damping: 15 });
      });

      onPress(card.id);
    }
  };

  const getCardSize = () => {
    const padding = 40;
    const spacing = 8;
    let cols = 4;
    
    if (gridSize === 20) cols = 5;
    if (gridSize === 30) cols = 6;
    
    return (width - padding - (cols - 1) * spacing) / cols;
  };

  const cardSize = getCardSize();

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipRotation.value, [0, 180], [0, 180]);
    return {
      transform: [
        { rotateY: `${rotateY}deg` },
        { scale: scale.value },
      ],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipRotation.value, [0, 180], [180, 360]);
    return {
      transform: [
        { rotateY: `${rotateY}deg` },
        { scale: scale.value * pulseScale.value },
      ],
    };
  });

  return (
    <TouchableOpacity
      style={[styles.cardContainer, { width: cardSize, height: cardSize }]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      {/* Back of card (hidden state) */}
      <Animated.View
        style={[
          styles.card,
          styles.cardBack,
          frontAnimatedStyle,
          { width: cardSize, height: cardSize },
        ]}
      >
        <View style={styles.cardBackContent}>
          <Text style={[styles.cardBackText, { fontSize: cardSize * 0.3 }]}>🧠</Text>
          <View style={styles.cardBackPattern}>
            {Array.from({ length: 4 }, (_, i) => (
              <View key={i} style={styles.patternDot} />
            ))}
          </View>
        </View>
      </Animated.View>

      {/* Front of card (revealed state) */}
      <Animated.View
        style={[
          styles.card,
          styles.cardFront,
          backAnimatedStyle,
          { width: cardSize, height: cardSize },
          card.isMatched && styles.cardMatched,
        ]}
      >
        <Text style={[styles.emoji, { fontSize: cardSize * 0.45 }]}>
          {card.emoji}
        </Text>
        {card.isMatched && (
          <View style={styles.matchedOverlay}>
            <Text style={styles.matchedIcon}>✨</Text>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 4,
  },
  card: {
    position: 'absolute',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',

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
    borderWidth: 3,
    borderColor: '#E2E8F0',
  },
  cardMatched: {
    backgroundColor: '#F0FFF4',
    borderColor: '#48BB78',
    borderWidth: 3,
  },
  emoji: {
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  matchedOverlay: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
  matchedIcon: {
    fontSize: 12,
    color: '#48BB78',
  },
});

export default Card;
