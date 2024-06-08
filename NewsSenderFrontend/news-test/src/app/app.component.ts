import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { NewsComponent } from './news/news.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FilterComponent, NewsComponent],
  template: `
    <app-filter (filterChanged)="onFilterChange($event)"></app-filter>
    <app-news [filter]="selectedCategories" #newsComponent></app-news>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  selectedCategories: Set<string> = new Set<string>();

  onFilterChange(selectedCategories: Set<string>): void {
    this.selectedCategories = selectedCategories;
    this.newsComponent.updateNews();
  }

  @ViewChild(NewsComponent) newsComponent!: NewsComponent;
}
