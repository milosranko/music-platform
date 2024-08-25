import { Component, inject, OnInit } from '@angular/core';
import { UserTracksStore } from '../../../stores/user-tracks.store';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { ModalsService } from '../../../services/modals.service';
import { UserTrack } from '../../../interfaces/UserTrack';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TrackTileComponent } from '../../shared/track-tile/track-tile.component';

@Component({
  selector: 'app-user-tracks',
  standalone: true,
  imports: [MatListModule, MatIconModule, MatButtonModule, TrackTileComponent],
  templateUrl: './user-tracks.component.html',
  styleUrl: './user-tracks.component.scss'
})
export class UserTracksComponent implements OnInit {
  tracksStore = inject(UserTracksStore);
  modalsService = inject(ModalsService);

  ngOnInit(): void {
    this.tracksStore.getTracks();
  }

  openCreateTrackForm = () => {
    this.modalsService.openEditTrackModal().subscribe((track) => {
      this.tracksStore.addTrack(track).then(() => {
        this.tracksStore.getTracks();
      });
    });
  };

  openEditTrackForm = (track: UserTrack) => {
    if (track) {
      this.modalsService.openEditTrackModal(track);
    }
  };
}
