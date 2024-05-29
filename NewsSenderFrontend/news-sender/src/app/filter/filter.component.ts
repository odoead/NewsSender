import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from '../interfaces/Category';
import { CategoryService } from '../Shared/Services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { log } from 'console';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  categories: Category[] = [];
  selectedCategories: Set<number> = new Set<number>();

  @Output() filterChanged = new EventEmitter<Set<number>>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onCategoryChange(categoryId: number): void {
    if (this.selectedCategories.has(categoryId)) {
      this.selectedCategories.delete(categoryId);
    } else {
      this.selectedCategories.add(categoryId);
    }
    log('categories changed');
    this.filterChanged.emit(this.selectedCategories);
  }
}
