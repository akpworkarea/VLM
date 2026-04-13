export interface Plan {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  isRecommended?: boolean;
  features: {
    icon: string;
    label: string;
    value: string;
  }[];
  trialDays?: number;
}
