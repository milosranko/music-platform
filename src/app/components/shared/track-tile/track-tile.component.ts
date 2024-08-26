import { Component, EventEmitter, input, Output } from '@angular/core';
import { UserTrack } from '../../../interfaces/UserTrack';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-track-tile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './track-tile.component.html',
  styleUrl: './track-tile.component.scss'
})
export class TrackTileComponent {
  track = input.required<UserTrack>();
  canEdit = input<boolean>(false);
  @Output() onEdit = new EventEmitter();

  edit = () => {
    this.onEdit.emit();
  };
}
