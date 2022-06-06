import { Settings } from '../defs/settings';
import { Person } from '../defs/person';
import { MAN_NAMES, WOMAN_NAMES } from './data';

const getRandom = (min: number, max: number): number => Math.round(
  Math.random() * (max - min) + min,
);

const getRandomName = (sex: 'male' | 'female'): string => (sex === 'male'
  ? (MAN_NAMES[getRandom(0, MAN_NAMES.length - 1)] as string)
  : (WOMAN_NAMES[getRandom(0, WOMAN_NAMES.length - 1)] as string));

export const getPersons = (settings: Settings): Array<Person> => Array
  .from({ length: settings.count }, (_, index) => ({
    id: index.toString(10).padStart(8, '0'),
    name: getRandomName(settings.searchSex),
    age: getRandom(settings.ageMin, settings.ageMax),
    sex: settings.searchSex,
    status: {
      isCandidate: Math.random() > 0.5,
      isFavorite: false,
    },
  }));
