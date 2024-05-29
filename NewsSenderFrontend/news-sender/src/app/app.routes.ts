import { Routes } from '@angular/router';
import { NewsComponent } from './news/news.component';
export const routes: Routes = [
    { path: '', redirectTo: '/news', pathMatch: 'full' },
    { path: 'news', component: NewsComponent }
  ];










