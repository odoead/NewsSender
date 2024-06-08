import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryService } from '../Services/category.service';
import { Category } from '../interfaces/Category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent implements OnInit {
  categories: Category[] = [];
  selectedCategories: Set<string> = new Set<string>();

  @Output() filterChanged = new EventEmitter<Set<string>>();

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    //this.categoryService.getCategories().subscribe((categories) => {this.categories = categories;});
    this.categoryService.getCategories().subscribe((categories) => {
      const outCategory: Category[] = [];
      categories.forEach((q) => {
        if (!outCategory.find((p) => p.name === q.name)) {
          outCategory.push(q);
        }
      });
      this.categories = this.categories.concat(outCategory);
    });
  }

  onCategoryChange(categoryName: string) {
    if (this.selectedCategories.has(categoryName)) {
      this.selectedCategories.delete(categoryName);
    } else {
      this.selectedCategories.add(categoryName);
    }
    this.filterChanged.emit(this.selectedCategories);
  }
}
