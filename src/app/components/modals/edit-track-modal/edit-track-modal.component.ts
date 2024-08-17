import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserTrack } from '../../../interfaces/UserTrack';
import { MatButtonModule } from '@angular/material/button';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-edit-track-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatLabel],
  templateUrl: './edit-track-modal.component.html',
  styleUrl: './edit-track-modal.component.scss'
})
export class EditTrackModalComponent {
  readonly dialogRef = inject(MatDialogRef<EditTrackModalComponent>);
  track: UserTrack = inject(MAT_DIALOG_DATA);

  form = new FormGroup({
    title: new FormControl<string>(''),
    year: new FormControl<number>(0),
    duration: new FormControl<number>(0),
    artist: new FormArray<FormControl>([]),
    album: new FormArray<FormControl>([]),
    genre: new FormArray<FormControl>([]),
  });

  ngOnInit() {
    if (!this.track) {
      console.log('No track provided');
    } else {
      this.form.patchValue({
        title: this.track.title,
        year: this.track.year,
        duration: this.track.duration,
      });

      this.track.artist.forEach((artist) => {
        this.artistArray.push(new FormControl(artist));
      });

      this.track.album.forEach((album) => {
        this.albumArray.push(new FormControl(album));
      });

      this.track.genre.forEach((genre) => {
        this.genreArray.push(new FormControl(genre));
      });
    }
  };

  onSubmit = () => {
    console.log(this.form.value);
  };

  get artistArray() {
    return this.form.get('artist') as FormArray;
  }

  get albumArray() {
    return this.form.get('album') as FormArray;
  }

  get genreArray() {
    return this.form.get('genre') as FormArray;
  }

  deleteArtist = (index: number) => {
    this.artistArray.removeAt(index);
  }

  addArtist = () => {
    this.artistArray.push(new FormControl(''));
  }

  deleteAlbum = (index: number) => {
    this.albumArray.removeAt(index);
  }

  addAlbum = () => {
    this.albumArray.push(new FormControl(''));
  }

  deleteGenre = (index: number) => {
    this.genreArray.removeAt(index);
  }

  addGenre = () => {
    this.genreArray.push(new FormControl(''));
  }
}
