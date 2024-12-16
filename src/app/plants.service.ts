import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantsService {

  constructor(private http:HttpClient) { }
getAll():Observable <Post[]> {
  return this.http.get<Post[]>('http://localhost:3000/post/getAll');
}
}
