import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';

interface ParticleEffectProps {
  show: boolean;
  onComplete?: () => void;
}

const { width, height } = Dimensions.get('window');

const ParticleEffect: React.FC<ParticleEffectProps> = ({ show, onComplete }) => {
  const particles = useRef(
    Array.from({ length: 20 }, () => ({
      x: new Animated.Value(width / 2),
      y: new Animated.Value(height / 2),
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    if (show) {
      // Start particle animation
      const animations = particles.map((particle, index) => {
        const angle = (index / particles.length) * 2 * Math.PI;
        const distance = 100 + Math.random() * 100;
        const targetX = width / 2 + Math.cos(angle) * distance;
        const targetY = height / 2 + Math.sin(angle) * distance;

        return Animated.parallel([
          Animated.timing(particle.opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(particle.scale, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(particle.x, {
            toValue: targetX,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(particle.y, {
            toValue: targetY,
            duration: 1000,
            useNativeDriver: false,
          }),
        ]);
      });

      Animated.stagger(50, animations).start(() => {
        // Fade out particles
        const fadeOutAnimations = particles.map(particle =>
          Animated.parallel([
            Animated.timing(particle.opacity, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(particle.scale, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ])
        );

        Animated.parallel(fadeOutAnimations).start(() => {
          // Reset particles
          particles.forEach(particle => {
            particle.x.setValue(width / 2);
            particle.y.setValue(height / 2);
            particle.opacity.setValue(0);
            particle.scale.setValue(0);
          });
          onComplete?.();
        });
      });
    }
  }, [show, particles, onComplete]);

  if (!show) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((particle, index) => (
        <Animated.View
          key={index}
          style={[
            styles.particle,
            {
              left: particle.x,
              top: particle.y,
              opacity: particle.opacity,
              transform: [{ scale: particle.scale }],
            },
          ]}
        >
          <View style={[styles.particleInner, { backgroundColor: getParticleColor(index) }]} />
        </Animated.View>
      ))}
    </View>
  );
};

const getParticleColor = (index: number): string => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
  return colors[index % colors.length];
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  particle: {
    position: 'absolute',
    width: 8,
    height: 8,
  },
  particleInner: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});

export default ParticleEffect;
