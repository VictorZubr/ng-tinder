import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './content/search/search.component';
import { SettingsComponent } from './content/settings/settings.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: '**', redirectTo: '/search', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
