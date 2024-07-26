import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloStore } from './stores/hello.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'music-platform';
  readonly store = inject(HelloStore);

  ngOnInit(): void {
    this.store.loadAll();
  }
}
