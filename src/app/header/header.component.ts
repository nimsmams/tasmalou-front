import { CommonModule } from '@angular/common';
import { Component } from '@angular/core'; //permet de remplacer les href par ceci sur les lien
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isLoggedIn = false;
  //appeler le authservice de sorte qu'il comprenne si nous sommes loggé ou pas
  constructor(private authservice: AuthService) {
    this.isLoggedIn = !!this.authservice.connectedUser();
  }

  logout() {
    this.authservice.logout();
  } // Méthode pour gérer la déconnexion (généralement via AuthService)
}
