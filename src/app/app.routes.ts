import { Routes } from '@angular/router';
import { HomeComponent } from './components/sections/home/home.component';
import { UserAlbumsComponent } from './components/sections/user-albums/user-albums.component';
import { UserTracksComponent } from './components/sections/user-tracks/user-tracks.component';
import { SignInComponent } from './components/sections/sign-in/sign-in.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'albums', component: UserAlbumsComponent },
  { path: 'tracks', component: UserTracksComponent },
  { path: 'sign-in', component: SignInComponent },
];
