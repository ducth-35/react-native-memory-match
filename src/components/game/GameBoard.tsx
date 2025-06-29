import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Card from './StaticCard'; // Use StaticCard to avoid animation conflicts
import { Card as CardType } from '../../types/game.types';
import { getGridDimensions } from '../../utils/gameUtils';

interface GameBoardProps {
  cards: CardType[];
  onCardPress: (cardId: string) => void;
  gridSize: number;
}

const { width } = Dimensions.get('window');

const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardPress, gridSize }) => {
  const { rows, cols } = getGridDimensions(gridSize);

  const renderRow = (rowIndex: number) => {
    const rowCards = cards.slice(rowIndex * cols, (rowIndex + 1) * cols);
    
    return (
      <View key={rowIndex} style={styles.row}>
        {rowCards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onPress={onCardPress}
            gridSize={gridSize}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {Array.from({ length: rows }, (_, index) => renderRow(index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
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
});

export default GameBoard;
