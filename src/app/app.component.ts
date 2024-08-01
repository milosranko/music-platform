import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SiteSettingsStore } from './stores/site-settings.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'music-platform';

  siteSettingsStore = inject(SiteSettingsStore);

  ngOnInit(): void {
    this.siteSettingsStore.loadAll();
  }
}
