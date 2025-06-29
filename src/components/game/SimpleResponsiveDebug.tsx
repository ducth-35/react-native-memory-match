import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import {
  getResponsiveCardDimensions,
  getResponsiveGameBoardLayout,
} from '../../utils/responsiveUtils';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SimpleResponsiveDebug: React.FC = () => {
  console.log('🔍 SimpleResponsiveDebug - Screen:', screenWidth, 'x', screenHeight);

  // Test grid 5x6 (30 cards) - the problematic one
  const gridSize = 30;
  
  try {
    const cardDimensions = getResponsiveCardDimensions(gridSize);
    const layout = getResponsiveGameBoardLayout(gridSize);
    
    console.log('🃏 Card Dimensions:', cardDimensions);
    console.log('🎯 Layout:', layout);
    
    // Calculate total board width
    const totalBoardWidth = cardDimensions.cardSize * cardDimensions.cols + 
                           cardDimensions.spacing * (cardDimensions.cols - 1);
    
    console.log('📐 Total Board Width:', totalBoardWidth);
    console.log('📐 Max Board Width:', layout.boardMaxWidth);
    console.log('✅ Fits?', totalBoardWidth <= layout.boardMaxWidth);

    // Create a simple visual test
    const mockCards = Array.from({ length: 6 }, (_, index) => ({
      id: `card-${index}`,
      emoji: '🧠',
    }));

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <ScrollView style={styles.scrollView}>
          
          <View style={styles.header}>
            <Text style={styles.title}>🔍 Simple Responsive Debug</Text>
            <Text style={styles.subtitle}>Grid 5x6 Test</Text>
          </View>

          {/* Debug Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📊 Debug Info</Text>
            <Text style={styles.infoText}>Screen: {screenWidth} × {screenHeight}</Text>
            <Text style={styles.infoText}>Grid: 5 rows × 6 columns = 30 cards</Text>
            <Text style={styles.infoText}>Card Size: {Math.round(cardDimensions.cardSize)}px</Text>
            <Text style={styles.infoText}>Card Spacing: {Math.round(cardDimensions.spacing)}px</Text>
            <Text style={styles.infoText}>Card Padding: {Math.round(cardDimensions.padding)}px</Text>
            <Text style={styles.infoText}>Board Width: {Math.round(totalBoardWidth)}px</Text>
            <Text style={styles.infoText}>Max Width: {Math.round(layout.boardMaxWidth)}px</Text>
            <Text style={[styles.infoText, { 
              color: totalBoardWidth <= layout.boardMaxWidth ? '#4CAF50' : '#F44336',
              fontWeight: 'bold'
            }]}>
              Status: {totalBoardWidth <= layout.boardMaxWidth ? '✅ FITS' : '❌ TOO WIDE'}
            </Text>
          </View>

          {/* Visual Test - Single Row */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>👀 Visual Test (1 Row)</Text>
            <Text style={styles.infoText}>This shows how 6 cards will look in one row:</Text>
            
            <View 
              style={[
                styles.gameBoard,
                {
                  paddingHorizontal: layout.containerPadding,
                  maxWidth: layout.boardMaxWidth,
                }
              ]}
            >
              <View style={styles.row}>
                {mockCards.map((card, index) => (
                  <View
                    key={card.id}
                    style={[
                      styles.card,
                      {
                        width: cardDimensions.cardSize,
                        height: cardDimensions.cardSize,
                        marginHorizontal: cardDimensions.spacing / 2,
                      }
                    ]}
                  >
                    <Text style={[styles.emoji, { 
                      fontSize: cardDimensions.cardSize * 0.45 
                    }]}>
                      {card.emoji}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Raw Calculations */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🔢 Raw Calculations</Text>
            {cardDimensions.debug && (
              <>
                <Text style={styles.debugText}>Available Width: {Math.round(cardDimensions.debug.availableWidth)}px</Text>
                <Text style={styles.debugText}>Calculated Card Size: {Math.round(cardDimensions.debug.calculatedCardSize)}px</Text>
                <Text style={styles.debugText}>Min Card Size: {Math.round(cardDimensions.debug.minCardSize)}px</Text>
                <Text style={styles.debugText}>Max Card Size: {Math.round(cardDimensions.debug.maxCardSize)}px</Text>
                <Text style={styles.debugText}>Actual Board Width: {Math.round(cardDimensions.debug.actualBoardWidth)}px</Text>
                <Text style={styles.debugText}>Excess Space: {Math.round(cardDimensions.debug.excessSpace)}px</Text>
                <Text style={styles.debugText}>Final Padding: {Math.round(cardDimensions.debug.finalPadding)}px</Text>
              </>
            )}
          </View>

          {/* Test Different Screen Widths */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📱 Screen Width Tests</Text>
            {[768, 1024, 1200, 1366].map(testWidth => {
              // Simulate calculations for different widths
              const testPadding = Math.max(20, Math.min(80, testWidth * 0.08));
              const testSpacing = Math.max(4, Math.min(16, testWidth * 0.015));
              const testAvailable = testWidth - (testPadding * 2);
              const testTotalSpacing = 5 * testSpacing; // 6 cards = 5 spaces
              const testCardSize = (testAvailable - testTotalSpacing) / 6;
              const testMinCard = Math.max(45, testWidth * 0.08);
              const testMaxCard = Math.min(150, testWidth * 0.18);
              const testFinalCard = Math.max(testMinCard, Math.min(testMaxCard, testCardSize));
              const testBoardWidth = testFinalCard * 6 + testSpacing * 5;
              
              return (
                <View key={testWidth} style={styles.testRow}>
                  <Text style={styles.testText}>
                    {testWidth}px: Card {Math.round(testFinalCard)}px, Board {Math.round(testBoardWidth)}px
                  </Text>
                  <Text style={[styles.testStatus, { 
                    color: testBoardWidth <= testWidth ? '#4CAF50' : '#F44336' 
                  }]}>
                    {testBoardWidth <= testWidth ? '✅' : '❌'}
                  </Text>
                </View>
              );
            })}
          </View>

        </ScrollView>
      </SafeAreaView>
    );
  } catch (error) {
    console.error('❌ Error in SimpleResponsiveDebug:', error);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {String(error)}</Text>
        </View>
      </SafeAreaView>
    );
  }
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#34495E',
    marginBottom: 4,
  },
  debugText: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 2,
    fontFamily: 'monospace',
  },
  gameBoard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#357ABD',
  },
  emoji: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  testRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  testText: {
    fontSize: 12,
    color: '#34495E',
    flex: 1,
  },
  testStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
  },
});

export default SimpleResponsiveDebug;
