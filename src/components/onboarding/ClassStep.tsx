import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SelectCard } from '@/src/components/ui/SelectCard';
import { normalize } from '@/src/utils/responsive';
import { User, Users, GraduationCap } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface ClassStepProps {
  selectedClasses: string[];
  onSelect: (id: string) => void;
}

const classes = [
  { id: '1', label: 'Class 1', subLabel: 'Primary', icon: <User size={20} color="#fff" /> },
  { id: '2', label: 'Class 2', subLabel: 'Primary', icon: <Users size={20} color="#fff" /> },
  { id: '3', label: 'Class 3', subLabel: 'Primary', icon: <Users size={20} color="#fff" /> },
  { id: '4', label: 'Class 4', subLabel: 'Primary', icon: <Users size={20} color="#fff" /> },
  { id: '5', label: 'Class 5', subLabel: 'Primary', icon: <Users size={20} color="#fff" /> },
  { id: '6', label: 'Class 6', subLabel: 'Middle School', icon: <GraduationCap size={20} color="#fff" /> },
  { id: '7', label: 'Class 7', subLabel: 'Middle School', icon: <GraduationCap size={20} color="#fff" /> },
  { id: '8', label: 'Class 8', subLabel: 'Middle School', icon: <GraduationCap size={20} color="#fff" /> },
  { id: '9', label: 'Class 9', subLabel: 'High School', icon: <GraduationCap size={20} color="#fff" /> },
  { id: '10', label: 'Class 10', subLabel: 'High School', icon: <GraduationCap size={20} color="#fff" /> },
  { id: '11', label: 'Class 11', subLabel: 'Senior High', icon: <GraduationCap size={20} color="#fff" /> },
  { id: '12', label: 'Class 12', subLabel: 'Senior High', icon: <GraduationCap size={20} color="#fff" /> },
];

export const ClassStep = ({ selectedClasses, onSelect }: ClassStepProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose the individual classes you will teach at VLM Academy.</Text>
      
      <View style={styles.grid}>
        {classes.map((cls, index) => (
          <Animated.View 
            key={cls.id} 
            entering={FadeInDown.delay(index * 50).duration(400)}
            style={styles.cardWrapper}
          >
            <SelectCard 
              label={cls.label}
              subLabel={cls.subLabel}
              icon={cls.icon}
              isSelected={selectedClasses.includes(cls.id)}
              onPress={() => onSelect(cls.id)}
              variant="horizontal"
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
    marginBottom: normalize(30),
    lineHeight: normalize(20),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
    marginBottom: normalize(12),
  },
  card: {
    height: normalize(60),
    padding: normalize(10),
  },
});
