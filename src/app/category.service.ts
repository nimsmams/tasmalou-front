import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000/category';

  constructor(private http: HttpClient) {}

  // Récupérer toutes les catégories
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getAll`);
  }

  // Ajouter une nouvelle catégorie
  addCategory(category: { category_name: string; description: string }) {
    return this.http.post(`${this.baseUrl}/add`, category);
  }
}