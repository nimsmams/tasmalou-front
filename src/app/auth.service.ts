import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { User } from './entities';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  connectedUser = signal<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
    const stored = localStorage.getItem('connectedUser');
    if (stored) {
      this.connectedUser.set(JSON.parse(stored));
    }
  }

  postUser(user: User) {
    return this.http.post<User>('http://localhost:3000/user/register', user);
  }

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<{ user: User; token: string }>(
        'http://localhost:3000/user/login',
        credentials
      )
      .pipe(
        tap((data) => {
          localStorage.setItem('token', data.token); //On stock le token en localStorage
          localStorage.setItem('connectedUser', JSON.stringify(data.user));
          this.connectedUser.set(data.user);
        })
      );
  }

  logout() {
    localStorage.clear();
    this.connectedUser.set(null);
    this.router.navigate(['/login']);
  }



  isAdmin(): boolean {
    const user = this.connectedUser();
    // Assuming the role is stored in a property called 'role' in the user object
    return user?.role === 'ADMIN';
  }
}
