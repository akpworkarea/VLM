import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity, Platform } from 'react-native';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { PageHeader } from '@/src/components/layout/PageHeader';
import { StepIndicator } from '@/src/components/ui/StepIndicator';
import { GlassCard } from '@/src/components/ui/GlassCard';
import { AvatarUpload } from '@/src/components/ui/AvatarUpload';
import { Input } from '@/src/components/ui/Input';
import { Dropdown } from '@/src/components/ui/Dropdown';
import { Button } from '@/src/components/ui/Button';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Users, 
  Building, 
  Hash,
  ArrowRight
} from 'lucide-react-native';
import { normalize } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';
import { glassStyles } from '@/src/theme/glassStyles';

export default function BasicInfoScreen() {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dob: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    email: 'Pearl@gmail.com',
    phone: '9797979797',
  });

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    console.log('Form Submitted:', formData);
  };

  const Footer = (
    <Button 
      text="CONTINUE TO DOCUMENTS" 
      onPress={handleContinue} 
      icon={<ArrowRight size={normalize(20)} color="white" />}
      iconPosition="right"
    />
  );

  return (
    <ScreenWrapper footer={Footer}>
      <PageHeader subtitle="BASIC INFO" />
      <StepIndicator currentStep={1} totalSteps={5} />
      
      <GlassCard delay={300} style={styles.mainCard}>
        <Text style={styles.cardTitle}>Basic Profile Details <Text style={styles.stepText}>(Step 1 of 5)</Text></Text>
        <Text style={styles.cardSubtitle}>Complete your personal details.</Text>
        
        <View style={styles.topSection}>
          <AvatarUpload onImageChange={(uri) => console.log('Avatar updated:', uri)} />
          <View style={styles.topInputs}>
            <Input 
              label="Full Name" 
              value={formData.fullName} 
              onChangeText={(v) => updateField('fullName', v)}
              icon={<User size={18} color={COLORS.textSecondary} />}
              placeholder="Enter Full Name"
            />
            <Dropdown 
              label="Gender"
              value={formData.gender}
              options={[
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
                { label: 'Other', value: 'Other' }
              ]}
              onSelect={(v) => updateField('gender', v)}
              placeholder="Select Gender"
            />
            <Input 
              label="DOB" 
              value={formData.dob} 
              onPress={() => setDatePickerVisible(true)}
              icon={<Calendar size={18} color={COLORS.textSecondary} />}
              placeholder="DD / MM / YYYY"
              editable={false}
            />
          </View>
        </View>

        <Input 
          label="Address" 
          value={formData.address} 
          onChangeText={(v) => updateField('address', v)}
          icon={<MapPin size={18} color={COLORS.textSecondary} />}
          placeholder="Enter Street Address"
        />

        <View style={styles.row}>
          <View style={styles.cityStateGroup}>
            <Text style={styles.groupLabel}>City / State</Text>
            <Dropdown 
              label="City"
              value={formData.city}
              options={[
                { label: 'New Delhi', value: 'New Delhi' },
                { label: 'Mumbai', value: 'Mumbai' },
                { label: 'Bangalore', value: 'Bangalore' }
              ]}
              onSelect={(v) => updateField('city', v)}
              placeholder="City"
            />
            <View style={styles.separator} />
            <Dropdown 
              label="State"
              value={formData.state}
              options={[
                { label: 'Delhi', value: 'Delhi' },
                { label: 'Maharashtra', value: 'Maharashtra' },
                { label: 'Karnataka', value: 'Karnataka' }
              ]}
              onSelect={(v) => updateField('state', v)}
              placeholder="State"
            />
          </View>
          <View style={styles.pincodeGroup}>
            <Input 
              label="Pincode" 
              value={formData.pincode} 
              onChangeText={(v) => updateField('pincode', v)}
              icon={<Hash size={18} color={COLORS.textSecondary} />}
              placeholder="XXXXXX"
              keyboardType="numeric"
            />
          </View>
        </View>

        <Input 
          label="Email" 
          value={formData.email} 
          onChangeText={(v) => updateField('email', v)}
          icon={<Mail size={18} color={COLORS.textSecondary} />}
          placeholder="Enter Email"
          keyboardType="email-address"
        />

        <Input 
          label="Mobile" 
          value={formData.phone} 
          onChangeText={(v) => updateField('phone', v)}
          icon={<Phone size={18} color={COLORS.textSecondary} />}
          placeholder="Enter Mobile"
          keyboardType="phone-pad"
        />
      </GlassCard>

      <Modal
        visible={isDatePickerVisible}
        transparent
        animationType="slide"
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setDatePickerVisible(false)}
        >
          <View style={styles.datePickerContainer}>
            <Text style={styles.modalTitle}>Select Date of Birth</Text>
            <View style={styles.datePickerMock}>
              <Text style={styles.mockText}>Select Date (Mock)</Text>
              <TouchableOpacity 
                style={styles.dateOption}
                onPress={() => {
                  updateField('dob', '15 / 05 / 1995');
                  setDatePickerVisible(false);
                }}
              >
                <Text style={styles.dateOptionText}>15 / 05 / 1995</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.dateOption}
                onPress={() => {
                  updateField('dob', '20 / 10 / 1990');
                  setDatePickerVisible(false);
                }}
              >
                <Text style={styles.dateOptionText}>20 / 10 / 1990</Text>
              </TouchableOpacity>
            </View>
            <Button text="Close" onPress={() => setDatePickerVisible(false)} />
          </View>
        </TouchableOpacity>
      </Modal>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  cardTitle: {
    color: '#fff',
    fontSize: normalize(18),
    fontWeight: '700',
    textAlign: 'center',
    marginTop: normalize(5),
  },
  stepText: {
    fontWeight: '400',
    fontSize: normalize(16),
  },
  cardSubtitle: {
    color: COLORS.textSecondary,
    fontSize: normalize(13),
    textAlign: 'center',
    marginTop: normalize(6),
    marginBottom: normalize(25),
  },
  mainCard: {
    marginHorizontal: normalize(20),
  },
  topSection: {
    flexDirection: 'row',
    marginBottom: normalize(15),
  },
  topInputs: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: normalize(12),
  },
  cityStateGroup: {
    ...glassStyles.input,
    flex: 1.8,
    padding: normalize(12),
    marginRight: normalize(10),
  },
  groupLabel: {
    color: COLORS.text,
    fontSize: normalize(10),
    fontWeight: '600',
    marginBottom: normalize(4),
    opacity: 0.6,
    marginLeft: normalize(4),
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: normalize(4),
    marginHorizontal: normalize(4),
  },
  pincodeGroup: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  datePickerContainer: {
    backgroundColor: '#1e293b',
    borderTopLeftRadius: normalize(24),
    borderTopRightRadius: normalize(24),
    padding: normalize(24),
    paddingBottom: normalize(40),
  },
  modalTitle: {
    color: '#fff',
    fontSize: normalize(18),
    fontWeight: '700',
    marginBottom: normalize(20),
    textAlign: 'center',
  },
  datePickerMock: {
    marginBottom: normalize(20),
  },
  mockText: {
    color: COLORS.textSecondary,
    fontSize: normalize(14),
    marginBottom: normalize(10),
    textAlign: 'center',
  },
  dateOption: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: normalize(16),
    borderRadius: normalize(12),
    marginBottom: normalize(10),
    alignItems: 'center',
  },
  dateOptionText: {
    color: '#fff',
    fontSize: normalize(16),
    fontWeight: '600',
  },
});
