import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormGroup } from '@angular/forms';
import { ProductService } from '../../product.service';
import { Product } from '../../entities';

import { AdminAuthGuard } from '../../guards/admin.guard';

import { CategoryService } from '../../category.service';  // Service pour les catégories

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent implements OnInit{
  
  product_name = '';
  latin_name = '';
  description = '';
  plant_section = '';
  family = '';
  image_path = '';
  category_ids: number[] = [];  // Tableau pour gérer plusieurs catégories


  categories: any[] = []; // Stocker les catégories
  newCategoryName = '';
  newCategoryDescription = '';

  constructor(
    private accessService: AdminAuthGuard,
    private router: Router,
    private ProductService: ProductService,
    private categoryService: CategoryService  // Injection du CategoryService
  ) {}

  ngOnInit(): void {
    if (!this.accessService.canActivate()) {
      this.router.navigate(['/login']);
    }
    this.loadCategories();
  }


  onSubmit() {
      const newPost: Product = {
      product_name: this.product_name,
      latin_name: this.latin_name,
      description: this.description,
      plant_section: this.plant_section,
      family: this.family,
      image_path: this.image_path,
      category_ids: this.category_ids, // Envoie un tableau d'IDs de catégories
    };

    this.ProductService.create(newPost).subscribe({
      next: (res) => {
        console.log('Post créé avec succès :', res);
        alert('Post créé avec succès !');
        this.resetForm();

      },

      error: (err) => {
        console.error('Erreur lors de la création du produit :', err);
        alert('Erreur lors de la création du produit');
      },
    });
  }

  addCategory() {
    if (!this.newCategoryName.trim() || !this.newCategoryDescription.trim()) {
      alert('Veuillez remplir tous les champs de la catégorie.');
      return;
    }

    const newCategory = {
      category_name: this.newCategoryName,
      description: this.newCategoryDescription,
    };

    this.categoryService.addCategory(newCategory).subscribe({
      next: (res) => {
        console.log('Catégorie ajoutée :', res);
        alert('Catégorie ajoutée avec succès !');
        this.newCategoryName = '';
        this.newCategoryDescription = '';
        this.loadCategories();
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout de la catégorie :', err);
        alert('Erreur lors de l’ajout de la catégorie.');
      },
    });
  }

    // Méthode pour charger toutes les catégories
  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des catégories :', err);
      },
    });
  }

  resetForm() {
    this.product_name = '';
    this.latin_name = '';
    this.description = '';
    this.plant_section = '';
    this.family = '';
    this.image_path = '';
    this.category_ids = [];
  }
}

//mettre un truc comme ca avec le update à la place ici: handleSubmit() {
//this.postService.create(this.post).subscribe(() => alert('bravo'))
//}
//adminSubmit(){

//}
