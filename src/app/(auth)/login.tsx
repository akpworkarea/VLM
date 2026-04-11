import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { PageHeader } from '@/src/components/layout/PageHeader';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { normalize } from '@/src/utils/responsive';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { COLORS } from '@/src/constants/colors';
import { useUserStore } from '@/src/store/useUserStore';

export default function LoginScreen() {
  const router = useRouter();
  const { role } = useUserStore();
  const [phone, setPhone] = React.useState('');

  return (
    <ScreenWrapper>
      <PageHeader 
        title="VLM Academy" 
        subtitle={`LOGIN AS ${role?.toUpperCase()}`} 
        showBack={true} 
      />

      <View style={styles.container}>
        <Text style={styles.label}>Enter your mobile number to continue</Text>
        <Input
          label="Mobile Number"
          placeholder="Enter 10 digit number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          maxLength={10}
        />
        
        <Button 
          text="GET OTP" 
          onPress={() => router.push('/otp')} 
          style={styles.button}
          disabled={phone.length < 10}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalize(20),
    marginTop: normalize(40),
  },
  label: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: normalize(20),
    textAlign: 'center',
  },
  button: {
    marginTop: normalize(20),
  },
});
