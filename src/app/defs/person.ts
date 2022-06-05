export interface Person {
  id: string;
  name: string;
  age: number;
  sex: 'male' | 'female';
  photoUrl?: string;
  status : {
    isCandidate: boolean;
    isFavorite: boolean;
  }
}
