import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlantsService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:3000/post/getAll');
  }
}
