import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { AddPostComponent } from '../../add-post/add-post.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, RouterLink, AddPostComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 constructor (public auth: AuthService){}
}
