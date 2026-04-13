import React from 'react';
import { Tabs } from 'expo-router';
import { Home, MessageSquare, BookOpen, PlayCircle, User } from 'lucide-react-native';
import { COLORS } from '@/src/constants/colors';
import { scale, normalize } from '@/src/utils/responsive';
import { BlurView } from 'expo-blur';
import { StyleSheet, Platform } from 'react-native';

export default function StudentTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.cyan,
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.4)',
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
        ),
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={scale(24)} color={color} />,
        }}
      />
      <Tabs.Screen
        name="doubt"
        options={{
          title: 'Doubt',
          tabBarIcon: ({ color }) => <MessageSquare size={scale(24)} color={color} />,
        }}
      />
      <Tabs.Screen
        name="mcq"
        options={{
          title: 'MCQ',
          tabBarIcon: ({ color }) => <BookOpen size={scale(24)} color={color} />,
        }}
      />
      <Tabs.Screen
        name="live"
        options={{
          title: 'Live',
          tabBarIcon: ({ color }) => <PlayCircle size={scale(24)} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={scale(24)} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    elevation: 0,
    height: Platform.OS === 'ios' ? normalize(88) : normalize(64),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  tabBarLabel: {
    fontSize: normalize(10),
    fontWeight: '600',
    marginBottom: Platform.OS === 'ios' ? 0 : normalize(8),
  },
});
