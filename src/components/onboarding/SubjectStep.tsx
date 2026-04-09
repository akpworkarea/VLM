import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SelectCard } from '@/src/components/ui/SelectCard';
import { normalize } from '@/src/utils/responsive';
import { 
  Calculator, 
  Atom, 
  FlaskConical, 
  Dna, 
  Book, 
  Globe, 
  History, 
  Coins, 
  Monitor, 
  Star,
  Zap,
  Leaf
} from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface SubjectStepProps {
  selectedSubjects: string[];
  onSelect: (id: string) => void;
}

export const SubjectStep = ({ selectedSubjects, onSelect }: SubjectStepProps) => {
  const subjects = [
    { id: 'maths', label: 'Maths', icon: <Calculator size={24} color="#3B82F6" /> },
    { id: 'science', label: 'Science', icon: <Atom size={24} color="#fff" /> },
    { id: 'physics', label: 'Physics', icon: <Zap size={24} color="#A855F7" /> },
    { id: 'chemistry', label: 'Chemistry', icon: <FlaskConical size={24} color="#EAB308" /> },
    { id: 'biology', label: 'Biology', icon: <Leaf size={24} color="#22C55E" /> },
    { id: 'english', label: 'English', icon: <Book size={24} color="#fff" /> },
    { id: 'hindi', label: 'Hindi', icon: <Text style={styles.iconText}>श्र</Text> },
    { id: 'sst', label: 'SST', icon: <Globe size={24} color="#fff" /> },
    { id: 'accounts', label: 'Accounts', icon: <Book size={24} color="#fff" /> },
    { id: 'economics', label: 'Economics', icon: <Coins size={24} color="#fff" /> },
    { id: 'computer', label: 'Computer', icon: <Monitor size={24} color="#fff" /> },
    { id: 'others', label: 'Others', icon: <Star size={24} color="#fff" /> },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Subjects</Text>
      
      <View style={styles.grid}>
        {subjects.map((sub, index) => (
          <Animated.View 
            key={sub.id} 
            entering={FadeInDown.delay(index * 80).duration(500)}
            style={styles.cardWrapper}
          >
            <SelectCard 
              label={sub.label}
              icon={sub.icon}
              isSelected={selectedSubjects.includes(sub.id)}
              onPress={() => onSelect(sub.id)}
              variant="grid"
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
    color: '#fff',
    fontSize: normalize(24),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: normalize(40),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '31%',
    marginBottom: normalize(12),
  },
  card: {
    width: '100%',
    aspectRatio: 0.9,
  },
  iconText: {
    color: '#fff',
    fontSize: normalize(24),
    fontWeight: '700',
  },
});
