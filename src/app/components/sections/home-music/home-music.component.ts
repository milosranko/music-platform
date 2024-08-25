import { Component, inject } from '@angular/core';
import { HomeTracksStore } from '../../../stores/home-content.store';
import { MatCardModule } from '@angular/material/card';
import { OpenAiService } from '../../../services/open-ai.service';
import { UserStore } from '../../../stores/user.store';
import { UserTracksStore } from '../../../stores/user-tracks.store';
import { catchError } from 'rxjs';
import { SiteSettingsStore } from '../../../stores/site-settings.store';

@Component({
  selector: 'app-home-music',
  standalone: true,
  imports: [MatCardModule],
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
    this.homeTracksStore.loadStartPage();
  }

  generateTrackCover = () => {
    this.openAiService.generateTrackCover(
      this.userStore.userData(),
      this.userTracksStore.tracks()[0]
    ).subscribe((cover) => {
      console.log(cover);
    });
  };
}
