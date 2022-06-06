import { Component, OnInit } from '@angular/core';
import { Person } from '../../defs/person';
import { SearchService } from './search.service';
import { Action } from '../../defs/action';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public persons: Array<Person> = [];

  public total = 0;

  public person: Person | undefined;

  public personsLoading = false;

  constructor(
    private searchService: SearchService,
  ) {}

  public like(person: Person) {
    this.searchService.like(person.id).subscribe((updatedPerson) => {
      this.person = updatedPerson;
      if (!this.isMatch()) {
        this.skipPerson();
      }
    });
  }

  public disLike(person: Person) {
    this.searchService.dislike(person.id).subscribe(() => this.skipPerson());
  }

  public skipPerson() {
    this.person = this.persons.pop();
  }

  public isMatch(): boolean {
    return Boolean(this.person?.status.isFavorite && this.person.status.isCandidate);
  }

  public restart() {
    this.ngOnInit();
  }

  ngOnInit() {
    this.personsLoading = true;
    this.searchService.getPersons().subscribe((persons) => {
      this.persons = persons;
      this.total = persons.length;
      this.skipPerson();
      this.personsLoading = false;
    });
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
