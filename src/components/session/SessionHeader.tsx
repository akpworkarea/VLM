import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { normalize, scale } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';
import { GlassCard } from '../ui/GlassCard';

interface SessionHeaderProps {
  onBack: () => void;
  subject: string;
  teacherName: string;
  teacherAvatar: string;
  doubtId?: string;
}

export const SessionHeader = ({ onBack, subject, teacherName, teacherAvatar, doubtId = '#VLM-C-458' }: SessionHeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <ChevronLeft size={scale(24)} color="white" />
      </TouchableOpacity>
      
      <GlassCard style={styles.card}>
        <View style={styles.left}>
          <View style={styles.subjectBadge}>
            <Text style={styles.subjectText}>{subject}</Text>
          </View>
        </View>

        <View style={styles.right}>
          <Image 
            source={{ uri: teacherAvatar }} 
            style={styles.avatar} 
            referrerPolicy="no-referrer"
          />
          <View>
            <Text style={styles.name}>{teacherName}</Text>
            <Text style={styles.doubtId}>Doubt ID: {doubtId}</Text>
          </View>
        </View>
      </GlassCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(20),
    gap: normalize(12),
    marginTop: normalize(10),
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: normalize(12),
    borderRadius: normalize(16),
  },
  left: {
    flex: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(8),
  },
  subjectBadge: {
    paddingHorizontal: normalize(10),
    paddingVertical: normalize(4),
    borderRadius: normalize(20),
    borderWidth: 1,
    borderColor: COLORS.cyan,
    alignSelf: 'flex-start',
  },
  subjectText: {
    color: COLORS.cyan,
    fontSize: normalize(10),
    fontWeight: '700',
  },
  avatar: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    borderWidth: 1.5,
    borderColor: COLORS.yellow,
  },
  name: {
    color: 'white',
    fontSize: normalize(12),
    fontWeight: '700',
  },
  doubtId: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: normalize(8),
  },
});
