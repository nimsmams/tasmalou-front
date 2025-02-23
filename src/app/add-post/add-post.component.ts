import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../entities';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css',
})
export class AddPostComponent {
  constructor(private productService: ProductService) {}

  product: Product = {
    product_name: '',
    latin_name: '',
    description: '',
    plant_section: '',
    family: '',
    image_path:'',
    category_ids: []
  };

  handleSubmit() {
    this.productService.create(this.product).subscribe(() => alert('bravo'));
  }
}
