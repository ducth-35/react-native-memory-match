import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import { HapticFeedback } from '../../utils/feedbackUtils';

const SimpleHapticTest: React.FC = () => {
  const testHaptic = (type: string, hapticFunction: () => void) => {
    console.log(`Testing ${type} haptic feedback`);
    hapticFunction();
    
    Alert.alert(
      'Haptic Test',
      `Đã test ${type} haptic feedback.\n\nPlatform: ${Platform.OS}\nBạn có cảm nhận được rung không?`,
      [
        { text: 'Có ✅', style: 'default' },
        { text: 'Không ❌', style: 'destructive' },
        { text: 'Đóng', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📳 Simple Haptic Test</Text>
      
      <Text style={styles.subtitle}>
        Platform: {Platform.OS} {Platform.Version}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#4ECDC4' }]}
          onPress={() => testHaptic('Light', HapticFeedback.light)}
        >
          <Text style={styles.buttonText}>Light Haptic</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#45B7D1' }]}
          onPress={() => testHaptic('Medium', HapticFeedback.medium)}
        >
          <Text style={styles.buttonText}>Medium Haptic</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#96CEB4' }]}
          onPress={() => testHaptic('Heavy', HapticFeedback.heavy)}
        >
          <Text style={styles.buttonText}>Heavy Haptic</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#FFEAA7' }]}
          onPress={() => testHaptic('Success', HapticFeedback.success)}
        >
          <Text style={styles.buttonText}>Success Haptic</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#DDA0DD' }]}
          onPress={() => testHaptic('Error', HapticFeedback.error)}
        >
          <Text style={styles.buttonText}>Error Haptic</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#98D8C8' }]}
          onPress={() => testHaptic('Celebration', HapticFeedback.celebration)}
        >
          <Text style={styles.buttonText}>Celebration Haptic</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>ℹ️ Lưu ý:</Text>
        <Text style={styles.infoText}>
          • Đảm bảo device không ở chế độ im lặng{'\n'}
          • iOS: Cần device thật (không hoạt động trên simulator){'\n'}
          • Android: Cần permission VIBRATE (đã thêm){'\n'}
          • Check console logs để debug
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  buttonContainer: {
    gap: 15,
  },
  button: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    marginTop: 30,
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
    lineHeight: 20,
  },
});

export default SimpleHapticTest;
