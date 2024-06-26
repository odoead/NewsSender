import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interfaces/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private newsUrl = 'http://localhost:5000/api/Category';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.newsUrl);
  }
}
