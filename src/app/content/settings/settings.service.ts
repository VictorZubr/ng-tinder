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
  private currentSettings: Settings = DEFAULT_SETTINGS;

  get settings(): Settings {
    return this.currentSettings;
  }

  set settings(settings: Settings) {
    this.currentSettings = settings;
  }
}
