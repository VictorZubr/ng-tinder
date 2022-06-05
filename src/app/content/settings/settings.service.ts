import { Injectable } from '@angular/core';
import { Settings } from '../../defs/settings';

const DEFAULT_SETTINGS: Settings = {
  searchSex: 'female',
  ageMin: 18,
  ageMax: 25,
  count: 30,
};

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settings: Settings = DEFAULT_SETTINGS;
}
