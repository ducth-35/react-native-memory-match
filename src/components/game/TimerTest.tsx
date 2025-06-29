import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Timer from './Timer';

const TimerTest: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [timeValue, setTimeValue] = useState(0);

  const handleTimeUpdate = (time: number) => {
    console.log('⏱️ Time updated:', time);
    setTimeValue(time);
  };

  const handleStart = () => {
    console.log('▶️ Starting timer');
    setIsRunning(true);
  };

  const handleStop = () => {
    console.log('⏸️ Stopping timer');
    setIsRunning(false);
  };

  const handleReset = () => {
    console.log('🔄 Resetting timer');
    setIsRunning(false);
    setResetTrigger(prev => prev + 1);
    setTimeValue(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⏱️ Timer Test</Text>
      
      <View style={styles.timerContainer}>
        <Timer 
          isRunning={isRunning}
          onTimeUpdate={handleTimeUpdate}
          resetTrigger={resetTrigger}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>Running: {isRunning ? 'Yes' : 'No'}</Text>
        <Text style={styles.infoText}>Time Value: {timeValue}s</Text>
        <Text style={styles.infoText}>Reset Trigger: {resetTrigger}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.button, styles.startButton]} 
          onPress={handleStart}
        >
          <Text style={styles.buttonText}>▶️ Start</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.stopButton]} 
          onPress={handleStop}
        >
          <Text style={styles.buttonText}>⏸️ Stop</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.resetButton]} 
          onPress={handleReset}
        >
          <Text style={styles.buttonText}>🔄 Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.note}>
        <Text style={styles.noteText}>
          Check console for timer logs. This tests if Timer component 
          causes setState errors.
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  timerContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 2,
  },
  info: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#666',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#FF9800',
  },
  resetButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  note: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  noteText: {
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
  },
});

export default TimerTest;
