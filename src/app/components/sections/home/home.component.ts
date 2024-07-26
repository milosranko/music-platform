import { Component, inject, OnInit } from '@angular/core';
import { HelloStore } from '../../../stores/hello.store';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  readonly store = inject(HelloStore);

  ngOnInit(): void {
    this.store.loadAll();
  }
}
