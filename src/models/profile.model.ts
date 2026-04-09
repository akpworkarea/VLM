import { Document } from './document.model';

export interface Profile {
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
    avatar: string;
  };
  qualifications: {
    degree: string;
    institution: string;
    year: string;
    isBEd: boolean;
  };
  classes: string[];
  subjects: string[];
  languages: string[];
  documents: Document[];
  videoStatus: {
    isUploaded: boolean;
    previewAvailable: boolean;
  };
}
