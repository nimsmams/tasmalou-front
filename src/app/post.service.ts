import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './entities';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }


  create(post:Post) {
    return this.http.post<Post>('http://localhost:3000/post/add', post);
  }
  get(id:number) {
    return this.http.get<Post>('http://localhost:3000/api/post');
  }
  update(post:Post, postId:number) {
  return this.http.put<Post>('http://localhost:3000/api/post/'+ postId, post);
  }
  /*getOne(get:Post) {
    return this.http.get<Post>('http://localhost:3000/post/getpost/:id', get);
  }
  getAll() {
    return this.http.get<Post>('http://localhost:3000/post/getAll');
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