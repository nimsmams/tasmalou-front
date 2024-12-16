import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  credentials = {
    password: '',
    email: '',
  };
  feedback = '';

  constructor(private auth: AuthService, private router: Router) {}
// mettre ici un ngOniit pour dire que si je suis connectée je dois rester sur cette page. localstorage:not empty then...

  handleSubmit() {
    //appelé à la soumission du formulaire
    this.auth.login(this.credentials).subscribe({
      next: () => {
        console.log(localStorage);
        if (this.auth.isAdmin()){
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/post']);
        }
      },
      error: () => {
        this.feedback = 'Invalid credentials';
      },
    });
    console.log('bonjour');
  }
}
