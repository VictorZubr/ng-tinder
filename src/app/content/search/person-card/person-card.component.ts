import {
  Component, EventEmitter, Input, OnChanges, Output,
} from '@angular/core';

import { Person } from '../../../defs/person';
import { Action } from '../../../defs/action';

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss'],
})
export class PersonCardComponent implements OnChanges {
  @Input() person: Person | undefined;

  @Output() action: EventEmitter<Action> = new EventEmitter<Action>();

  public photoLoading = false;

  public isMatch(): boolean {
    return Boolean(this.person?.status.isFavorite && this.person.status.isCandidate);
  }

  ngOnChanges(): void {
    this.photoLoading = true;
  }
}
