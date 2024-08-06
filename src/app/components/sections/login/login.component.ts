import { Component, inject } from '@angular/core';
import { SiteSettingsStore } from '../../../stores/site-settings.store';
import { UserStore } from '../../../stores/user.store';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  siteSettingsStore = inject(SiteSettingsStore);
  userStore = inject(UserStore);

  form = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private _snackBar: MatSnackBar, private router: Router) {}

  login = async () => {
    const isLogged = await this.userStore.login(this.form.value.login || '', this.form.value.password || '');
    if (isLogged) {
      /** Redirect to profile */
      this.router.navigate(['/profile']);
    } else {
      this._snackBar.open('The login or password is incorrect', 'Close', {
        duration: 2000,
        verticalPosition: 'top',
      });
    }
  }
}
