export type VerificationStepStatus = 'completed' | 'active' | 'pending';

export interface VerificationStep {
  id: string;
  title: string;
  description: string;
  status: VerificationStepStatus;
  icon: string;
}

export interface VerificationStatus {
  steps: VerificationStep[];
  currentStep: number;
  verificationId: string;
  applicantName: string;
}
