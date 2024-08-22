import { Component, inject } from '@angular/core';
import { UserTracksStore } from '../../../stores/user-tracks.store';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { ModalsService } from '../../../services/modals.service';
import { UserTrack } from '../../../interfaces/UserTrack';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-tracks',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatButtonModule],
  templateUrl: './user-tracks.component.html',
  styleUrl: './user-tracks.component.scss'
})
export class UserTracksComponent {
  tracksStore = inject(UserTracksStore);
  modalsService = inject(ModalsService);

  openCreateTrackForm = () => {
    this.modalsService.openEditTrackModal().subscribe((track) => {
      this.tracksStore.addTrack(track);
    });
  };

  openEditTrackForm = (track: UserTrack = { 
    id: '2',
    title: 'title',
    artists: ['artist'],
    album: ['album'],
    genres: ['genre'],
    duration: 100,
   }) => {
    this.modalsService.openEditTrackModal(track);
  };
}
