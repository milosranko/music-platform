import { Component, inject, OnInit } from '@angular/core';
import { HelloStore } from '../../../stores/hello.store';
import { HomeMusicComponent } from '../home-music/home-music.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeMusicComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  readonly store = inject(HelloStore);

  ngOnInit(): void {
    this.store.loadAll();
  }
}
