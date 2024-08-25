import { Component, inject } from '@angular/core';
import { HomeTracksStore } from '../../../stores/home-tracks.store';
import { MatCardModule } from '@angular/material/card';
import { OpenAiService } from '../../../services/open-ai.service';
import { UserStore } from '../../../stores/user.store';
import { UserTracksStore } from '../../../stores/user-tracks.store';
import { SiteSettingsStore } from '../../../stores/site-settings.store';
import { TrackTileComponent } from '../../shared/track-tile/track-tile.component';

@Component({
  selector: 'app-home-music',
  standalone: true,
  imports: [TrackTileComponent],
  templateUrl: './home-music.component.html',
  styleUrl: './home-music.component.scss',
})
export class HomeMusicComponent {
  homeTracksStore = inject(HomeTracksStore);

  userStore = inject(UserStore);
  userTracksStore = inject(UserTracksStore);
  siteSettingsStore = inject(SiteSettingsStore);

  constructor(
    private openAiService: OpenAiService
  ) {}

  ngOnInit(): void {
    this.homeTracksStore.getTracks();
  }
}
