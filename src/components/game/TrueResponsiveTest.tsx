import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  getResponsiveDebugInfo,
  getResponsiveCardDimensions,
  getResponsiveFontSizes,
  getResponsiveSpacing,
  getResponsiveBorderRadius,
  getResponsiveGameBoardLayout,
} from '../../utils/responsiveUtils';

const TrueResponsiveTest: React.FC = () => {
  const debugInfo = getResponsiveDebugInfo();
  const fontSizes = getResponsiveFontSizes();
  const spacing = getResponsiveSpacing();
  const borderRadius = getResponsiveBorderRadius();

  // Test all grid sizes
  const gridSizes = [16, 20, 30];
  const gridTests = gridSizes.map(size => {
    const cardDimensions = getResponsiveCardDimensions(size);
    const layout = getResponsiveGameBoardLayout(size);
    
    return {
      gridSize: size,
      name: size === 16 ? '4x4 Easy' : size === 20 ? '4x5 Medium' : '5x6 Hard',
      cardDimensions,
      layout,
      // Calculate if it fits
      totalBoardWidth: cardDimensions.cardSize * cardDimensions.cols + 
                      cardDimensions.spacing * (cardDimensions.cols - 1),
      fits: (cardDimensions.cardSize * cardDimensions.cols + 
             cardDimensions.spacing * (cardDimensions.cols - 1)) <= layout.boardMaxWidth,
    };
  });

  // Simulate different screen sizes for comparison
  const simulateScreenSize = (width: number, height: number, name: string) => {
    // This is just for display - we can't actually change screen dimensions
    const ratio = width / debugInfo.screenWidth;
    return {
      name,
      width,
      height,
      // Simulate what card sizes would be
      estimatedCardSize16: Math.round((width * 0.08 * 4 - 3 * (width * 0.015)) / 4),
      estimatedCardSize30: Math.round((width * 0.08 * 6 - 5 * (width * 0.015)) / 6),
    };
  };

  const screenSizes = [
    simulateScreenSize(768, 1024, '7" Tablet (Portrait)'),
    simulateScreenSize(1024, 768, '7" Tablet (Landscape)'),
    simulateScreenSize(1200, 800, '10" Tablet (Landscape)'),
    simulateScreenSize(800, 1280, '10" Tablet (Portrait)'),
    simulateScreenSize(360, 640, 'Phone (Portrait)'),
    simulateScreenSize(640, 360, 'Phone (Landscape)'),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { fontSize: fontSizes.title }]}>
            🎯 True Responsive System
          </Text>
          <Text style={[styles.subtitle, { fontSize: fontSizes.subtitle }]}>
            Dynamic Calculations for All Screen Sizes
          </Text>
        </View>

        {/* Current Device Info */}
        <View style={[styles.section, { padding: spacing.md, borderRadius: borderRadius.medium }]}>
          <Text style={[styles.sectionTitle, { fontSize: fontSizes.subtitle }]}>
            📱 Current Device
          </Text>
          <View style={styles.infoGrid}>
            <Text style={[styles.infoText, { fontSize: fontSizes.body }]}>
              Screen: {debugInfo.screenWidth} × {debugInfo.screenHeight}
            </Text>
            <Text style={[styles.infoText, { fontSize: fontSizes.body }]}>
              Diagonal: {debugInfo.diagonalSize}" ({debugInfo.deviceType})
            </Text>
            <Text style={[styles.infoText, { fontSize: fontSizes.body }]}>
              Pixel Density: {debugInfo.pixelDensity}
            </Text>
          </View>
        </View>

        {/* Dynamic Font Sizes */}
        <View style={[styles.section, { padding: spacing.md, borderRadius: borderRadius.medium }]}>
          <Text style={[styles.sectionTitle, { fontSize: fontSizes.subtitle }]}>
            🔤 Dynamic Font Sizes
          </Text>
          <Text style={[styles.fontDemo, { fontSize: fontSizes.title }]}>
            Title: {Math.round(fontSizes.title)}px
          </Text>
          <Text style={[styles.fontDemo, { fontSize: fontSizes.subtitle }]}>
            Subtitle: {Math.round(fontSizes.subtitle)}px
          </Text>
          <Text style={[styles.fontDemo, { fontSize: fontSizes.body }]}>
            Body: {Math.round(fontSizes.body)}px
          </Text>
          <Text style={[styles.fontDemo, { fontSize: fontSizes.small }]}>
            Small: {Math.round(fontSizes.small)}px
          </Text>
        </View>

        {/* Dynamic Spacing */}
        <View style={[styles.section, { padding: spacing.md, borderRadius: borderRadius.medium }]}>
          <Text style={[styles.sectionTitle, { fontSize: fontSizes.subtitle }]}>
            📏 Dynamic Spacing
          </Text>
          <View style={styles.spacingDemo}>
            {Object.entries(spacing).map(([key, value]) => (
              <View key={key} style={[styles.spacingBox, { width: value, height: 20 }]}>
                <Text style={[styles.spacingLabel, { fontSize: fontSizes.small }]}>
                  {key.toUpperCase()}: {Math.round(value)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Grid Layout Tests */}
        <View style={[styles.section, { padding: spacing.md, borderRadius: borderRadius.medium }]}>
          <Text style={[styles.sectionTitle, { fontSize: fontSizes.subtitle }]}>
            🎮 Grid Layout Analysis
          </Text>
          {gridTests.map((test, index) => (
            <View key={index} style={[styles.gridTest, { 
              backgroundColor: test.fits ? '#E8F5E8' : '#FFF0F0',
              borderColor: test.fits ? '#4CAF50' : '#F44336',
              borderWidth: 1,
              borderRadius: borderRadius.small,
              padding: spacing.sm,
              marginBottom: spacing.sm,
            }]}>
              <Text style={[styles.gridTitle, { fontSize: fontSizes.body, fontWeight: 'bold' }]}>
                {test.name} ({test.gridSize} cards)
              </Text>
              <Text style={[styles.gridInfo, { fontSize: fontSizes.small }]}>
                • Card Size: {Math.round(test.cardDimensions.cardSize)}px
              </Text>
              <Text style={[styles.gridInfo, { fontSize: fontSizes.small }]}>
                • Spacing: {Math.round(test.cardDimensions.spacing)}px
              </Text>
              <Text style={[styles.gridInfo, { fontSize: fontSizes.small }]}>
                • Board Width: {Math.round(test.totalBoardWidth)}px
              </Text>
              <Text style={[styles.gridInfo, { fontSize: fontSizes.small }]}>
                • Max Width: {Math.round(test.layout.boardMaxWidth)}px
              </Text>
              <Text style={[styles.gridInfo, { 
                fontSize: fontSizes.small, 
                color: test.fits ? '#4CAF50' : '#F44336',
                fontWeight: 'bold'
              }]}>
                • Status: {test.fits ? '✅ FITS PERFECTLY' : '❌ TOO WIDE'}
              </Text>
            </View>
          ))}
        </View>

        {/* Screen Size Simulations */}
        <View style={[styles.section, { padding: spacing.md, borderRadius: borderRadius.medium }]}>
          <Text style={[styles.sectionTitle, { fontSize: fontSizes.subtitle }]}>
            📐 Screen Size Simulations
          </Text>
          <Text style={[styles.infoText, { fontSize: fontSizes.small, marginBottom: spacing.sm }]}>
            Estimated card sizes for different devices:
          </Text>
          {screenSizes.map((screen, index) => (
            <View key={index} style={[styles.screenSim, { marginBottom: spacing.xs }]}>
              <Text style={[styles.screenName, { fontSize: fontSizes.body, fontWeight: 'bold' }]}>
                {screen.name}
              </Text>
              <Text style={[styles.screenInfo, { fontSize: fontSizes.small }]}>
                {screen.width}×{screen.height} | 4x4: ~{screen.estimatedCardSize16}px | 5x6: ~{screen.estimatedCardSize30}px
              </Text>
            </View>
          ))}
        </View>

        {/* Debug Info */}
        <View style={[styles.section, { padding: spacing.md, borderRadius: borderRadius.medium }]}>
          <Text style={[styles.sectionTitle, { fontSize: fontSizes.subtitle }]}>
            🔧 Debug Information
          </Text>
          {gridTests.map((test, index) => (
            <View key={index} style={[styles.debugInfo, { marginBottom: spacing.sm }]}>
              <Text style={[styles.debugTitle, { fontSize: fontSizes.body, fontWeight: 'bold' }]}>
                {test.name} Debug:
              </Text>
              <Text style={[styles.debugText, { fontSize: fontSizes.small }]}>
                Available Width: {Math.round(test.cardDimensions.debug.availableWidth)}px
              </Text>
              <Text style={[styles.debugText, { fontSize: fontSizes.small }]}>
                Calculated Size: {Math.round(test.cardDimensions.debug.calculatedCardSize)}px
              </Text>
              <Text style={[styles.debugText, { fontSize: fontSizes.small }]}>
                Min/Max: {Math.round(test.cardDimensions.debug.minCardSize)}-{Math.round(test.cardDimensions.debug.maxCardSize)}px
              </Text>
              <Text style={[styles.debugText, { fontSize: fontSizes.small }]}>
                Excess Space: {Math.round(test.cardDimensions.debug.excessSpace)}px
              </Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subtitle: {
    color: '#7F8C8D',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  infoGrid: {
    gap: 8,
  },
  infoText: {
    color: '#34495E',
    lineHeight: 24,
  },
  fontDemo: {
    color: '#2C3E50',
    marginBottom: 8,
  },
  spacingDemo: {
    gap: 8,
  },
  spacingBox: {
    backgroundColor: '#3498DB',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  spacingLabel: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gridTest: {
    marginBottom: 8,
  },
  gridTitle: {
    marginBottom: 4,
  },
  gridInfo: {
    color: '#34495E',
    marginLeft: 8,
  },
  screenSim: {},
  screenName: {
    color: '#2C3E50',
  },
  screenInfo: {
    color: '#7F8C8D',
    marginLeft: 8,
  },
  debugInfo: {},
  debugTitle: {
    color: '#E74C3C',
  },
  debugText: {
    color: '#7F8C8D',
    marginLeft: 8,
  },
});

export default TrueResponsiveTest;
