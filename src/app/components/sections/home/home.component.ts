import { Component } from '@angular/core';
import { HomeMusicComponent } from '../home-music/home-music.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeMusicComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
}
