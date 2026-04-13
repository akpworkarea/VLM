import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { DashboardCard } from './DashboardCard';
import { normalize, scale } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { Button } from '../ui/Button';
import { Clock } from 'lucide-react-native';

interface ActionCardProps {
  type: 'spin' | 'live';
  title: string;
  subtitle?: string;
  buttonText: string;
  onPress: () => void;
  glowType: 'blue' | 'yellow' | 'red' | 'purple';
  delay?: number;
  liveData?: {
    topic: string;
    teacher: string;
    avatar: string;
    time: string;
  };
}

export const ActionCard = ({ 
  type, 
  title, 
  subtitle, 
  buttonText, 
  onPress, 
  glowType, 
  delay = 0,
  liveData 
}: ActionCardProps) => {
  return (
    <DashboardCard 
      glow 
      glowType={glowType} 
      delay={delay}
      style={styles.card}
    >
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

      {type === 'spin' ? (
        <View style={styles.spinContent}>
          <View style={styles.timerContainer}>
            <Clock size={scale(48)} color={getGlowColor(glowType)} />
          </View>
          <Button 
            text={buttonText} 
            onPress={onPress} 
            style={styles.button}
            variant="warning"
            glow
          />
        </View>
      ) : (
        <View style={styles.liveContent}>
          {liveData && (
            <>
              <View style={styles.liveDetails}>
                <Text style={styles.topicLabel}>Topic: <Text style={styles.topicValue}>{liveData.topic}</Text></Text>
                <Text style={styles.timeLabel}>Time: <Text style={styles.timeValue}>{liveData.time}</Text></Text>
              </View>
              <View style={styles.teacherRow}>
                <Image source={{ uri: liveData.avatar }} style={styles.avatar} referrerPolicy="no-referrer" />
                <Text style={styles.teacherName}>{liveData.teacher}</Text>
              </View>
            </>
          )}
          <Button 
            text={buttonText} 
            onPress={onPress} 
            style={styles.button}
            glow
          />
        </View>
      )}
    </DashboardCard>
  );
};

const getGlowColor = (type: string) => {
  switch (type) {
    case 'yellow': return '#EAB308';
    case 'red': return '#EF4444';
    case 'purple': return '#A855F7';
    default: return '#22d3ee';
  }
};

const styles = StyleSheet.create({
  card: {
    padding: normalize(16),
    minHeight: normalize(180),
  },
  title: {
    ...TYPOGRAPHY.h4,
    color: '#fff',
    fontSize: normalize(14),
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: 'rgba(255,255,255,0.5)',
    fontSize: normalize(10),
    marginTop: normalize(2),
  },
  spinContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: normalize(10),
  },
  timerContainer: {
    marginVertical: normalize(10),
  },
  liveContent: {
    flex: 1,
    marginTop: normalize(10),
  },
  liveDetails: {
    marginBottom: normalize(10),
  },
  topicLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: normalize(10),
  },
  topicValue: {
    color: '#fff',
    fontWeight: '600',
  },
  timeLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: normalize(10),
    marginTop: normalize(2),
  },
  timeValue: {
    color: '#fff',
    fontWeight: '600',
  },
  teacherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: normalize(15),
  },
  avatar: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    marginRight: normalize(8),
  },
  teacherName: {
    color: '#fff',
    fontSize: normalize(12),
    fontWeight: '500',
  },
  button: {
    height: normalize(40),
    borderRadius: normalize(20),
  },
});
