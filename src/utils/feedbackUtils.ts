import { Vibration, Platform } from 'react-native';

/**
 * Haptic feedback utilities for Android
 * Uses Vibration API with different patterns
 */
export const HapticFeedback = {
  // Light tap feedback
  light: () => {
    try {
      if (Platform.OS === 'android') {
        Vibration.vibrate(50); // 50ms light vibration
      }
    } catch (error) {
      console.log('Vibration not available:', error);
    }
  },

  // Medium impact feedback
  medium: () => {
    try {
      if (Platform.OS === 'android') {
        Vibration.vibrate(100); // 100ms medium vibration
      }
    } catch (error) {
      console.log('Vibration not available:', error);
    }
  },

  // Heavy impact feedback
  heavy: () => {
    try {
      if (Platform.OS === 'android') {
        Vibration.vibrate(200); // 200ms heavy vibration
      }
    } catch (error) {
      console.log('Vibration not available:', error);
    }
  },

  // Success feedback pattern
  success: () => {
    try {
      if (Platform.OS === 'android') {
        // Pattern: pause 0ms, vibrate 100ms, pause 50ms, vibrate 100ms
        Vibration.vibrate([0, 100, 50, 100]);
      }
    } catch (error) {
      console.log('Vibration not available:', error);
    }
  },

  // Error feedback pattern
  error: () => {
    try {
      if (Platform.OS === 'android') {
        // Pattern: pause 0ms, vibrate 150ms, pause 100ms, vibrate 150ms, pause 100ms, vibrate 150ms
        Vibration.vibrate([0, 150, 100, 150, 100, 150]);
      }
    } catch (error) {
      console.log('Vibration not available:', error);
    }
  },

  // Game complete celebration pattern
  celebration: () => {
    try {
      if (Platform.OS === 'android') {
        // Complex celebration pattern
        Vibration.vibrate([0, 200, 100, 200, 100, 200, 100, 400]);
      }
    } catch (error) {
      console.log('Vibration not available:', error);
    }
  },
};

/**
 * Sound effects using Web Audio API (for basic sounds)
 */
export const SoundEffects = {
  // Card flip sound (simulated)
  cardFlip: () => {
    // In a real app, you would play an actual sound file
    console.log('🔊 Card flip sound');
  },

  // Match found sound
  match: () => {
    console.log('🔊 Match found sound');
  },

  // No match sound
  noMatch: () => {
    console.log('🔊 No match sound');
  },

  // Game complete sound
  gameComplete: () => {
    console.log('🔊 Game complete sound');
  },

  // Button press sound
  buttonPress: () => {
    console.log('🔊 Button press sound');
  },
};

/**
 * Combined feedback for different game events
 */
export const GameFeedback = {
  cardFlip: () => {
    HapticFeedback.light();
    SoundEffects.cardFlip();
  },

  cardMatch: () => {
    HapticFeedback.success();
    SoundEffects.match();
  },

  cardNoMatch: () => {
    HapticFeedback.error();
    SoundEffects.noMatch();
  },

  gameComplete: () => {
    HapticFeedback.celebration();
    SoundEffects.gameComplete();
  },

  buttonPress: () => {
    HapticFeedback.light();
    SoundEffects.buttonPress();
  },
};
