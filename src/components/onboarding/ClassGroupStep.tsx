import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SelectCard } from '@/src/components/ui/SelectCard';
import { normalize } from '@/src/utils/responsive';
import { Users, GraduationCap, School, BookOpen } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface ClassGroupStepProps {
  selectedGroups: string[];
  onSelect: (id: string) => void;
}

const groups = [
  { id: '1-5', label: 'Class 1 to 5', subLabel: 'Primary Classes (1-5)', icon: <Users size={48} color="#fff" /> },
  { id: '6-8', label: 'Class 6 to 8', subLabel: 'Middle School Classes (6-8)', icon: <GraduationCap size={48} color="#fff" /> },
  { id: '9-10', label: 'Class 9 to 10', subLabel: 'High School Classes (9-10)', icon: <School size={48} color="#fff" /> },
  { id: '11-12', label: 'Class 11 to 12', subLabel: 'Senior High Classes (11-12)', icon: <BookOpen size={48} color="#fff" /> },
];

export const ClassGroupStep = ({ selectedGroups, onSelect }: ClassGroupStepProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose the class groups you will teach at VLM Academy.</Text>
      
      <View style={styles.grid}>
        {groups.map((group, index) => (
          <Animated.View 
            key={group.id} 
            entering={FadeInDown.delay(index * 150).duration(500)}
            style={styles.cardWrapper}
          >
            <SelectCard 
              label={group.label}
              subLabel={group.subLabel}
              icon={group.icon}
              isSelected={selectedGroups.includes(group.id)}
              onPress={() => onSelect(group.id)}
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
    marginBottom: normalize(16),
  },
  card: {
    height: normalize(200),
  },
});
