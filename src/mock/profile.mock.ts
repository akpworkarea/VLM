import { Profile } from '../models/profile.model';

export const MOCK_PROFILE: Profile = {
  user: {
    name: 'Full Name Jila',
    email: 'vlmacademy@gmail.com',
    phone: '+91 23746353',
    address: 'Bonnur Road, neomaik, 20308',
    avatar: 'https://picsum.photos/seed/teacher/200/200',
  },
  qualifications: {
    degree: 'Degree (PIN)',
    institution: 'Prismax School',
    year: '2021',
    isBEd: true,
  },
  classes: ['Class 6-8', 'Class 9-10', 'Class 11-12'],
  subjects: ['Maths', 'Science', 'Physics'],
  languages: ['Hindi', 'English', 'Hinglish'],
  documents: [
    { id: '1', name: 'Aadhaar Card', status: 'uploaded' },
    { id: '2', name: 'Degree', status: 'verified' },
    { id: '3', name: 'Resume', status: 'verified' },
    { id: '4', name: 'B.Ed Cert', status: 'verified' },
  ],
  videoStatus: {
    isUploaded: true,
    previewAvailable: true,
  },
};
