import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './StaticCard'; // Use StaticCard to avoid animation conflicts
import { Card as CardType } from '../../types/game.types';
import { getGridDimensions } from '../../utils/gameUtils';
import {
  getResponsiveGameBoardLayout,
  getResponsiveCardDimensions
} from '../../utils/responsiveUtils';

interface GameBoardProps {
  cards: CardType[];
  onCardPress: (cardId: string) => void;
  gridSize: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardPress, gridSize }) => {
  const { rows, cols } = getGridDimensions(gridSize);

  // Get responsive layout settings
  const layout = getResponsiveGameBoardLayout(gridSize);
  const { spacing: cardSpacing } = getResponsiveCardDimensions(gridSize);

  const renderRow = (rowIndex: number) => {
    const rowCards = cards.slice(rowIndex * cols, (rowIndex + 1) * cols);

    return (
      <View key={rowIndex} style={[styles.row, { marginBottom: cardSpacing / 2 }]}>
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

  const dynamicStyles = {
    container: {
      paddingHorizontal: layout.containerPadding,
    },
    board: {
      maxWidth: layout.boardMaxWidth,
      alignSelf: layout.centerContent ? 'center' as const : 'flex-start' as const,
    },
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <View style={[styles.board, dynamicStyles.board]}>
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
