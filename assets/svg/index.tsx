import React from 'react';
import { Svg, Path, Text, G, Rect, Circle, Line } from 'react-native-svg';

export const Logo = () => (
  <Svg width="200" height="60" viewBox="0 0 200 60">
    <Path d="M20 10L10 40H30L20 10Z" fill="#D4AF37" />
    <Text x="45" y="35" fill="white" fontSize="20" fontWeight="bold">VLM ACADEMY</Text>
    <Text x="45" y="50" fill="#A1A1AA" fontSize="10">Teacher App</Text>
  </Svg>
);

export const EducatorIllustration = () => {
  return (

  <Svg width="400" height="200" viewBox="0 0 400 200">
    {/* Background Circle */}
    <Circle cx="200" cy="100" r="72" fill="#3B4BCA66" fillOpacity={0.5} />
    
    {/* Main Card */}
    <Rect x="107" y="40" width="186" height="120" rx={8} fill="#0F172A" />
    
    {/* Center Yellow Circle */}
    <Circle cx="200" cy="90" r="30" fill="#D97706" />
    
    {/* Top Left Grey Box */}
    <Rect x="117" y="50" width="36" height="24" rx={4} fill="#475569" />
    <Circle cx="135" cy="62" r="4" fill="white" />
    
    {/* Top Right Grey Box */}
    <Rect x="247" y="50" width="36" height="24" rx={4} fill="#475569" />
    <Circle cx="265" cy="62" r="4" fill="white" />
    
    {/* Middle Right Grey Box */}
    <Rect x="247" y="80" width="36" height="24" rx={4} fill="#475569" />
    <Circle cx="265" cy="92" r="4" fill="white" />
    
    {/* Bottom Right Green Circle with Checkmark */}
    <Circle cx="270" cy="135" r="20" fill="#22C55E" />
      <Path
        d="M262 135L267 140L278 129"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    
    {/* Left Side Yellow Pill */}
    <Rect x="87" y="110" width="56" height="32" rx={16} fill="#D97706" fillOpacity={0.8} />
    <Circle cx="103" cy="126" r="6" fill="#FDE68A" />
    <Rect x="115" y="125" width="20" height="2" rx={1} fill="#FDE68A" />
    
    {/* Bottom Arch */}
    <Path
      d="M157 160C157 137.909 176.252 120 200 120C223.748 120 243 137.909 243 160"
      fill="#6366F1"
      fillOpacity={0.8}
    />
  </Svg>
);
};


