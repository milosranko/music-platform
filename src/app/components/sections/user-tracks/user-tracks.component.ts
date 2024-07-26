import { Component, inject } from '@angular/core';
import { UserTracksStore } from '../../../stores/user-tracks.store';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-user-tracks',
  standalone: true,
  imports: [MatListModule, MatIconModule],
  templateUrl: './user-tracks.component.html',
  styleUrl: './user-tracks.component.scss'
})
export class UserTracksComponent {
  tracksStore = inject(UserTracksStore);

}
