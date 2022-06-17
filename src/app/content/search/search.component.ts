import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  BehaviorSubject, endWith, from, Observable, switchMap, tap, zip,
} from 'rxjs';
import { map } from 'rxjs/operators';

import { Person } from '../../defs/person';
import { SearchService } from './search.service';
import { Action } from '../../defs/action';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  public total = 0;

  public loader = false;

  public persons$: Observable<Person | null> | null = null;

  public skip$ = new BehaviorSubject<number>(1);

  constructor(
    private searchService: SearchService,
  ) {}

  public like(person: Person) {
    this.searchService.like(person.id).subscribe((updatedPerson) => {
      if (!SearchComponent.isMatch(updatedPerson)) {
        this.skipPerson();
      }
    });
  }

  public disLike(person: Person) {
    this.searchService.dislike(person.id).subscribe(() => this.skipPerson());
  }

  public skipPerson(): void {
    this.skip$.next(this.skip$.value + 1);
  }

  public static isMatch(person: Person): boolean {
    return Boolean(person.status.isFavorite && person.status.isCandidate);
  }

  public restart(): void {
    this.skip$.next(1);
    this.ngOnInit();
  }

  ngOnInit() {
    this.loader = true;
    const persons$ = this.searchService.getPersons()
      .pipe(
        tap((persons) => {
          this.total = persons.length;
          this.loader = false;
        }),
        switchMap((persons) => from(persons)),
        endWith(null),
      );

    this.persons$ = zip(persons$, this.skip$)
      .pipe(map(([person]) => person));
  }

  public action(action: Action, person: Person) {
    switch (action) {
      case 'like':
        return this.like(person);
      case 'dislike':
        return this.disLike(person);
      default:
        return this.skipPerson();
    }
  }
}
