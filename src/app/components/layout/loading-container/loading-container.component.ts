import { Component, inject } from '@angular/core';
import { SiteSettingsStore } from '../../../stores/site-settings.store';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-container',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './loading-container.component.html',
  styleUrl: './loading-container.component.scss'
})
export class LoadingContainerComponent {
  siteSettingsStore = inject(SiteSettingsStore);
}
