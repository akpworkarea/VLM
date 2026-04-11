import { VerificationStatus } from '../models/verification.model';

export const MOCK_VERIFICATION_STATUS: VerificationStatus = {
  verificationId: 'VLM-100234',
  applicantName: 'Dr. Eleanor Reed',
  currentStep: 3, // 0-indexed, so 4th step is active
  steps: [
    {
      id: '1',
      title: 'Draft',
      description: 'Profile in Draft',
      status: 'completed',
      icon: 'edit-3',
    },
    {
      id: '2',
      title: 'Submitted',
      description: 'Verification Submitted',
      status: 'completed',
      icon: 'send',
    },
    {
      id: '3',
      title: 'Interview Scheduled',
      description: 'Interview Scheduled',
      status: 'completed',
      icon: 'calendar',
    },
    {
      id: '4',
      title: 'Under Review',
      description: 'Application Under Review\n(Estimated 2-3 days)',
      status: 'active',
      icon: 'user',
    },
    {
      id: '5',
      title: 'Approved',
      description: 'Verification Approved\n(Start Teaching Soon)',
      status: 'pending',
      icon: 'shield-check',
    },
  ],
};
