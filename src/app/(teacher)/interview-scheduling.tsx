import React, { useState, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Edit3, FileClock } from 'lucide-react-native';
import { Calendar } from 'react-native-calendars';
import { format, parseISO } from 'date-fns';
import { ScreenWrapper } from '@/src/components/layout/ScreenWrapper';
import { PageHeader } from '@/src/components/layout/PageHeader';
import { GlassCard } from '@/src/components/ui/GlassCard';
import { Button } from '@/src/components/ui/Button';
import { TimeSlotChip } from '@/src/components/ui/TimeSlotChip';
import { StepIndicator } from '@/src/components/ui/StepIndicator';
import { normalize } from '@/src/utils/responsive';
import { COLORS } from '@/src/constants/colors';
import { useSchedule } from '@/src/hooks/useSchedule';
import { useFadeIn, useSlideUp } from '@/src/hooks/useAnimation';

export default function InterviewSchedulingScreen() {
  const router = useRouter();
  const today = useMemo(() => format(new Date(), 'yyyy-MM-dd'), []);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  
  const { getSlotsForDate, loading } = useSchedule();
  const slots = useMemo(() => getSlotsForDate(selectedDate), [selectedDate, getSlotsForDate]);

  const formattedSelectedDate = useMemo(() => {
    try {
      return format(parseISO(selectedDate), 'EEEE, dd MMM yyyy');
    } catch (e) {
      return selectedDate;
    }
  }, [selectedDate]);

  const shortDate = useMemo(() => {
    try {
      return format(parseISO(selectedDate), 'dd MMM');
    } catch (e) {
      return '';
    }
  }, [selectedDate]);

  const fadeInStyle = useFadeIn(200);
  const headerSlideStyle = useSlideUp(300);

  const handleSchedule = () => {
    if (!selectedSlotId) return;
    console.log('Scheduling interview for:', selectedDate, 'at slot:', selectedSlotId);
    router.push('/video-submission');
  };

  const Footer = (
    <Button 
      text="SCHEDULE INTERVIEW" 
      onPress={handleSchedule}
      disabled={!selectedSlotId}
    />
  );

  return (
    <ScreenWrapper footer={Footer} noPadding>
      <PageHeader subtitle="INTERVIEW SCHEDULING" />
      <StepIndicator currentStep={5} totalSteps={7} />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Calendar Card */}
        <View>
          <GlassCard delay={400} noPadding >
            <Calendar
              current={selectedDate}
              minDate={today}
            onDayPress={(day: any) => {
              setSelectedDate(day.dateString);
              setSelectedSlotId(null);
            }}
            markedDates={{
              [selectedDate]: { selected: true, disableTouchEvent: true, selectedColor: COLORS.primary, selectedTextColor: '#fff' },
              [today]: { marked: true, dotColor: COLORS.cyan }
            }}
            theme={{
              backgroundColor: 'transparent',
              calendarBackground: 'transparent',
              textSectionTitleColor: 'rgba(255,255,255,0.4)',
              selectedDayBackgroundColor: COLORS.primary,
              selectedDayTextColor: '#ffffff',
              todayTextColor: COLORS.cyan,
              dayTextColor: '#ffffff',
              textDisabledColor: 'rgba(255,255,255,0.15)',
              dotColor: COLORS.primary,
              selectedDotColor: '#ffffff',
              arrowColor: '#ffffff',
              disabledArrowColor: 'rgba(255,255,255,0.1)',
              monthTextColor: '#ffffff',
              indicatorColor: COLORS.primary,
              textDayFontWeight: '500',
              textMonthFontWeight: '700',
              textDayHeaderFontWeight: '600',
              textDayFontSize: normalize(14),
              textMonthFontSize: normalize(16),
              textDayHeaderFontSize: normalize(11)
            }}
          />
          </GlassCard>
        </View>

        {/* Selected Date Display */}
        <GlassCard delay={500} noPadding>
          <View style={styles.selectedDateRow}>
            <CalendarIcon size={18} color="rgba(255,255,255,0.4)" />
            <View style={styles.selectedDateLabelContainer}>
              <Text style={styles.selectedDateLabel}>
                Selected Date: <Text style={styles.boldText}>{formattedSelectedDate}</Text>
              </Text>
            </View>
            <View style={styles.calendarSmallIcon}>
              <CalendarIcon size={12} color="rgba(255,255,255,0.6)" />
            </View>
          </View>
        </GlassCard>

        {/* Time Slots Card */}
        <GlassCard delay={600}>
          <View style={styles.slotsHeader}>
            <Text style={styles.sectionTitle}>Available Time Slots</Text>
            <Edit3 size={18} color="rgba(255,255,255,0.6)" />
          </View>

          <View style={styles.slotsGrid}>
            {slots.map(slot => (
              <View key={slot.id} style={styles.slotWrapper}>
                <TimeSlotChip 
                  time={slot.time}
                  available={slot.available}
                  selected={selectedSlotId === slot.id}
                  onPress={() => setSelectedSlotId(slot.id)}
                />
              </View>
            ))}
          </View>
          
          <Text style={styles.noteText}>Note: Slots are in your local timezone.</Text>
        </GlassCard>

        {/* Alternate Slot Section */}
        <GlassCard delay={700}>
          <View style={styles.alternateRow}>
            <View style={styles.alternateTextContainer}>
              <Text style={styles.alternateTitle}>Can't find a suitable slot?</Text>
              <Text style={styles.alternateSubtitle}>Request an alternate time slot for review.</Text>
            </View>
            <View style={styles.alternateIconContainer}>
              <FileClock size={24} color="#fff" />
            </View>
          </View>
        </GlassCard>

        <View style={{ height: normalize(100) }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: normalize(10),
    gap: normalize(20),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: normalize(20),
    marginVertical: normalize(14),
  },
  mainTitle: {
    color: '#fff',
    fontSize: normalize(25),
    fontWeight: '800',
    letterSpacing: 0.5,
    marginLeft: normalize(12),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconAndDateRow: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: normalize(15),
  },
  dateBadge: {
    backgroundColor: 'rgba(0, 255, 255, 0.15)',
    paddingHorizontal: normalize(8),
    paddingVertical: normalize(3),
    borderRadius: normalize(10),
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.3)',
  },
  dateBadgeText: {
    color: COLORS.cyan,
    fontSize: normalize(10),
    fontWeight: '700',
  },
  iconContainer: {
    width: normalize(44),
    height: normalize(32),
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: normalize(8),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  interviewIcon: {
    flexDirection: 'row',
    gap: normalize(4),
  },
  iconCircle: {
    width: normalize(16),
    height: normalize(16),
    borderRadius: normalize(8),
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.6)',
  },

  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: normalize(20),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  monthText: {
    color: '#fff',
    fontSize: normalize(16),
    fontWeight: '700',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: normalize(15),
  },
  dayLabel: {
    width: '14.28%',
    textAlign: 'center',
    color: 'rgba(255,255,255,0.4)',
    fontSize: normalize(11),
    marginBottom: normalize(15),
    fontWeight: '600',
  },
  dayCell: {
    width: '14.28%',
    height: normalize(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(5),
  },
  selectedDayCell: {
    backgroundColor: 'rgba(99, 102, 241, 0.8)',
    borderRadius: normalize(8),
    borderWidth: 1,
    borderColor: '#00ffff',
  },
  todayCell: {
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.5)',
    borderRadius: normalize(8),
  },
  dayText: {
    color: '#fff',
    fontSize: normalize(14),
    fontWeight: '500',
  },
  selectedDayText: {
    fontWeight: '700',
  },
  pastDayText: {
    color: 'rgba(255,255,255,0.15)',
  },
  selectedDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(16),
    gap: normalize(10),
    minHeight: normalize(48),
  },
  selectedDateLabelContainer: {
    flex: 1,
  },
  selectedDateLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: normalize(12),
  },
  boldText: {
    color: '#fff',
    fontWeight: '700',
  },
  calendarSmallIcon: {
    width: normalize(24),
    height: normalize(24),
    borderRadius: normalize(6),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slotsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: normalize(20),
  },
  sectionTitle: {
    color: '#fff',
    fontSize: normalize(16),
    fontWeight: '700',
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  noteText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: normalize(11),
    marginTop: normalize(10),
  },
  alternateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alternateTextContainer: {
    flex: 1,
  },
  alternateTitle: {
    color: '#fff',
    fontSize: normalize(15),
    fontWeight: '700',
    marginBottom: normalize(4),
  },
  alternateSubtitle: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: normalize(12),
  },
  alternateIconContainer: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(12),
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  slotWrapper: {
    width: '31%',
    marginBottom: normalize(12),
  },
});
