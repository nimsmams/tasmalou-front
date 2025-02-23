import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './entities';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  create(product: Product) {
    return this.http.post<Product>(
      'http://localhost:3000/product/add',
      product
    );
  }

  get(id: number) {
    return this.http.get<Product>('http://localhost:3000/api/product');
  }
  update(product: Product, postId: number) {
    return this.http.put<Product>(
      'http://localhost:3000/api/product/' + postId,
      product);
  }
  getAll() {
    return this.http.get<Product[]>('http://localhost:3000/product/getAll');
  }
  
  addCategory(category: { category_name: string; description: string; parent_id?: number }) {
    return this.http.post('http://localhost:3000/category/add', category);
  }

  getAllCategories() {
    return this.http.get('http://localhost:3000/category/getAll');
  }

  /*getOne(get:Post) {
    return this.http.get<Post>('http://localhost:3000/post/getpost/:id', get);
  }
  

  remove(delete:Post) {
  return this.http.post<Post>('http://localhost:3000/post/delete/:id', delete);
}
  put(put:Post) {
  return this.http.post<Post>('http://localhost:3000/post/update', put);
}
  get(get:Post) {
  return this.http.post<Post>('http://localhost:3000/post/postUser', get);
}*/
}
