import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Person } from './defs/person';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private api: ApiService,
  ) {
  }

  public getPersons(): Observable<Array<Person>> {
    return this.api.getPersons();
  }

  public like(id: string) {
    return this.updatePerson(id, { isFavorite: true });
  }

  public dislike(id: string) {
    return this.updatePerson(id, { isFavorite: false });
  }

  private updatePerson(id: string, options: { isFavorite: boolean }): Observable<Person> {
    return this.api.update(id, options);
  }
}
