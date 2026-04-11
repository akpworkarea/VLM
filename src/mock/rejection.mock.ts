import { Rejection } from '../models/rejection.model';

const sevenDaysFromNow = new Date();
sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 6);
sevenDaysFromNow.setHours(sevenDaysFromNow.getHours() + 23);
sevenDaysFromNow.setMinutes(sevenDaysFromNow.getMinutes() + 59);
sevenDaysFromNow.setSeconds(sevenDaysFromNow.getSeconds() + 55);

export const MOCK_REJECTION: Rejection = {
  status: 'rejected',
  reason: 'Proof of Teaching Certification verification failed: The provided document was invalid or did not meet standards.',
  reapplyAt: sevenDaysFromNow.toISOString(),
};
