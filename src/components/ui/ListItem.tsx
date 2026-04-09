import React from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import { COLORS } from '@/src/constants/colors';
import { normalize } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';

interface ListItemProps {
  label: string;
  icon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const ListItem: React.FC<ListItemProps> = ({ label, icon, rightElement }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={styles.label}>{label}</Text>
      </View>
      {rightElement && <View style={styles.right}>{rightElement}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: normalize(6),
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: normalize(10),
  },
  icon: {
    width: normalize(20),
    alignItems: 'center',
  },
  label: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    fontSize: normalize(14),
  },
  right: {
    alignItems: 'flex-end',
  },
});
