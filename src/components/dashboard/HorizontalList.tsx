import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { normalize, scale, wp } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { Play, ChevronRight } from 'lucide-react-native';
import { GlassCard } from '../ui/GlassCard';

interface HorizontalListProps {
  title: string;
  data: any[];
  type: 'session' | 'video';
  onItemPress: (item: any) => void;
}

export const HorizontalList = ({ title, data, type, onItemPress }: HorizontalListProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={type === 'session' ? wp(45) + normalize(12) : wp(40) + normalize(12)}
        decelerationRate="fast"
      >
        {data.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            activeOpacity={0.9}
            onPress={() => onItemPress(item)}
          >
            <GlassCard style={type === 'session' ? styles.sessionCard : styles.videoCard} noPadding>
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} referrerPolicy="no-referrer" />
              
              {type === 'session' ? (
                <View style={styles.sessionInfo}>
                  <View style={styles.sessionText}>
                    <View style={styles.liveBadge}>
                      <Text style={styles.liveText}>LIVE</Text>
                    </View>
                    <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
                    <Text style={styles.itemSubtitle}>{item.teacher}</Text>
                  </View>
                  <ChevronRight size={scale(16)} color="rgba(255,255,255,0.5)" />
                </View>
              ) : (
                <View style={styles.videoOverlay}>
                  <View style={styles.playButton}>
                    <Play size={scale(20)} color="#fff" fill="#fff" />
                  </View>
                  <Text style={styles.videoTitle}>{item.title}</Text>
                </View>
              )}
            </GlassCard>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: normalize(24),
  },
  title: {
    ...TYPOGRAPHY.h4,
    color: '#fff',
    fontSize: normalize(14),
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: normalize(12),
    paddingHorizontal: normalize(20),
  },
  scrollContent: {
    paddingHorizontal: normalize(20),
    gap: normalize(12),
  },
  sessionCard: {
    width: wp(45),
    height: normalize(240),
  },
  videoCard: {
    width: wp(40),
    height: normalize(220),
  },
  thumbnail: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.8,
  },
  sessionInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: normalize(12),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sessionText: {
    flex: 1,
  },
  liveBadge: {
    backgroundColor: '#EF4444',
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(2),
    borderRadius: normalize(4),
    alignSelf: 'flex-start',
    marginBottom: normalize(6),
  },
  liveText: {
    color: '#fff',
    fontSize: normalize(10),
    fontWeight: '900',
  },
  itemTitle: {
    color: '#fff',
    fontSize: normalize(13),
    fontWeight: '700',
    lineHeight: normalize(18),
  },
  itemSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: normalize(11),
    marginTop: normalize(4),
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playButton: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  videoTitle: {
    position: 'absolute',
    bottom: normalize(12),
    left: normalize(12),
    right: normalize(12),
    color: '#fff',
    fontSize: normalize(13),
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
