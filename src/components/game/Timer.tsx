import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TimerProps {
  isRunning: boolean;
  onTimeUpdate?: (time: number) => void;
  resetTrigger?: number;
}

const Timer: React.FC<TimerProps> = ({ isRunning, onTimeUpdate, resetTrigger }) => {
  const [seconds, setSeconds] = useState(0);
  const onTimeUpdateRef = useRef(onTimeUpdate);

  // Update ref when onTimeUpdate changes
  useEffect(() => {
    onTimeUpdateRef.current = onTimeUpdate;
  }, [onTimeUpdate]);

  useEffect(() => {
    setSeconds(0);
  }, [resetTrigger]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => {
          const newSeconds = prevSeconds + 1;
          return newSeconds;
        });
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  // Separate useEffect for onTimeUpdate to avoid setState during render
  useEffect(() => {
    if (seconds > 0) {
      onTimeUpdateRef.current?.(seconds);
    }
  }, [seconds]); // Remove onTimeUpdate from dependencies

  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>⏱️ {formatTime(seconds)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A5568',
  },
});

export default Timer;
