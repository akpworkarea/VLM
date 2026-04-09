import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SelectCard } from '@/src/components/ui/SelectCard';
import { normalize } from '@/src/utils/responsive';
import { School, Landmark } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface BoardStepProps {
  selectedBoard: string;
  onSelect: (id: string) => void;
}

const boards = [
  { id: 'cbse', label: 'CBSE', subLabel: 'Central Board of Secondary Education', icon: <School size={48} color="#FFD700" /> },
  { id: 'state', label: 'STATE BOARD', subLabel: 'Localized State Educational Board', icon: <Landmark size={48} color="#FFD700" /> },
];

export const BoardStep = ({ selectedBoard, onSelect }: BoardStepProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose the educational boards you will teach at VLM Academy</Text>
      
      <View style={styles.list}>
        {boards.map((board, index) => (
          <Animated.View 
            key={board.id} 
            entering={FadeInDown.delay(index * 200).duration(600)}
            style={styles.cardWrapper}
          >
            <SelectCard 
              label={board.label}
              subLabel={board.subLabel}
              icon={board.icon}
              isSelected={selectedBoard === board.id}
              onPress={() => onSelect(board.id)}
              variant="large"
              style={styles.card}
            />
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalize(20),
  },
  title: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: normalize(14),
    textAlign: 'center',
    marginBottom: normalize(40),
    lineHeight: normalize(20),
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
  },
  card: {
    height: normalize(220),
  },
});
