import React, { useCallback, useEffect } from 'react';
import {
  Alert,
  BackHandler,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import GameBoard from '../components/game/GameBoard';
import GameHeader from '../components/game/GameHeader';
// import ParticleEffect from '../components/game/ParticleEffect'; // Temporarily disabled
import useGameStore from '../store/useGameStore';

interface GameScreenProps {
  navigation: any;
}

const GameScreen: React.FC<GameScreenProps> = ({navigation}) => {
  const {
    cards,
    attempts,
    matchedPairs,
    currentLevel,
    isGameComplete,
    flipCard,
    resetGame,
    updateTime,
  } = useGameStore();

  // const [showParticles, setShowParticles] = React.useState(false); // Temporarily disabled
  const [lastMatchedPairs, setLastMatchedPairs] = React.useState(0);
  const [resetTrigger, setResetTrigger] = React.useState(0);

  useEffect(() => {
    // Handle hardware back button
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    // Show particles when a new match is made (temporarily disabled)
    if (matchedPairs > lastMatchedPairs) {
      // setShowParticles(true); // Temporarily disabled
      setLastMatchedPairs(matchedPairs);
    }
  }, [matchedPairs]); // Remove lastMatchedPairs from dependencies to prevent infinite loop

  useEffect(() => {
    // Navigate to GameOver screen when game is complete
    if (isGameComplete) {
      setTimeout(() => {
        navigation.navigate('GAME_OVER_SCREEN');
      }, 1500); // Delay to show the celebration
    }
  }, [isGameComplete, navigation]);

  const handleBackPress = () => {
    Alert.alert(
      'Exit game',
      'Are you sure you want to exit? Current progress will be lost.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Exit',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ],
    );
    return true;
  };

  const handleResetPress = () => {
    Alert.alert(
      'Replay',
      'Are you sure you want to start over? Current progress will be lost.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Replay',
          style: 'destructive',
          onPress: () => {
            resetGame();
            setResetTrigger(prev => prev + 1);
          },
        },
      ],
    );
  };

  const handleTimeUpdate = useCallback(
    (time: number) => {
      updateTime(time);
    },
    [updateTime],
  );

  const handleCardPress = (cardId: string) => {
    if (!isGameComplete) {
      flipCard(cardId);
    }
  };

  return (
    <View style={styles.container}>
      <GameHeader
        attempts={attempts}
        matchedPairs={matchedPairs}
        totalPairs={currentLevel.pairs}
        levelName={currentLevel.name}
        isGameComplete={isGameComplete}
        onBackPress={handleBackPress}
        onResetPress={handleResetPress}
        onTimeUpdate={handleTimeUpdate}
        resetTrigger={resetTrigger}
      />

      <ScrollView
        contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.gameContainer}>
          <GameBoard
            cards={cards}
            onCardPress={handleCardPress}
            gridSize={currentLevel.gridSize}
          />
        </View>
      </ScrollView>

      {/* Temporarily disabled ParticleEffect to avoid animation conflicts */}
      {/* <ParticleEffect
        show={showParticles}
        onComplete={() => setShowParticles(false)}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
});

export default GameScreen;
