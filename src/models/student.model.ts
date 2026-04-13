export interface StudentProfile {
  fullName: string;
  nickname: string;
  class: string;
  board: string;
  medium: 'english' | 'hindi';
  city: string;
  state: string;
  parentPhone: string;
  preferredSubjects: string[];
  weakSubjects: string[];
}
