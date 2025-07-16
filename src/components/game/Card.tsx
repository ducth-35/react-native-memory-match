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
    backgroundColor: 'linear-gradient(135deg, #8A2BE2, #9932CC)',
    borderWidth: 3,
    borderColor: '#8A2BE2',
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  cardBackContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cardBackText: {
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  cardBackPattern: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '70%',
  },
  patternDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    margin: 1.5,
  },
  cardFront: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 3,
    borderColor: 'rgba(138, 43, 226, 0.3)',
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  cardMatched: {
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    borderColor: '#8A2BE2',
    borderWidth: 3,
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  emoji: {
    fontWeight: '800',
    textShadowColor: 'rgba(138, 43, 226, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  matchedOverlay: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  matchedIcon: {
    fontSize: 14,
    color: '#8A2BE2',
    textShadowColor: 'rgba(138, 43, 226, 0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
});

export default Card;
