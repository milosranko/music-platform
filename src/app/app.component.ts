import { Component, inject } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SiteSettingsStore } from './stores/site-settings.store';
import { MatButtonModule } from '@angular/material/button';
import { UserStore } from './stores/user.store';
import { LoadingContainerComponent } from "./components/layout/loading-container/loading-container.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatButtonModule, LoadingContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'music-platform';

  siteSettingsStore = inject(SiteSettingsStore);
  userStore = inject(UserStore);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userStore.restoreUser();
    this.siteSettingsStore.loadAll();
  }

  logout = () => {
    this.userStore.logout().then(() => {
      this.router.navigate(['/']);
    });
  }
}
