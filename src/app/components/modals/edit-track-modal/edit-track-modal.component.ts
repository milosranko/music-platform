import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserTrack } from '../../../interfaces/UserTrack';
import { MatButtonModule } from '@angular/material/button';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { OpenAiService } from '../../../services/open-ai.service';
import { UserStore } from '../../../stores/user.store';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import { SiteSettingsStore } from '../../../stores/site-settings.store';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-edit-track-modal',
  standalone: true,
  imports: [MatTooltipModule, MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatLabel],
  templateUrl: './edit-track-modal.component.html',
  styleUrl: './edit-track-modal.component.scss'
})
export class EditTrackModalComponent {
  readonly dialogRef = inject(MatDialogRef<EditTrackModalComponent>);
  track: UserTrack = inject(MAT_DIALOG_DATA);
  userStore = inject(UserStore);
  siteSettingsStore = inject(SiteSettingsStore);

  form = new FormGroup({
    id: new FormControl<string>(''),
    title: new FormControl<string>('', [Validators.required]),
    url: new FormControl<string>('', [Validators.required]),
    cover: new FormControl<string>(''),
    promo: new FormControl<string>(''),
    artists: new FormArray<FormControl>([]),
    genres: new FormArray<FormControl>([]),
  });

  openAiService = inject(OpenAiService);

  ngOnInit() {
    if (!this.track) {
      console.log('No track provided');
    } else {
      this.form.patchValue({
        title: this.track.title,
        cover: this.track.cover,
        url: this.track.url,
        id: this.track.id,
        promo: this.track.promo,
      });

      this.track.artists.forEach((artist) => {
        this.artistArray.push(new FormControl(artist));
      });

      this.track.genres.forEach((genre) => {
        this.genreArray.push(new FormControl(genre));
      });
    }
  };

  onSubmit = () => {
    console.log(this.form.value);
    if (this.form.value.id) {
      console.log('Update track');
    } else {
      console.log('Create track');
      this.dialogRef.close({...this.form.value, artists: [this.userStore.userData().Name]});
    }


  };

  get artistArray() {
    return this.form.get('artists') as FormArray;
  }

  get genreArray() {
    return this.form.get('genres') as FormArray;
  }

  deleteArtist = (index: number) => {
    this.artistArray.removeAt(index);
  }

  addArtist = () => {
    this.artistArray.push(new FormControl(''));
  }

  deleteGenre = (index: number) => {
    this.genreArray.removeAt(index);
  }

  addGenre = () => {
    this.genreArray.push(new FormControl(''));
  }

  generatePromo = () => {
    this.siteSettingsStore.setLoading(true);
    this.openAiService.generateTrackPromo(
      this.userStore.userData(),
      this.form.value as UserTrack,
    ).pipe(catchError(_ => {
      this.siteSettingsStore.setLoading(false);
      return [];
    })).subscribe(({description: promo}) => {
      this.form.patchValue({promo});
      this.siteSettingsStore.setLoading(false);
    });
  }

  generateCover = () => {
    this.siteSettingsStore.setLoading(true);
    this.openAiService.generateTrackCover(
      this.userStore.userData(),
      this.form.value as UserTrack,
    ).pipe(catchError(_ => {
      this.siteSettingsStore.setLoading(false);
      return [];
    })).subscribe(({url: cover}) => {
      this.form.patchValue({cover});
      this.siteSettingsStore.setLoading(false);
    });
  }

  get generateDisabled() {
    const value = this.form.value;
    return !value.title || !value.genres?.length;
  }

  get coverValue() {
    return this.form.value.cover;
  };

}
