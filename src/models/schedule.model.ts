export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface Schedule {
  date: string;
  slots: TimeSlot[];
}
