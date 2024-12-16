import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Post } from '../entities';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule, AddPostComponent],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {
  
  constructor(private postService:PostService){}

  post:Post = {
    product_name: '',
    latin_name: '',
    description: '',
    plant_section:'',
    family:''
  }

  handleSubmit() {
    this.postService.create(this.post).subscribe(() => alert('bravo'))
  }
}