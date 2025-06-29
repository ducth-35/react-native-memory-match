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
import { getGridDimensions } from '../../utils/gameUtils';

const TabletGridTest: React.FC = () => {
  const debugInfo = getResponsiveDebugInfo();
  const fontSizes = getResponsiveFontSizes();
  const spacing = getResponsiveSpacing();
  const borderRadius = getResponsiveBorderRadius();

  // Focus on 5x6 grid (30 cards) - the problematic one
  const gridSize = 30;
  const { rows, cols } = getGridDimensions(gridSize);
  const cardDimensions = getResponsiveCardDimensions(gridSize);
  const layout = getResponsiveGameBoardLayout(gridSize);

  // Calculate total board dimensions
  const totalBoardWidth = cardDimensions.cardSize * cols + cardDimensions.spacing * (cols - 1);
  const totalBoardHeight = cardDimensions.cardSize * rows + cardDimensions.spacing * (rows - 1);

  // Create mock cards for visual test
  const mockCards = Array.from({ length: gridSize }, (_, index) => ({
    id: `card-${index}`,
    emoji: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐸', '🐵', '🐔', '🐧'][index % 15],
    isFlipped: index % 3 === 0, // Show some cards flipped for testing
    isMatched: index % 5 === 0,
  }));

  const renderRow = (rowIndex: number) => {
    const rowCards = mockCards.slice(rowIndex * cols, (rowIndex + 1) * cols);
    
    return (
      <View key={rowIndex} style={[styles.row, { marginBottom: cardDimensions.spacing / 2 }]}>
        {rowCards.map((card, cardIndex) => (
          <View
            key={card.id}
            style={[
              styles.card,
              {
                width: cardDimensions.cardSize,
                height: cardDimensions.cardSize,
                marginHorizontal: cardDimensions.spacing / 2,
                borderRadius: borderRadius.medium,
              },
              card.isFlipped || card.isMatched ? styles.cardFront : styles.cardBack,
              card.isMatched && styles.cardMatched,
            ]}
          >
            <Text style={[styles.emoji, { fontSize: cardDimensions.cardSize * fontSizes.cardEmoji }]}>
              {card.isFlipped || card.isMatched ? card.emoji : '🧠'}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { fontSize: fontSizes.title }]}>
            📱 Tablet 5x6 Grid Test
          </Text>
          <Text style={[styles.subtitle, { fontSize: fontSizes.subtitle }]}>
            Hard Level Layout Optimization
          </Text>
        </View>

        {/* Device & Grid Info */}
        <View style={[styles.section, { padding: spacing.md, borderRadius: borderRadius.medium }]}>
          <Text style={[styles.sectionTitle, { fontSize: fontSizes.subtitle }]}>
            📊 Grid Analysis
          </Text>
          <View style={styles.infoGrid}>
            <Text style={[styles.infoText, { fontSize: fontSizes.body }]}>
              Device: {debugInfo.deviceType} ({debugInfo.diagonalSize}")
            </Text>
            <Text style={[styles.infoText, { fontSize: fontSizes.body }]}>
              Screen: {debugInfo.screenWidth} × {debugInfo.screenHeight}
            </Text>
            <Text style={[styles.infoText, { fontSize: fontSizes.body }]}>
              Grid: {rows} rows × {cols} columns = {gridSize} cards
            </Text>
            <Text style={[styles.infoText, { fontSize: fontSizes.body }]}>
              Card Size: {Math.round(cardDimensions.cardSize)}px
            </Text>
            <Text style={[styles.infoText, { fontSize: fontSizes.body }]}>
              Card Spacing: {cardDimensions.spacing}px
            </Text>
            <Text style={[styles.infoText, { fontSize: fontSizes.body }]}>
              Board Width: {Math.round(totalBoardWidth)}px
            </Text>
            <Text style={[styles.infoText, { fontSize: fontSizes.body }]}>
              Board Height: {Math.round(totalBoardHeight)}px
            </Text>
            <Text style={[styles.infoText, { fontSize: fontSizes.body }]}>
              Container Padding: {layout.containerPadding}px
            </Text>
            <Text style={[styles.infoText, { fontSize: fontSizes.body }]}>
              Max Board Width: {layout.boardMaxWidth}px
            </Text>
          </View>
        </View>

        {/* Layout Status */}
        <View style={[styles.section, { padding: spacing.md, borderRadius: borderRadius.medium }]}>
          <Text style={[styles.sectionTitle, { fontSize: fontSizes.subtitle }]}>
            ✅ Layout Status
          </Text>
          <Text style={[styles.statusText, { fontSize: fontSizes.body, color: totalBoardWidth <= layout.boardMaxWidth ? '#4CAF50' : '#F44336' }]}>
            Board Fit: {totalBoardWidth <= layout.boardMaxWidth ? '✅ FITS' : '❌ TOO WIDE'}
          </Text>
          <Text style={[styles.statusText, { fontSize: fontSizes.body, color: isLargeTablet() ? '#4CAF50' : '#FF9800' }]}>
            Device Type: {isLargeTablet() ? '✅ LARGE TABLET' : '⚠️ NOT LARGE TABLET'}
          </Text>
          <Text style={[styles.statusText, { fontSize: fontSizes.body }]}>
            Available Space: {layout.boardMaxWidth - totalBoardWidth}px margin
          </Text>
        </View>

        {/* Visual Game Board Preview */}
        <View style={[styles.section, { padding: spacing.md, borderRadius: borderRadius.medium }]}>
          <Text style={[styles.sectionTitle, { fontSize: fontSizes.subtitle }]}>
            🎮 Visual Preview
          </Text>
          
          <View 
            style={[
              styles.gameBoard,
              {
                paddingHorizontal: layout.containerPadding,
                maxWidth: layout.boardMaxWidth,
                alignSelf: 'center',
              }
            ]}
          >
            <View style={styles.board}>
              {Array.from({ length: rows }, (_, index) => renderRow(index))}
            </View>
          </View>
          
          <Text style={[styles.previewNote, { fontSize: fontSizes.small }]}>
            ℹ️ This is how the 5x6 grid will look on your device
          </Text>
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
  statusText: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  gameBoard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  board: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  cardBack: {
    backgroundColor: '#4A90E2',
    borderColor: '#357ABD',
  },
  cardFront: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
  },
  cardMatched: {
    backgroundColor: '#4CAF50',
    borderColor: '#45A049',
  },
  emoji: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  previewNote: {
    textAlign: 'center',
    color: '#7F8C8D',
    fontStyle: 'italic',
  },
});

export default TabletGridTest;
