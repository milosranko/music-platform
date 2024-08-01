import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SiteSettingsStore } from './stores/site-settings.store';
import { MatButtonModule } from '@angular/material/button';
import { UserStore } from './stores/user.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'music-platform';

  siteSettingsStore = inject(SiteSettingsStore);
  userStore = inject(UserStore);

  ngOnInit(): void {
    this.siteSettingsStore.loadAll();
  }

  login = () => {
    this.userStore.login();
  }

  logout = () => {
    this.userStore.logout();
  }
}
