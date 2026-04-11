import { StyleSheet, Platform } from 'react-native';
import { normalize } from '../utils/responsive';

export const glassStyles = StyleSheet.create({
  container: {
    borderRadius: normalize(20),
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.2)',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    padding: normalize(16),
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: normalize(16),
    borderWidth: 1,
  },
  inputFocused: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(99, 102, 241, 0.5)', // COLORS.primary with opacity
  },
  glow: {
    ...Platform.select({
      ios: {
        shadowColor: '#22d3ee',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
      },
      android: {
        elevation: 10,
      },
    }),
  }
});

export const GLASS_CONFIG = {
  intensity: 20,
  tint: 'dark' as const,
  gradientColors: ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.02)'] as const,
};
