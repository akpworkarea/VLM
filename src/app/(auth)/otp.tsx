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

export default function OTPScreen() {
  const router = useRouter();
  const { role } = useUserStore();
  const [otp, setOtp] = React.useState('');

  const handleVerify = () => {
    // Logic for OTP verification
    if (otp.length === 4) {
      // Navigate based on role
      switch (role) {
        case 'teacher':
          router.replace('/(teacher)/basic-info');
          break;
        case 'student':
          router.replace('/(student)/onboarding');
          break;
        case 'parent':
          router.replace('/(parent)/onboarding');
          break;
        default:
          router.replace('/role-selection');
      }
    }
  };

  return (
    <ScreenWrapper>
      <PageHeader 
        title="VLM Academy" 
        subtitle="VERIFY OTP" 
        showBack={true} 
      />

      <View style={styles.container}>
        <Text style={styles.label}>Enter the 4-digit code sent to your mobile</Text>
        <Input
          label="Verification Code"
          placeholder="0 0 0 0"
          value={otp}
          onChangeText={setOtp}
          keyboardType="numeric"
          maxLength={4}
          style={styles.otpInput}
        />
        
        <Button 
          text="VERIFY & CONTINUE" 
          onPress={handleVerify} 
          style={styles.button}
          disabled={otp.length < 4}
        />

        <Text style={styles.resendText}>
          Didn't receive code? <Text style={styles.resendLink}>Resend</Text>
        </Text>
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
  otpInput: {
    textAlign: 'center',
    fontSize: normalize(24),
    letterSpacing: normalize(10),
  },
  button: {
    marginTop: normalize(20),
  },
  resendText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: normalize(20),
  },
  resendLink: {
    color: COLORS.primary,
    fontWeight: '700',
  },
});
