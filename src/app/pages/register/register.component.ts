import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { User } from '../../entities';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  user: User = {
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    age: new Date(),
    gender: '',
    role: 'USER',
  };

  g = [{ gender: 'Masculin' }, { gender: 'Feminin' }, { gender: 'Autre' }];

  constructor(private auth: AuthService, private router: Router) {}

  handleSubmit() {
    console.log(this.user);
    this.auth
      .postUser(this.user)
      .subscribe(() => this.router.navigate(['/']));
  }
  
}
