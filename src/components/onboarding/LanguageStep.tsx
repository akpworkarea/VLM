import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SelectCard } from '@/src/components/ui/SelectCard';
import { normalize } from '@/src/utils/responsive';
import { Globe, Languages, MessageSquare, Type, Hash, MoreHorizontal } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface LanguageStepProps {
  selectedLanguages: string[];
  onSelect: (id: string) => void;
}

export const LanguageStep = ({ selectedLanguages, onSelect }: LanguageStepProps) => {
  const languages = [
    { id: 'hindi', label: 'Hindi', subLabel: 'हिंदी', icon: <Text style={styles.iconText}>हि</Text> },
    { id: 'english', label: 'English', subLabel: 'English', icon: <Globe size={24} color="#fff" /> },
    { id: 'hinglish', label: 'Hinglish', subLabel: 'हिA', icon: <Languages size={24} color="#fff" /> },
    { id: 'telugu', label: 'Telugu', subLabel: 'తెలుగు', icon: <MessageSquare size={24} color="#fff" /> },
    { id: 'bengali', label: 'Bengali', subLabel: 'বাংলা', icon: <Type size={24} color="#fff" /> },
    { id: 'marathi', label: 'Marathi', subLabel: 'मराठी', icon: <Hash size={24} color="#fff" /> },
    { id: 'punjabi', label: 'Punjabi', subLabel: 'ਪੰਜਾਬੀ', icon: <Text style={styles.iconText}>ਪੰ</Text> },
    { id: 'others', label: 'Others', subLabel: 'अन्य', icon: <MoreHorizontal size={24} color="#fff" /> },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose the languages you are comfortable teaching in (multi-select).</Text>
      
      <View style={styles.grid}>
        {languages.map((lang, index) => (
          <Animated.View 
            key={lang.id} 
            entering={FadeInDown.delay(index * 100).duration(500)}
            style={styles.cardWrapper}
          >
            <SelectCard 
              label={lang.label}
              subLabel={lang.subLabel}
              icon={lang.icon}
              isSelected={selectedLanguages.includes(lang.id)}
              onPress={() => onSelect(lang.id)}
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
