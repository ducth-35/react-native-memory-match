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
  isTablet,
  isLargeTablet,
} from '../../utils/responsiveUtils';

const ResponsiveTest: React.FC = () => {
  const debugInfo = getResponsiveDebugInfo();
  const fontSizes = getResponsiveFontSizes();
  const spacing = getResponsiveSpacing();
  const borderRadius = getResponsiveBorderRadius();

  // Test different grid sizes
  const gridSizes = [16, 20, 30];
  const cardDimensions = gridSizes.map(size => ({
    gridSize: size,
    layout: getResponsiveGameBoardLayout(size),
    ...getResponsiveCardDimensions(size),
  }));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { fontSize: fontSizes.title }]}>
            📱 Responsive Design Test
          </Text>
          <Text style={[styles.subtitle, { fontSize: fontSizes.subtitle }]}>
            Tablet Layout Optimization
          </Text>
        </View>

        {/* Device Info */}
        <View style={[styles.section, { padding: spacing.md, borderRadius: borderRadius.medium }]}>
          <Text style={[styles.sectionTitle, { fontSize: fontSizes.subtitle }]}>
            🔍 Device Information
          </Text>
          <View style={styles.infoGrid}>
            <Text style={[styles.infoText, { fontSize: fontSizes.body }]}>
              Screen: {debugInfo.screenWidth} × {debugInfo.screenHeight}
            </Text>
            <Text style={[styles.infoText, { fontSize: fontSizes.body }]}>
              Pixel Density: {debugInfo.pixelDensity}
            </Text>
            <Text style={[styles.infoText, { fontSize: fontSizes.body }]}>
              Diagonal: {debugInfo.diagonalSize}"
            </Text>
            <Text style={[styles.infoText, { fontSize: fontSizes.body }]}>
              Device Type: {debugInfo.deviceType}
            </Text>
            <Text style={[styles.infoText, { fontSize: fontSizes.body }]}>
              Is Tablet: {isTablet() ? '✅' : '❌'}
            </Text>
            <Text style={[styles.infoText, { fontSize: fontSizes.body }]}>
              Is Large Tablet: {isLargeTablet() ? '✅' : '❌'}
            </Text>
          </View>
        </View>

        {/* Font Sizes */}
        <View style={[styles.section, { padding: spacing.md, borderRadius: borderRadius.medium }]}>
          <Text style={[styles.sectionTitle, { fontSize: fontSizes.subtitle }]}>
            🔤 Font Sizes
          </Text>
          <Text style={[styles.fontDemo, { fontSize: fontSizes.title }]}>
            Title ({fontSizes.title}px)
          </Text>
          <Text style={[styles.fontDemo, { fontSize: fontSizes.subtitle }]}>
            Subtitle ({fontSizes.subtitle}px)
          </Text>
          <Text style={[styles.fontDemo, { fontSize: fontSizes.body }]}>
            Body ({fontSizes.body}px)
          </Text>
          <Text style={[styles.fontDemo, { fontSize: fontSizes.small }]}>
            Small ({fontSizes.small}px)
          </Text>
        </View>

        {/* Spacing */}
        <View style={[styles.section, { padding: spacing.md, borderRadius: borderRadius.medium }]}>
          <Text style={[styles.sectionTitle, { fontSize: fontSizes.subtitle }]}>
            📏 Spacing Values
          </Text>
          <View style={styles.spacingDemo}>
            <View style={[styles.spacingBox, { width: spacing.xs, backgroundColor: '#FF6B6B' }]}>
              <Text style={[styles.spacingLabel, { fontSize: fontSizes.small }]}>XS ({spacing.xs})</Text>
            </View>
            <View style={[styles.spacingBox, { width: spacing.sm, backgroundColor: '#4ECDC4' }]}>
              <Text style={[styles.spacingLabel, { fontSize: fontSizes.small }]}>SM ({spacing.sm})</Text>
            </View>
            <View style={[styles.spacingBox, { width: spacing.md, backgroundColor: '#45B7D1' }]}>
              <Text style={[styles.spacingLabel, { fontSize: fontSizes.small }]}>MD ({spacing.md})</Text>
            </View>
            <View style={[styles.spacingBox, { width: spacing.lg, backgroundColor: '#96CEB4' }]}>
              <Text style={[styles.spacingLabel, { fontSize: fontSizes.small }]}>LG ({spacing.lg})</Text>
            </View>
            <View style={[styles.spacingBox, { width: spacing.xl, backgroundColor: '#FFEAA7' }]}>
              <Text style={[styles.spacingLabel, { fontSize: fontSizes.small }]}>XL ({spacing.xl})</Text>
            </View>
          </View>
        </View>

        {/* Card Dimensions */}
        <View style={[styles.section, { padding: spacing.md, borderRadius: borderRadius.medium }]}>
          <Text style={[styles.sectionTitle, { fontSize: fontSizes.subtitle }]}>
            🃏 Card Dimensions & Layout
          </Text>
          {cardDimensions.map((dim, index) => (
            <View key={index} style={styles.cardDimInfo}>
              <Text style={[styles.infoText, { fontSize: fontSizes.body }]}>
                Grid {dim.gridSize} ({dim.cols} cols): {Math.round(dim.cardSize)}px cards
              </Text>
              <Text style={[styles.infoText, { fontSize: fontSizes.small }]}>
                Card Spacing: {dim.spacing}px, Card Padding: {dim.padding}px
              </Text>
              <Text style={[styles.infoText, { fontSize: fontSizes.small }]}>
                Board Padding: {dim.layout.containerPadding}px, Max Width: {dim.layout.boardMaxWidth}px
              </Text>
              {dim.gridSize === 30 && (
                <Text style={[styles.infoText, { fontSize: fontSizes.small, color: '#E74C3C', fontWeight: 'bold' }]}>
                  ⚠️ 5x6 Grid - Optimized for tablet layout
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* Grid-Specific Layout Comparison */}
        <View style={[styles.section, { padding: spacing.md, borderRadius: borderRadius.medium }]}>
          <Text style={[styles.sectionTitle, { fontSize: fontSizes.subtitle }]}>
            🎯 Grid Layout Comparison
          </Text>
          {cardDimensions.map((dim, index) => (
            <View key={index} style={[styles.cardDimInfo, { backgroundColor: dim.gridSize === 30 ? '#FFF3CD' : 'transparent', padding: 8, borderRadius: 4 }]}>
              <Text style={[styles.infoText, { fontSize: fontSizes.body, fontWeight: 'bold' }]}>
                {dim.gridSize === 16 ? '4x4 Easy' : dim.gridSize === 20 ? '4x5 Medium' : '5x6 Hard'} Grid:
              </Text>
              <Text style={[styles.infoText, { fontSize: fontSizes.small }]}>
                • Container Padding: {dim.layout.containerPadding}px
              </Text>
              <Text style={[styles.infoText, { fontSize: fontSizes.small }]}>
                • Board Max Width: {dim.layout.boardMaxWidth}px
              </Text>
              <Text style={[styles.infoText, { fontSize: fontSizes.small }]}>
                • Card Size: {Math.round(dim.cardSize)}px
              </Text>
              <Text style={[styles.infoText, { fontSize: fontSizes.small }]}>
                • Total Width: {Math.round(dim.cardSize * dim.cols + dim.spacing * (dim.cols - 1))}px
              </Text>
            </View>
          ))}
        </View>

        {/* Visual Card Preview */}
        <View style={[styles.section, { padding: spacing.md, borderRadius: borderRadius.medium }]}>
          <Text style={[styles.sectionTitle, { fontSize: fontSizes.subtitle }]}>
            👀 Card Preview
          </Text>
          <View style={styles.cardPreview}>
            {cardDimensions.map((dim, index) => (
              <View key={index} style={styles.cardPreviewRow}>
                <Text style={[styles.cardLabel, { fontSize: fontSizes.small }]}>
                  {dim.gridSize} cards:
                </Text>
                <View
                  style={[
                    styles.previewCard,
                    {
                      width: dim.cardSize,
                      height: dim.cardSize,
                      borderRadius: borderRadius.medium,
                    },
                  ]}
                >
                  <Text style={{ fontSize: dim.cardSize * fontSizes.cardEmoji }}>🧠</Text>
                </View>
              </View>
            ))}
          </View>
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
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    flexWrap: 'wrap',
  },
  spacingBox: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  spacingLabel: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardDimInfo: {
    marginBottom: 12,
  },
  cardPreview: {
    gap: 16,
  },
  cardPreviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cardLabel: {
    width: 80,
    color: '#7F8C8D',
  },
  previewCard: {
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#357ABD',
  },
});

export default ResponsiveTest;
