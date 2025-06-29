import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { HapticFeedback, GameFeedback } from '../../utils/feedbackUtils';

const HapticTest: React.FC = () => {
  const testHaptic = (type: string, hapticFunction: () => void) => {
    hapticFunction();
    Alert.alert(
      'Haptic Test',
      `Đã test ${type} haptic feedback.\n\nBạn có cảm nhận được rung không?`,
      [
        { text: 'Có', style: 'default' },
        { text: 'Không', style: 'destructive' },
      ]
    );
  };

  const hapticTests = [
    {
      name: 'Light Impact',
      description: 'Rung nhẹ khi chạm thẻ',
      color: '#4ECDC4',
      action: () => testHaptic('Light', HapticFeedback.light),
    },
    {
      name: 'Medium Impact',
      description: 'Rung trung bình',
      color: '#45B7D1',
      action: () => testHaptic('Medium', HapticFeedback.medium),
    },
    {
      name: 'Heavy Impact',
      description: 'Rung mạnh',
      color: '#96CEB4',
      action: () => testHaptic('Heavy', HapticFeedback.heavy),
    },
    {
      name: 'Success',
      description: 'Rung khi match thành công',
      color: '#FFEAA7',
      action: () => testHaptic('Success', HapticFeedback.success),
    },
    {
      name: 'Error',
      description: 'Rung khi không match',
      color: '#DDA0DD',
      action: () => testHaptic('Error', HapticFeedback.error),
    },
    {
      name: 'Celebration',
      description: 'Rung khi hoàn thành game',
      color: '#98D8C8',
      action: () => testHaptic('Celebration', HapticFeedback.celebration),
    },
  ];

  const gameTests = [
    {
      name: 'Card Flip',
      description: 'Feedback khi lật thẻ',
      color: '#FF6B6B',
      action: () => testHaptic('Card Flip', GameFeedback.cardFlip),
    },
    {
      name: 'Card Match',
      description: 'Feedback khi match',
      color: '#4ECDC4',
      action: () => testHaptic('Card Match', GameFeedback.cardMatch),
    },
    {
      name: 'No Match',
      description: 'Feedback khi không match',
      color: '#45B7D1',
      action: () => testHaptic('No Match', GameFeedback.cardNoMatch),
    },
    {
      name: 'Game Complete',
      description: 'Feedback khi hoàn thành',
      color: '#96CEB4',
      action: () => testHaptic('Game Complete', GameFeedback.gameComplete),
    },
    {
      name: 'Button Press',
      description: 'Feedback khi nhấn nút',
      color: '#FFEAA7',
      action: () => testHaptic('Button Press', GameFeedback.buttonPress),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎮 Haptic Feedback Test</Text>
      
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>ℹ️ Thông tin</Text>
        <Text style={styles.infoText}>
          Platform: {Platform.OS} {Platform.Version}
        </Text>
        <Text style={styles.infoText}>
          • iOS: Sử dụng Haptic Engine (nếu có)
        </Text>
        <Text style={styles.infoText}>
          • Android: Sử dụng Vibration API
        </Text>
        <Text style={styles.infoText}>
          • Đảm bảo device không ở chế độ im lặng
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔧 Basic Haptic Tests</Text>
        <View style={styles.grid}>
          {hapticTests.map((test, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.testButton, { backgroundColor: test.color }]}
              onPress={test.action}
              activeOpacity={0.8}
            >
              <Text style={styles.testButtonTitle}>{test.name}</Text>
              <Text style={styles.testButtonDescription}>{test.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Game Feedback Tests</Text>
        <View style={styles.grid}>
          {gameTests.map((test, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.testButton, { backgroundColor: test.color }]}
              onPress={test.action}
              activeOpacity={0.8}
            >
              <Text style={styles.testButtonTitle}>{test.name}</Text>
              <Text style={styles.testButtonDescription}>{test.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔄 Sequence Tests</Text>
        
        <TouchableOpacity
          style={[styles.sequenceButton, { backgroundColor: '#FF6B6B' }]}
          onPress={() => {
            // Simulate game sequence
            GameFeedback.cardFlip();
            setTimeout(() => GameFeedback.cardFlip(), 500);
            setTimeout(() => GameFeedback.cardMatch(), 1000);
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.sequenceButtonText}>
            🎯 Test Match Sequence
          </Text>
          <Text style={styles.sequenceButtonDescription}>
            Flip → Flip → Match
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sequenceButton, { backgroundColor: '#4ECDC4' }]}
          onPress={() => {
            // Simulate no match sequence
            GameFeedback.cardFlip();
            setTimeout(() => GameFeedback.cardFlip(), 500);
            setTimeout(() => GameFeedback.cardNoMatch(), 1000);
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.sequenceButtonText}>
            ❌ Test No Match Sequence
          </Text>
          <Text style={styles.sequenceButtonDescription}>
            Flip → Flip → No Match
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sequenceButton, { backgroundColor: '#45B7D1' }]}
          onPress={() => {
            // Simulate game complete sequence
            GameFeedback.cardMatch();
            setTimeout(() => GameFeedback.gameComplete(), 500);
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.sequenceButtonText}>
            🎉 Test Game Complete
          </Text>
          <Text style={styles.sequenceButtonDescription}>
            Final Match → Celebration
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  infoCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 4,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  testButton: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  testButtonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
  },
  testButtonDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  sequenceButton: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sequenceButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
  },
  sequenceButtonDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
});

export default HapticTest;
