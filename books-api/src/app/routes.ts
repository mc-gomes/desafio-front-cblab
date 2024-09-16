import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page',
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    title: 'Página de favoritos',
  },
];
export default routeConfig;
