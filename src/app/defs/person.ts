export interface Person {
  id: string;
  name: string;
  age: number;
  sex: 'male' | 'female';
  status : {
    isCandidate: boolean;
    isFavorite: boolean;
  }
}
