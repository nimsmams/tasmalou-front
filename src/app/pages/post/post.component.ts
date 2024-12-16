import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AddPostComponent } from '../../add-post/add-post.component';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [RouterLink, RouterModule, AddPostComponent, PostComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
    constructor (public auth: AuthService){}
    logout(){
      this.auth.logout()
    }
   }
