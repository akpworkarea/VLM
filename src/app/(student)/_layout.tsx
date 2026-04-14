import { Stack } from 'expo-router';

export default function StudentLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding-intro" />
      <Stack.Screen name="student-profile" />
      <Stack.Screen name="subscription-plan" />
      <Stack.Screen name="teacher-searching" />
      <Stack.Screen name="ai-tutor" />
      <Stack.Screen name="human-chat" />
    </Stack>
  );
}
