import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { News } from '../interfaces/News';
import { NewsServiceService } from '../Shared/Services/news-service.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  @Input() filter: Set<number> = new Set<number>();
  newsList: News[] = [];
  filteredNewsList: News[] = [];

  constructor(private newsService: NewsServiceService) { }

  ngOnInit(): void {
    this.newsService.getNews().subscribe(news => {
      this.newsList = news;
      this.applyFilters();
    });

    this.newsService.getNewsUpdateListener().subscribe(news => {
      this.newsList.push(news);
      this.applyFilters();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter']) {
      this.applyFilters();
    }
  }

  private applyFilters(): void {
    if (this.filter.size === 0) {
      this.filteredNewsList = this.newsList;
    } else {
      this.filteredNewsList = this.newsList.filter(news =>
        news.categories.some(category => this.filter.has(category.id))
      );
    }
  }
}