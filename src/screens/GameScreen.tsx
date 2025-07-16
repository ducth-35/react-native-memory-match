import React, { useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  BackHandler,
  Alert,
  ScrollView,
} from 'react-native';
import GameHeader from '../components/game/GameHeader';
import GameBoard from '../components/game/GameBoard';
// import ParticleEffect from '../components/game/ParticleEffect'; // Temporarily disabled
import useGameStore from '../store/useGameStore';

interface GameScreenProps {
  navigation: any;
}

const GameScreen: React.FC<GameScreenProps> = ({ navigation }) => {
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
      handleBackPress
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
      'Thoát game',
      'Bạn có chắc muốn thoát? Tiến trình hiện tại sẽ bị mất.',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Thoát',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ]
    );
    return true;
  };

  const handleResetPress = () => {
    Alert.alert(
      'Chơi lại',
      'Bạn có chắc muốn bắt đầu lại? Tiến trình hiện tại sẽ bị mất.',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Chơi lại',
          style: 'destructive',
          onPress: () => {
            resetGame();
            setResetTrigger(prev => prev + 1);
          },
        },
      ]
    );
  };

  const handleTimeUpdate = useCallback((time: number) => {
    updateTime(time);
  }, [updateTime]);

  const handleCardPress = (cardId: string) => {
    if (!isGameComplete) {
      flipCard(cardId);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0F23" />
      
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

      <ScrollView  contentContainerStyle={{  paddingBottom:50}} showsVerticalScrollIndicator={false}>
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
