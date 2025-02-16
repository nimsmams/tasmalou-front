import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials = {
    password: '',
    email: '',
  };
  feedback = '';
  isLoggedIn= false;

  constructor(private auth: AuthService, private router: Router) {}

ngOnInit() {
  this.isLoggedIn = this.auth.isAuthenticated();
}// si je suis connectée je dois rester sur cette page. localstorage:not empty then...

handleSubmit() {
    //appelé à la soumission du formulaire
    this.auth.login(this.credentials).subscribe({
      next: () => {
        console.log(localStorage);
        if (this.auth.isAdmin()){
          this.router.navigate(['/admin']);//redirection admin si admin
        } else {
          this.router.navigate(['/home']);//redirection vers home si connecté
        }
      },
      error: () => {
        this.feedback = 'Invalid credentials';
        
      },
    });
    console.log('bonjour');
  }

  logout() {
    this.auth.logout();
    this.isLoggedIn = false;
  }

}
