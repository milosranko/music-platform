import { Component, inject } from '@angular/core';
import { UserStore } from '../../../stores/user.store';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  userStore = inject(UserStore);
}
