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
 * Get responsive dimensions for game cards - SIMPLIFIED & FIXED
 */
export const getResponsiveCardDimensions = (gridSize: number) => {
  // Determine columns based on grid size
  let cols = 4;
  if (gridSize === 20) cols = 5;
  else if (gridSize === 30) cols = 6;

  // Simple but effective responsive calculation
  const calculateResponsiveConfig = () => {
    // Adaptive padding based on screen width
    let padding = 20; // Base padding
    if (screenWidth >= 1200) padding = 60;      // Large tablets
    else if (screenWidth >= 800) padding = 40;  // Medium tablets
    else if (screenWidth >= 600) padding = 30;  // Small tablets

    // Adaptive spacing based on screen width and columns
    let spacing = 6; // Base spacing
    if (screenWidth >= 1200) spacing = 12;      // Large tablets
    else if (screenWidth >= 800) spacing = 10;  // Medium tablets
    else if (screenWidth >= 600) spacing = 8;   // Small tablets

    // For 6 columns (hard mode), reduce spacing to fit better
    if (cols === 6) {
      spacing = Math.max(4, spacing - 2);
      padding = Math.max(16, padding - 10);
    }

    // Calculate available space
    const availableWidth = screenWidth - (padding * 2);
    const totalSpacing = (cols - 1) * spacing;
    const availableForCards = availableWidth - totalSpacing;
    const calculatedCardSize = availableForCards / cols;

    // Set reasonable min/max limits
    const minCardSize = 45;  // Minimum for touch
    const maxCardSize = 140; // Maximum for aesthetics

    // Apply limits
    const finalCardSize = Math.max(
      minCardSize,
      Math.min(maxCardSize, calculatedCardSize)
    );

    return {
      padding,
      spacing,
      cardSize: finalCardSize,
      minCardSize,
      maxCardSize,
      calculatedCardSize,
      availableWidth,
      availableForCards,
    };
  };

  const config = calculateResponsiveConfig();

  // Calculate actual board dimensions
  const actualBoardWidth = config.cardSize * cols + config.spacing * (cols - 1);
  const excessSpace = screenWidth - actualBoardWidth - (config.padding * 2);

  // If there's excess space, increase padding to center the board
  const finalPadding = config.padding + Math.max(0, excessSpace / 2);

  return {
    cardSize: config.cardSize,
    spacing: config.spacing,
    padding: finalPadding,
    cols,
    gridSize,
    // Debug info
    debug: {
      screenWidth,
      availableWidth: config.availableWidth,
      availableForCards: config.availableForCards,
      calculatedCardSize: config.calculatedCardSize,
      minCardSize: config.minCardSize,
      maxCardSize: config.maxCardSize,
      actualBoardWidth,
      excessSpace,
      finalPadding,
    },
  };
};

/**
 * Get responsive font sizes - TRUE RESPONSIVE SYSTEM
 */
export const getResponsiveFontSizes = () => {
  // Base font sizes as percentages of screen width for true responsiveness
  const baseFontPercent = {
    title: 0.045,    // 4.5% of screen width
    subtitle: 0.035, // 3.5% of screen width
    body: 0.028,     // 2.8% of screen width
    small: 0.025,    // 2.5% of screen width
  };

  // Min and max font sizes for readability
  const fontLimits = {
    title: { min: 20, max: 36 },
    subtitle: { min: 16, max: 28 },
    body: { min: 14, max: 22 },
    small: { min: 12, max: 18 },
  };

  // Calculate dynamic font sizes
  const calculateFontSize = (type: keyof typeof baseFontPercent) => {
    const calculated = screenWidth * baseFontPercent[type];
    const limits = fontLimits[type];
    return Math.max(limits.min, Math.min(limits.max, calculated));
  };

  return {
    title: calculateFontSize('title'),
    subtitle: calculateFontSize('subtitle'),
    body: calculateFontSize('body'),
    small: calculateFontSize('small'),
    cardEmoji: 0.45, // Multiplier for card size (remains constant)
    cardBack: 0.3,   // Multiplier for card size (remains constant)
  };
};

/**
 * Get responsive spacing values - TRUE RESPONSIVE SYSTEM
 */
export const getResponsiveSpacing = () => {
  // Base spacing as percentages of screen width
  const baseSpacingPercent = {
    xs: 0.008,  // 0.8% of screen width
    sm: 0.015,  // 1.5% of screen width
    md: 0.025,  // 2.5% of screen width
    lg: 0.04,   // 4% of screen width
    xl: 0.055,  // 5.5% of screen width
  };

  // Min and max spacing values
  const spacingLimits = {
    xs: { min: 4, max: 12 },
    sm: { min: 8, max: 20 },
    md: { min: 12, max: 32 },
    lg: { min: 16, max: 48 },
    xl: { min: 24, max: 64 },
  };

  // Calculate dynamic spacing
  const calculateSpacing = (type: keyof typeof baseSpacingPercent) => {
    const calculated = screenWidth * baseSpacingPercent[type];
    const limits = spacingLimits[type];
    return Math.max(limits.min, Math.min(limits.max, calculated));
  };

  return {
    xs: calculateSpacing('xs'),
    sm: calculateSpacing('sm'),
    md: calculateSpacing('md'),
    lg: calculateSpacing('lg'),
    xl: calculateSpacing('xl'),
  };
};

/**
 * Get responsive border radius values - TRUE RESPONSIVE SYSTEM
 */
export const getResponsiveBorderRadius = () => {
  // Base border radius as percentages of screen width
  const baseBorderRadiusPercent = {
    small: 0.015,  // 1.5% of screen width
    medium: 0.025, // 2.5% of screen width
    large: 0.035,  // 3.5% of screen width
  };

  // Min and max border radius values
  const borderRadiusLimits = {
    small: { min: 6, max: 16 },
    medium: { min: 10, max: 24 },
    large: { min: 14, max: 32 },
  };

  // Calculate dynamic border radius
  const calculateBorderRadius = (type: keyof typeof baseBorderRadiusPercent) => {
    const calculated = screenWidth * baseBorderRadiusPercent[type];
    const limits = borderRadiusLimits[type];
    return Math.max(limits.min, Math.min(limits.max, calculated));
  };

  return {
    small: calculateBorderRadius('small'),
    medium: calculateBorderRadius('medium'),
    large: calculateBorderRadius('large'),
  };
};

/**
 * Get responsive game board layout - TRUE RESPONSIVE SYSTEM
 */
export const getResponsiveGameBoardLayout = (gridSize?: number) => {
  // Get card dimensions to calculate actual board size
  const cardDimensions = gridSize ? getResponsiveCardDimensions(gridSize) : null;

  // Dynamic container padding based on screen size
  const minContainerPadding = 16;
  const maxContainerPadding = 40;
  const containerPaddingPercent = 0.04; // 4% of screen width

  const dynamicContainerPadding = Math.max(
    minContainerPadding,
    Math.min(maxContainerPadding, screenWidth * containerPaddingPercent)
  );

  // Calculate board max width based on actual content needs
  let boardMaxWidth = screenWidth - (dynamicContainerPadding * 2);

  // If we have card dimensions, use actual board width + some margin
  if (cardDimensions) {
    const actualBoardWidth = cardDimensions.cardSize * cardDimensions.cols +
                            cardDimensions.spacing * (cardDimensions.cols - 1);
    const marginPercent = 0.1; // 10% margin around the board
    const desiredWidth = actualBoardWidth * (1 + marginPercent);

    // Use the smaller of calculated width or screen width
    boardMaxWidth = Math.min(desiredWidth, screenWidth - (dynamicContainerPadding * 2));
  }

  return {
    containerPadding: dynamicContainerPadding,
    boardMaxWidth,
    centerContent: true,
    // Debug info
    debug: {
      screenWidth,
      dynamicContainerPadding,
      actualBoardWidth: cardDimensions ?
        cardDimensions.cardSize * cardDimensions.cols + cardDimensions.spacing * (cardDimensions.cols - 1) :
        'N/A',
      cardDimensions: cardDimensions || 'N/A',
    },
  };
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
