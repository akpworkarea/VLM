import { normalize } from '../utils/responsive';

export const TYPOGRAPHY = {
  h1: {
    fontSize: normalize(32),
    fontWeight: '800' as const,
  },
  h2: {
    fontSize: normalize(24),
    fontWeight: '700' as const,
  },
  h3: {
    fontSize: normalize(18),
    fontWeight: '700' as const,
  },
  h4: {
    fontSize: normalize(14),
    fontWeight: '600' as const,
  },
  body: {
    fontSize: normalize(16),
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: normalize(12),
    fontWeight: '400' as const,
  },
  button: {
    fontSize: normalize(16),
    fontWeight: '600' as const,
  },
};
