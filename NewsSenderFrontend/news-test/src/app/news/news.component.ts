import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { News } from '../interfaces/News';
import { NewsServiceService } from '../Services/news-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit, OnChanges {
  @Input('filter') filter: Set<string> = new Set<string>();
  newsList: News[] = [];
  filteredNewsList: News[] = [];

  constructor(private newsService: NewsServiceService) {}

  ngOnInit(): void {
    this.newsService.getNews().subscribe((news) => {
      this.newsList = news;
      this.applyFilters();
    });

    this.newsService.getNewsUpdateListener().subscribe((newNews: News) => {
      this.newsList.push(newNews);
      this.applyFilters();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.applyFilters();
  }

  updateNews(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    if (this.filter.size === 0) {
      this.filteredNewsList = this.newsList;
    } else {
      this.filteredNewsList = this.newsList.filter((news) =>
        news.categories.some((category) => this.filter.has(category.name))
      );
    }
  }
}
