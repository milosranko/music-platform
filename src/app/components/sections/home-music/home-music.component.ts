import { Component, inject } from '@angular/core';
import { HomeTracksStore } from '../../../stores/home-content.store';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home-music',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './home-music.component.html',
  styleUrl: './home-music.component.scss',
})
export class HomeMusicComponent {
  homeTracksStore = inject(HomeTracksStore);

  ngOnInit(): void {
    this.homeTracksStore.loadStartPage();
  }
}
