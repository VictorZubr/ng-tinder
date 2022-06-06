import { Component } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';
import { Settings } from '../../defs/settings';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  public settings: Settings = this.settingsService.settings;

  public settingsChange = false;

  public ageOptions: Options = {
    floor: 14,
    ceil: 100,
  };

  public countOptions: Options = {
    floor: 1,
    ceil: 100,
  };

  constructor(private settingsService: SettingsService) {}

  save() {
    this.settingsChange = false;
    this.settingsService.settings = this.settings;
  }
}
