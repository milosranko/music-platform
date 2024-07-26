import { Component, inject } from '@angular/core';
import { UserAlbumsStore } from '../../../stores/user-albums.store';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-user-albums',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatGridListModule],
  templateUrl: './user-albums.component.html',
  styleUrl: './user-albums.component.scss'
})
export class UserAlbumsComponent {
  userAlbumsStore = inject(UserAlbumsStore);
  
}
