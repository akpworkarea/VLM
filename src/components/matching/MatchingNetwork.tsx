import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { TeacherNode as TeacherNodeModel } from '../../models/matching.model';
import { PulseCircle } from './PulseCircle';
import { TeacherNode } from './TeacherNode';
import { ConnectionLine } from './ConnectionLine';
import { scale, wp } from '@/src/utils/responsive';

interface MatchingNetworkProps {
  teachers: TeacherNodeModel[];
}

const { width } = Dimensions.get('window');
const NETWORK_SIZE = wp(80);
const CENTER = NETWORK_SIZE / 2;
const RADIUS = wp(30);

export const MatchingNetwork = ({ teachers }: MatchingNetworkProps) => {
  return (
    <View style={styles.container}>
      {/* Connection Lines */}
      {teachers.map((teacher, index) => {
        const angle = (index * (360 / Math.max(teachers.length, 4)) - 90) * (Math.PI / 180);
        const tx = CENTER + RADIUS * Math.cos(angle);
        const ty = CENTER + RADIUS * Math.sin(angle);
        
        return (
          <ConnectionLine 
            key={`line-${teacher.id}`}
            x1={CENTER}
            y1={CENTER}
            x2={tx}
            y2={ty}
          />
        );
      })}

      {/* Center Node */}
      <View style={styles.centerNode}>
        <PulseCircle label="VLM" subLabel="DOUBT RESOLVED" />
      </View>

      {/* Teacher Nodes */}
      {teachers.map((teacher, index) => {
        const angle = (index * (360 / Math.max(teachers.length, 4)) - 90) * (Math.PI / 180);
        const tx = CENTER + RADIUS * Math.cos(angle) - scale(25);
        const ty = CENTER + RADIUS * Math.sin(angle) - scale(25);

        return (
          <View 
            key={teacher.id}
            style={[styles.teacherNode, { left: tx, top: ty }]}
          >
            <TeacherNode 
              avatar={teacher.avatar} 
              isOnline={teacher.isOnline} 
              delay={index * 100}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: NETWORK_SIZE,
    height: NETWORK_SIZE,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerNode: {
    zIndex: 10,
  },
  teacherNode: {
    position: 'absolute',
    zIndex: 5,
  },
});
