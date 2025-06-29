import { Dimensions, PixelRatio } from 'react-native';

// Get device dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Device type detection
export const DeviceType = {
  PHONE: 'phone',
  TABLET_SMALL: 'tablet_small', // 7-8 inch
  TABLET_LARGE: 'tablet_large', // 10+ inch
} as const;

export type DeviceTypeValue = typeof DeviceType[keyof typeof DeviceType];

/**
 * Detect device type based on screen dimensions and pixel density
 */
export const getDeviceType = (): DeviceTypeValue => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = screenWidth * pixelDensity;
  const adjustedHeight = screenHeight * pixelDensity;
  const diagonalSize = Math.sqrt(adjustedWidth * adjustedWidth + adjustedHeight * adjustedHeight) / (pixelDensity * 160);

  // Calculate diagonal size in inches
  if (diagonalSize >= 9.5) {
    return DeviceType.TABLET_LARGE; // 10+ inch tablets
  } else if (diagonalSize >= 6.5) {
    return DeviceType.TABLET_SMALL; // 7-8 inch tablets
  } else {
    return DeviceType.PHONE; // Phones
  }
};

/**
 * Check if device is tablet (any size)
 */
export const isTablet = (): boolean => {
  const deviceType = getDeviceType();
  return deviceType === DeviceType.TABLET_SMALL || deviceType === DeviceType.TABLET_LARGE;
};

/**
 * Check if device is large tablet (10+ inch)
 */
export const isLargeTablet = (): boolean => {
  return getDeviceType() === DeviceType.TABLET_LARGE;
};

/**
 * Get responsive dimensions for game cards
 */
export const getResponsiveCardDimensions = (gridSize: number) => {
  const deviceType = getDeviceType();

  // Base configurations for different device types with grid-specific adjustments
  const getConfig = (gridSize: number) => {
    const baseConfigs = {
      [DeviceType.PHONE]: {
        padding: 40,
        spacing: 8,
        maxCardSize: 90,
        minCardSize: 50,
      },
      [DeviceType.TABLET_SMALL]: {
        padding: 60,
        spacing: 12,
        maxCardSize: 120,
        minCardSize: 70,
      },
      [DeviceType.TABLET_LARGE]: {
        padding: 80,
        spacing: 16,
        maxCardSize: 140,
        minCardSize: 90,
      },
    };

    const config = { ...baseConfigs[deviceType] };

    // Special adjustments for 5x6 grid (30 cards) on tablets
    if (gridSize === 30) {
      if (deviceType === DeviceType.TABLET_LARGE) {
        config.padding = 60; // Reduce padding for more space
        config.spacing = 12;  // Reduce spacing between cards
        config.maxCardSize = 120; // Smaller max size for 6 columns
        config.minCardSize = 80;
      } else if (deviceType === DeviceType.TABLET_SMALL) {
        config.padding = 40;
        config.spacing = 8;
        config.maxCardSize = 100;
        config.minCardSize = 60;
      } else {
        // Phone - make cards even smaller for 6 columns
        config.padding = 20;
        config.spacing = 6;
        config.maxCardSize = 70;
        config.minCardSize = 45;
      }
    }

    return config;
  };

  const config = getConfig(gridSize);

  // Determine columns based on grid size
  let cols = 4;
  if (gridSize === 20) cols = 5;
  else if (gridSize === 30) cols = 6;

  // Calculate card size based on available space
  const availableWidth = screenWidth - config.padding;
  const totalSpacing = (cols - 1) * config.spacing;
  const calculatedSize = (availableWidth - totalSpacing) / cols;

  // Clamp card size between min and max
  const cardSize = Math.max(
    config.minCardSize,
    Math.min(config.maxCardSize, calculatedSize)
  );

  return {
    cardSize,
    spacing: config.spacing,
    padding: config.padding,
    cols,
    deviceType,
    gridSize, // Add gridSize for debugging
  };
};

/**
 * Get responsive font sizes
 */
export const getResponsiveFontSizes = () => {
  const deviceType = getDeviceType();
  
  const fontSizes = {
    [DeviceType.PHONE]: {
      title: 24,
      subtitle: 18,
      body: 16,
      small: 14,
      cardEmoji: 0.45, // Multiplier for card size
      cardBack: 0.3,   // Multiplier for card size
    },
    [DeviceType.TABLET_SMALL]: {
      title: 28,
      subtitle: 22,
      body: 18,
      small: 16,
      cardEmoji: 0.45,
      cardBack: 0.3,
    },
    [DeviceType.TABLET_LARGE]: {
      title: 32,
      subtitle: 24,
      body: 20,
      small: 18,
      cardEmoji: 0.45,
      cardBack: 0.3,
    },
  };

  return fontSizes[deviceType];
};

/**
 * Get responsive spacing values
 */
export const getResponsiveSpacing = () => {
  const deviceType = getDeviceType();
  
  const spacing = {
    [DeviceType.PHONE]: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    [DeviceType.TABLET_SMALL]: {
      xs: 6,
      sm: 12,
      md: 20,
      lg: 28,
      xl: 36,
    },
    [DeviceType.TABLET_LARGE]: {
      xs: 8,
      sm: 16,
      md: 24,
      lg: 32,
      xl: 40,
    },
  };

  return spacing[deviceType];
};

/**
 * Get responsive border radius values
 */
export const getResponsiveBorderRadius = () => {
  const deviceType = getDeviceType();
  
  const borderRadius = {
    [DeviceType.PHONE]: {
      small: 8,
      medium: 12,
      large: 16,
    },
    [DeviceType.TABLET_SMALL]: {
      small: 10,
      medium: 14,
      large: 18,
    },
    [DeviceType.TABLET_LARGE]: {
      small: 12,
      medium: 16,
      large: 20,
    },
  };

  return borderRadius[deviceType];
};

/**
 * Get responsive game board layout
 */
export const getResponsiveGameBoardLayout = (gridSize?: number) => {
  const deviceType = getDeviceType();
  const spacing = getResponsiveSpacing();

  const baseLayout = {
    [DeviceType.PHONE]: {
      containerPadding: spacing.md,
      boardMaxWidth: screenWidth - spacing.lg,
      centerContent: true,
    },
    [DeviceType.TABLET_SMALL]: {
      containerPadding: spacing.lg,
      boardMaxWidth: Math.min(screenWidth - spacing.xl, 600),
      centerContent: true,
    },
    [DeviceType.TABLET_LARGE]: {
      containerPadding: spacing.xl,
      boardMaxWidth: Math.min(screenWidth - spacing.xl * 2, 800),
      centerContent: true,
    },
  };

  const layout = { ...baseLayout[deviceType] };

  // Special adjustments for 5x6 grid (30 cards)
  if (gridSize === 30) {
    if (deviceType === DeviceType.TABLET_LARGE) {
      layout.containerPadding = spacing.lg; // Reduce padding
      layout.boardMaxWidth = Math.min(screenWidth - spacing.lg, 900); // Allow wider board
    } else if (deviceType === DeviceType.TABLET_SMALL) {
      layout.containerPadding = spacing.md;
      layout.boardMaxWidth = Math.min(screenWidth - spacing.lg, 700);
    } else {
      // Phone
      layout.containerPadding = spacing.sm;
      layout.boardMaxWidth = screenWidth - spacing.md;
    }
  }

  return layout;
};

/**
 * Debug info for responsive design
 */
export const getResponsiveDebugInfo = () => {
  const deviceType = getDeviceType();
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = screenWidth * pixelDensity;
  const adjustedHeight = screenHeight * pixelDensity;
  const diagonalSize = Math.sqrt(adjustedWidth * adjustedWidth + adjustedHeight * adjustedHeight) / (pixelDensity * 160);

  return {
    screenWidth,
    screenHeight,
    pixelDensity,
    adjustedWidth,
    adjustedHeight,
    diagonalSize: diagonalSize.toFixed(1),
    deviceType,
    isTablet: isTablet(),
    isLargeTablet: isLargeTablet(),
  };
};
