import { Injectable } from '@angular/core';
import { Observable, of, Subscriber } from 'rxjs';
import { Person } from './defs/person';

const persons: Array<Person> = [
  {
    id: '01', name: 'Ann', age: 18, sex: 'female', status: { isCandidate: false, isFavorite: false },
  },
  {
    id: '02', name: 'Catrin', age: 23, sex: 'female', status: { isCandidate: false, isFavorite: false },
  },
  {
    id: '03', name: 'Erica', age: 20, sex: 'female', status: { isCandidate: true, isFavorite: false },
  },
];

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  persons = persons;

  public getPersons(): Observable<Array<Person>> {
    return of(this.persons.slice());
  }

  public update(id: string, options: { isFavorite: boolean }): Observable<Person> {
    const person = this.persons.find(({ id: personId }: Person) => personId === id);

    if (!person) {
      return new Observable((subscriber: Subscriber<Person>) => {
        subscriber.error(new Error(`Not found person this id:${id}`));
      });
    }

    person.status.isFavorite = options.isFavorite;
    return of(person);
  }
}
