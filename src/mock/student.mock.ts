import { Plan } from '../models/plan.model';

export const MOCK_PLANS: Plan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 999,
    originalPrice: 1999,
    trialDays: 3,
    features: [
      { icon: 'Zap', label: 'AI credits', value: '100' },
      { icon: 'MessageCircle', label: 'human chat credits', value: '5' },
      { icon: 'Headphones', label: 'audio/video minutes', value: '60' },
      { icon: 'Video', label: 'Live class access', value: '1' },
    ],
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: 2499,
    originalPrice: 4999,
    trialDays: 3,
    features: [
      { icon: 'Zap', label: 'AI credits', value: '1000' },
      { icon: 'MessageCircle', label: 'human chat credits', value: '50' },
      { icon: 'Headphones', label: 'audio/video minutes', value: '600' },
      { icon: 'Video', label: 'Live class access', value: '10' },
    ],
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 4999,
    originalPrice: 9999,
    isRecommended: true,
    trialDays: 3,
    features: [
      { icon: 'Zap', label: 'AI credits', value: 'Unlimited' },
      { icon: 'MessageCircle', label: 'human chat credits', value: '500' },
      { icon: 'Headphones', label: 'audio/video minutes', value: 'Unlimited' },
      { icon: 'Video', label: 'Live class access', value: 'Unlimited' },
    ],
  },
];
