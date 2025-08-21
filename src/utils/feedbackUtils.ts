import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

/**
 * Haptic feedback utilities using react-native-haptic-feedback
 * Provides cross-platform haptic feedback with appropriate feedback types
 */
export const HapticFeedback = {
  // Light tap feedback
  light: () => {
    try {
      ReactNativeHapticFeedback.trigger('impactLight', {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      });
    } catch (error) {
      console.log('Haptic feedback not available:', error);
    }
  },

  // Medium impact feedback
  medium: () => {
    try {
      ReactNativeHapticFeedback.trigger('impactMedium', {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      });
    } catch (error) {
      console.log('Haptic feedback not available:', error);
    }
  },

  // Heavy impact feedback
  heavy: () => {
    try {
      ReactNativeHapticFeedback.trigger('impactHeavy', {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      });
    } catch (error) {
      console.log('Haptic feedback not available:', error);
    }
  },

  // Success feedback pattern
  success: () => {
    try {
      ReactNativeHapticFeedback.trigger('notificationSuccess', {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      });
    } catch (error) {
      console.log('Haptic feedback not available:', error);
    }
  },

  // Error feedback pattern
  error: () => {
    try {
      ReactNativeHapticFeedback.trigger('notificationError', {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      });
    } catch (error) {
      console.log('Haptic feedback not available:', error);
    }
  },

  // Game complete celebration pattern
  celebration: () => {
    try {
      // Use a sequence of haptic feedback for celebration
      ReactNativeHapticFeedback.trigger('notificationSuccess', {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      });
      // Add a slight delay and trigger another success feedback
      setTimeout(() => {
        ReactNativeHapticFeedback.trigger('impactHeavy', {
          enableVibrateFallback: true,
          ignoreAndroidSystemSettings: false,
        });
      }, 200);
    } catch (error) {
      console.log('Haptic feedback not available:', error);
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
