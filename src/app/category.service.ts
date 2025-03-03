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

  // Mettre à jour une catégorie
updateCategory(id: number, category: { category_name: string; description: string; parent_id?: number }) {
  return this.http.put(`${this.baseUrl}/update/${id}`, category);
}
// Supprimer une catégorie
deleteCategory(id: number) {
  return this.http.delete(`${this.baseUrl}/delete/${id}`);
}



}