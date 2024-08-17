import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserTrack } from '../interfaces/UserTrack';
import {
  MatDialog,
} from '@angular/material/dialog';
import { EditTrackModalComponent } from '../components/modals/edit-track-modal/edit-track-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  readonly dialog = inject(MatDialog);

  constructor(
  ) { }

  openEditTrackModal = (track?: UserTrack) : Observable<UserTrack> => {
    const modalRef = this.dialog.open(EditTrackModalComponent, {
      width: '500px',
      data: track
    });
    
    return modalRef.afterClosed();
  }
}
