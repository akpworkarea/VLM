export interface Video {
  id: string;
  uri: string;
  duration: number;
  type: 'recorded' | 'uploaded';
}
