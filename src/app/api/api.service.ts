import { Injectable } from '@angular/core';
import { Observable, of, Subscriber } from 'rxjs';
import { Person } from '../defs/person';
import { SettingsService } from '../content/settings/settings.service';
import { getPersons } from './utils';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  persons = getPersons(this.settingsService.settings);

  constructor(private settingsService: SettingsService) {
  }

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
