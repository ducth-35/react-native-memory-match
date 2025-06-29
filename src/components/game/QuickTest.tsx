import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { getResponsiveCardDimensions } from '../../utils/responsiveUtils';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const QuickTest: React.FC = () => {
  console.log('📱 QuickTest - Screen:', screenWidth, 'x', screenHeight);

  // Test all grid sizes
  const testResults = [16, 20, 30].map(gridSize => {
    const result = getResponsiveCardDimensions(gridSize);
    const totalWidth = result.cardSize * result.cols + result.spacing * (result.cols - 1);
    const fits = totalWidth <= (screenWidth - result.padding * 2);
    
    console.log(`🎮 Grid ${gridSize}:`, {
      cardSize: Math.round(result.cardSize),
      spacing: Math.round(result.spacing),
      padding: Math.round(result.padding),
      totalWidth: Math.round(totalWidth),
      fits,
    });
    
    return {
      gridSize,
      name: gridSize === 16 ? '4x4 Easy' : gridSize === 20 ? '4x5 Medium' : '5x6 Hard',
      ...result,
      totalWidth,
      fits,
    };
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔍 Quick Responsive Test</Text>
        <Text style={styles.subtitle}>Screen: {screenWidth} × {screenHeight}</Text>
      </View>

      {testResults.map((test, index) => (
        <View key={index} style={[styles.testCard, { 
          backgroundColor: test.fits ? '#E8F5E8' : '#FFF0F0',
          borderColor: test.fits ? '#4CAF50' : '#F44336',
        }]}>
          <Text style={styles.testTitle}>{test.name}</Text>
          <Text style={styles.testInfo}>Card: {Math.round(test.cardSize)}px</Text>
          <Text style={styles.testInfo}>Spacing: {Math.round(test.spacing)}px</Text>
          <Text style={styles.testInfo}>Cols: {test.cols}</Text>
          <Text style={styles.testInfo}>Total: {Math.round(test.totalWidth)}px</Text>
          <Text style={[styles.testStatus, { 
            color: test.fits ? '#4CAF50' : '#F44336' 
          }]}>
            {test.fits ? '✅ FITS' : '❌ TOO WIDE'}
          </Text>
          
          {/* Visual representation */}
          <View style={styles.visualRow}>
            {Array.from({ length: Math.min(test.cols, 6) }, (_, i) => (
              <View
                key={i}
                style={[
                  styles.miniCard,
                  {
                    width: test.cardSize / 4, // Scale down for display
                    height: test.cardSize / 4,
                    marginHorizontal: test.spacing / 4,
                  }
                ]}
              />
            ))}
          </View>
        </View>
      ))}

      {/* Screen size categories */}
      <View style={styles.categoryCard}>
        <Text style={styles.categoryTitle}>📱 Screen Category</Text>
        <Text style={styles.categoryText}>
          {screenWidth < 600 ? '📱 Phone' :
           screenWidth < 900 ? '📱 Small Tablet (7")' :
           screenWidth < 1300 ? '📱 Large Tablet (10")' :
           '📱 Extra Large (12"+)'}
        </Text>
        <Text style={styles.categoryInfo}>
          Recommended for: {
            screenWidth < 600 ? 'Easy/Medium levels' :
            screenWidth < 900 ? 'All levels (may be tight on Hard)' :
            'All levels with comfortable spacing'
          }
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  testCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 2,
    elevation: 1,
  },
  testTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  testInfo: {
    fontSize: 12,
    color: '#34495E',
    marginBottom: 2,
  },
  testStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
  },
  visualRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    paddingVertical: 8,
  },
  miniCard: {
    backgroundColor: '#4A90E2',
    borderRadius: 2,
  },
  categoryCard: {
    padding: 16,
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2196F3',
    marginTop: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  categoryInfo: {
    fontSize: 12,
    color: '#424242',
    fontStyle: 'italic',
  },
});

export default QuickTest;
