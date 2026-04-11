export interface Rejection {
  status: 'rejected';
  reason: string;
  reapplyAt: string; // ISO date
}
