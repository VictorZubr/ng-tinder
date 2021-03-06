import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {
  Observable, of, Subscriber, tap,
} from 'rxjs';

import { Person } from '../defs/person';
import { SettingsService } from '../content/settings/settings.service';
import { getPersons } from './utils';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private persons: Array<Person> = [];

  constructor(
    private settingsService: SettingsService,
    private http: HttpClient,
  ) {
  }

  public getPersons(): Observable<Array<Person>> {
    const persons = getPersons(this.settingsService.settings);
    return this.getPhotos().pipe(
      tap((photos) => {
        this.persons = persons
          .map((person, index) => ({ ...person, photoUrl: photos[index]?.url }));
      }),
      map(() => this.persons.slice()),
    );
  }

  private getPhotos():Observable<Array<any>> {
    const url = `https://api.thecatapi.com/v1/images/search?api_key=${environment.apiKey}`;
    const options = { params: { limit: this.settingsService.settings.count, size: 'med' } };
    return this.http.get<Array<any>>(url, options);
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
