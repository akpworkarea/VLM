import { Schedule } from '../models/schedule.model';

export const MOCK_SCHEDULES: Schedule[] = [
  {
    date: '2026-04-25',
    slots: [
      { id: '1', time: '9:00 AM', available: true },
      { id: '2', time: '10:00 AM', available: true },
      { id: '3', time: '11:30 AM', available: false },
      { id: '4', time: '1:00 PM', available: true },
      { id: '5', time: '2:30 PM', available: false },
      { id: '6', time: '4:00 PM', available: true },
      { id: '7', time: '4:00 PM', available: true },
      { id: '8', time: '5:30 PM', available: true },
    ],
  },
  {
    date: '2026-04-09',
    slots: [
      { id: '1', time: '9:00 AM', available: true },
      { id: '2', time: '10:00 AM', available: true },
      { id: '3', time: '11:30 AM', available: false },
      { id: '4', time: '1:00 PM', available: true },
      { id: '5', time: '2:30 PM', available: false },
      { id: '6', time: '4:00 PM', available: true },
      { id: '7', time: '4:00 PM', available: true },
      { id: '8', time: '5:30 PM', available: true },
    ],
  },
  {
    date: '2026-04-08',
    slots: [
      { id: '9', time: '10:00 AM', available: true },
      { id: '10', time: '2:00 PM', available: true },
    ],
  },
];
