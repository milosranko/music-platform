import { Component, inject } from '@angular/core';
import { UserTracksStore } from '../../../stores/user-tracks.store';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { ModalsService } from '../../../services/modals.service';
import { UserTrack } from '../../../interfaces/UserTrack';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-user-tracks',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatButton],
  templateUrl: './user-tracks.component.html',
  styleUrl: './user-tracks.component.scss'
})
export class UserTracksComponent {
  tracksStore = inject(UserTracksStore);
  modalsService = inject(ModalsService);

  openCreateTrackForm = () => {
    this.modalsService.openEditTrackModal();
  };

  openEditTrackForm = (track: UserTrack = { 
    id: 2,
    title: 'title',
    artist: ['artist'],
    album: ['album'],
    year: 2021,
    genre: ['genre'],
    duration: 100,
   }) => {
    this.modalsService.openEditTrackModal(track);
  };
}
