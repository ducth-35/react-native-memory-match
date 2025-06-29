import { Vibration, Platform } from 'react-native';

/**
 * Haptic feedback utilities for Android
 * Sử dụng Vibration API với các pattern khác nhau
 */
export const HapticFeedback = {
  // Light tap feedback - rung nhẹ
  light: () => {
    try {
      if (Platform.OS === 'android') {
        Vibration.vibrate(50); // 50ms rung nhẹ
      }
    } catch (error) {
      console.log('Vibration not available:', error);
    }
  },

  // Medium impact feedback - rung trung bình
  medium: () => {
    try {
      if (Platform.OS === 'android') {
        Vibration.vibrate(100); // 100ms rung trung bình
      }
    } catch (error) {
      console.log('Vibration not available:', error);
    }
  },

  // Heavy impact feedback - rung mạnh
  heavy: () => {
    try {
      if (Platform.OS === 'android') {
        Vibration.vibrate(200); // 200ms rung mạnh
      }
    } catch (error) {
      console.log('Vibration not available:', error);
    }
  },

  // Success feedback - pattern rung thành công
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

  // Error feedback - pattern rung lỗi
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

  // Game complete celebration - pattern rung ăn mừng
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
