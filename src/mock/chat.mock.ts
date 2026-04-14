import { Message, ChatAction } from '../models/chat.model';

export const MOCK_AI_RESPONSES: Record<string, string> = {
  default: "Certainly, Aryan! Let's solve this quadratic equation.\n\nFirst, we find the discriminant, D = b² - 4ac.\nFor this equation, a=3, b=-5, c=2.\nD = (-5)² - 4(3)(2) = 25 - 24 = 1.\nSince D > 0, there are two real roots.\n\nNow we use the quadratic formula:\nx =[-b ± √D] / 2a.\nx = [-(-5) ± √1] / 2(3).\nx = [5 ± 1] / 6.\n\nThis gives two roots: x1 = (5+1)/6 = 1 and x2 = (5-1)/6 = 4/6 = 2/3.\n\nSo, the roots are x=1 and x=2/3.",
  simplify: "In simpler terms: We are looking for values of 'x' that make the equation equal to zero. By using a standard formula, we found that if x is 1 or 2/3, the equation works out perfectly!",
  example: "Here's another example: 2x² - 5x + 3 = 0. Try solving it using the same steps we just did!",
  translate: "निश्चित रूप से! इस द्विघात समीकरण को हल करते हैं। सबसे पहले हम विविक्तकर (D) ज्ञात करते हैं...",
  practice: "Ready for a challenge? Solve this: 4x² - 8x + 3 = 0. Show me your steps!"
};

export const getMockAIResponse = (message: string, action?: ChatAction): string => {
  if (action) return MOCK_AI_RESPONSES[action] || MOCK_AI_RESPONSES.default;
  return MOCK_AI_RESPONSES.default;
};
