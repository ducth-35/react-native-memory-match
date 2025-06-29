import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import { HapticFeedback, GameFeedback } from '../../utils/feedbackUtils';

const AndroidHapticTest: React.FC = () => {
  const testHaptic = (type: string, hapticFunction: () => void) => {
    console.log(`🔊 Testing ${type} haptic feedback`);
    hapticFunction();
    
    Alert.alert(
      '📳 Haptic Test',
      `Đã test ${type} haptic feedback.\n\nPlatform: ${Platform.OS}\nBạn có cảm nhận được rung không?`,
      [
        { text: 'Có ✅', style: 'default' },
        { text: 'Không ❌', style: 'destructive' },
        { text: 'Đóng', style: 'cancel' },
      ]
    );
  };

  const testGameSequence = () => {
    console.log('🎮 Testing game sequence');
    
    // Simulate card flip sequence
    GameFeedback.cardFlip();
    setTimeout(() => GameFeedback.cardFlip(), 500);
    setTimeout(() => GameFeedback.cardMatch(), 1000);
    
    Alert.alert(
      '🎮 Game Sequence Test',
      'Đã test sequence: Card Flip → Card Flip → Match\n\nBạn có cảm nhận được 3 lần rung khác nhau không?',
      [
        { text: 'Có ✅', style: 'default' },
        { text: 'Không ❌', style: 'destructive' },
      ]
    );
  };

  const testNoMatchSequence = () => {
    console.log('❌ Testing no match sequence');
    
    // Simulate no match sequence
    GameFeedback.cardFlip();
    setTimeout(() => GameFeedback.cardFlip(), 500);
    setTimeout(() => GameFeedback.cardNoMatch(), 1000);
    
    Alert.alert(
      '❌ No Match Sequence Test',
      'Đã test sequence: Card Flip → Card Flip → No Match\n\nBạn có cảm nhận được pattern rung lỗi không?',
      [
        { text: 'Có ✅', style: 'default' },
        { text: 'Không ❌', style: 'destructive' },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📳 Android Haptic Test</Text>
      
      <Text style={styles.subtitle}>
        Platform: {Platform.OS} {Platform.Version}
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔧 Basic Haptic Tests</Text>
        
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#4ECDC4' }]}
          onPress={() => testHaptic('Light (50ms)', HapticFeedback.light)}
        >
          <Text style={styles.buttonText}>Light Haptic</Text>
          <Text style={styles.buttonSubtext}>Rung nhẹ 50ms</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#45B7D1' }]}
          onPress={() => testHaptic('Medium (100ms)', HapticFeedback.medium)}
        >
          <Text style={styles.buttonText}>Medium Haptic</Text>
          <Text style={styles.buttonSubtext}>Rung trung bình 100ms</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#96CEB4' }]}
          onPress={() => testHaptic('Heavy (200ms)', HapticFeedback.heavy)}
        >
          <Text style={styles.buttonText}>Heavy Haptic</Text>
          <Text style={styles.buttonSubtext}>Rung mạnh 200ms</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#FFEAA7' }]}
          onPress={() => testHaptic('Success Pattern', HapticFeedback.success)}
        >
          <Text style={styles.buttonText}>Success Haptic</Text>
          <Text style={styles.buttonSubtext}>Pattern: 100ms-50ms-100ms</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#DDA0DD' }]}
          onPress={() => testHaptic('Error Pattern', HapticFeedback.error)}
        >
          <Text style={styles.buttonText}>Error Haptic</Text>
          <Text style={styles.buttonSubtext}>Pattern: 150ms-100ms-150ms-100ms-150ms</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#98D8C8' }]}
          onPress={() => testHaptic('Celebration Pattern', HapticFeedback.celebration)}
        >
          <Text style={styles.buttonText}>Celebration Haptic</Text>
          <Text style={styles.buttonSubtext}>Pattern: 200ms-100ms-200ms-100ms-200ms-100ms-400ms</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎮 Game Feedback Tests</Text>
        
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#FF6B6B' }]}
          onPress={() => testHaptic('Card Flip', GameFeedback.cardFlip)}
        >
          <Text style={styles.buttonText}>Card Flip</Text>
          <Text style={styles.buttonSubtext}>Khi lật thẻ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#4ECDC4' }]}
          onPress={() => testHaptic('Card Match', GameFeedback.cardMatch)}
        >
          <Text style={styles.buttonText}>Card Match</Text>
          <Text style={styles.buttonSubtext}>Khi match thành công</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#45B7D1' }]}
          onPress={() => testHaptic('No Match', GameFeedback.cardNoMatch)}
        >
          <Text style={styles.buttonText}>No Match</Text>
          <Text style={styles.buttonSubtext}>Khi không match</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#96CEB4' }]}
          onPress={() => testHaptic('Game Complete', GameFeedback.gameComplete)}
        >
          <Text style={styles.buttonText}>Game Complete</Text>
          <Text style={styles.buttonSubtext}>Khi hoàn thành game</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#FFEAA7' }]}
          onPress={() => testHaptic('Button Press', GameFeedback.buttonPress)}
        >
          <Text style={styles.buttonText}>Button Press</Text>
          <Text style={styles.buttonSubtext}>Khi nhấn nút</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔄 Sequence Tests</Text>
        
        <TouchableOpacity
          style={[styles.sequenceButton, { backgroundColor: '#FF6B6B' }]}
          onPress={testGameSequence}
        >
          <Text style={styles.sequenceButtonText}>🎯 Test Match Sequence</Text>
          <Text style={styles.sequenceButtonSubtext}>Flip → Flip → Match (3 rung khác nhau)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sequenceButton, { backgroundColor: '#4ECDC4' }]}
          onPress={testNoMatchSequence}
        >
          <Text style={styles.sequenceButtonText}>❌ Test No Match Sequence</Text>
          <Text style={styles.sequenceButtonSubtext}>Flip → Flip → No Match</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>ℹ️ Lưu ý cho Android:</Text>
        <Text style={styles.infoText}>
          • Đảm bảo device không ở chế độ im lặng{'\n'}• Kiểm tra Settings → Sound → Vibrate = ON{'\n'}• App đã có permission VIBRATE{'\n'}• Một số device có thể tắt vibration khi pin yếu{'\n'}• Check console logs để debug
        </Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
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
    marginBottom: 12,
    color: '#333',
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  buttonSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  sequenceButton: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sequenceButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  sequenceButtonSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
});

export default AndroidHapticTest;
