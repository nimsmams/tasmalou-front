import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormGroup } from '@angular/forms';
import { ProductService } from '../../product.service';
import { Product } from '../../entities';

import { AdminAuthGuard } from '../../guards/admin.guard';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  constructor(
    private accessService: AdminAuthGuard,
    private router: Router,
    private ProductService: ProductService
  ) {}
  ngOnInit(): void {
    if (!this.accessService.canActivate()) {
      this.router.navigate(['/login']);
    }
  }
  product_name = '';
  latin_name = '';
  description = '';
  plant_section = '';
  family = '';
  image_path = '';

  onSubmit() {
    const newPost: Product = {
      product_name: this.product_name,
      latin_name: this.latin_name,
      description: this.description,
      plant_section: this.plant_section,
      family: this.family,
      image_path: this.image_path,
    };

    this.ProductService.create(newPost).subscribe({
      next: (res) => {
        console.log('Post créé avec succès :', res);
        alert('Post créé avec succès !');
        this.product_name = '';
        this.latin_name = '';
        this.description = '';
        this.plant_section = '';
        this.family = '';
        this.image_path = '';
      },
      error: (err) => {
        console.error('Erreur lors de la création du post :', err);
        alert('Erreur lors de la création du post.');
      },
    });
  }
}

//mettre un truc comme ca avec le update à la place ici: handleSubmit() {
//this.postService.create(this.post).subscribe(() => alert('bravo'))
//}
//adminSubmit(){

//}
