import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  private selectedCategory = new BehaviorSubject<string>('pakistan');
  selectedCategory$ = this.selectedCategory.asObservable();

  setCategory(category: string) {
    this.selectedCategory.next(category);
  }

}

