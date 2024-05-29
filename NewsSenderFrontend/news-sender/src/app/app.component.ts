import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { NewsComponent } from './news/news.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FilterComponent, NewsComponent],
  template: `
    <app-filter (filterChanged)="onFilterChange($event)"></app-filter>
    <app-news [filter]="selectedCategories"></app-news>
  `,
  //templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedCategories: Set<number> = new Set<number>();

  onFilterChange(selectedCategories: Set<number>): void {
    this.selectedCategories = selectedCategories;
  }
}
