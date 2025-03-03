import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, FormGroup } from '@angular/forms';
import { ProductService } from '../../product.service';
import { Product } from '../../entities';

import { AdminAuthGuard } from '../../guards/admin.guard';

import { CategoryService } from '../../category.service';  // Service pour les catégories
import { CommonModule } from '@angular/common';

import { Category } from '../../entities';  // Assurez-vous que le chemin est correct

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
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

  selectedCategories: number[] = []; // Pour stocker les ID des catégories sélectionnées
  selectedParentCategoryId: number | null = null; // Pour stocker l'ID du parent sélectionné

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


  addProduct() {
      const newProduct: Product = {
      product_name: this.product_name,
      latin_name: this.latin_name,
      description: this.description,
      plant_section: this.plant_section,
      family: this.family,
      image_path: this.image_path,
      category_ids: this.selectedCategories, // Envoie un tableau d'IDs de catégories
    };

    this.ProductService.create(newProduct).subscribe({
      next: (res) => {
        console.log('Produit créé avec succès', res);
        alert('Produit créé avec succès !');
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
      parent_id: this.selectedParentCategoryId || null,  // Ajout du parent_id
    };

    this.categoryService.addCategory(newCategory).subscribe({
      next: (res) => {
        this.newCategoryName = '';
        this.newCategoryDescription = '';
        this.selectedParentCategoryId = null;
        this.loadCategories();
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout de la catégorie :', err);
      },
    });
  }

    // Méthode pour charger toutes les catégories
  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = this.buildCategoryTree(data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des catégories :', err);
      },
    });
  }

  buildCategoryTree(categories: any[], level: number = 0) {
    let categoryMap = new Map();
    let rootCategories: any[] = [];
  
    // Étape 1: Construire un mappage des catégories
    categories.forEach(cat => {
      categoryMap.set(cat.id, { ...cat, children: [], level: level });
    });
  
    // Étape 2: Organiser les catégories en hiérarchie (parent -> enfants)
    categories.forEach(cat => {
      if (cat.parent_id) {
        categoryMap.get(cat.parent_id)?.children.push(categoryMap.get(cat.id));
      } else {
        rootCategories.push(categoryMap.get(cat.id));
      }
    });
  
    return rootCategories;
  }

  // Supprimer une catégorie
deleteCategory(id: number) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        alert('Catégorie supprimée avec succès !');
        this.loadCategories();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la catégorie :', err);
      },
    });
  }
}

// Modifier une catégorie
updateCategory(category: Category) {
  const newCategoryName = prompt("Nouveau nom de la catégorie :", category.category_name);
  const newDescription = prompt("Nouvelle description :", category.description);
  const newParentId = prompt("ID du nouveau parent (laisser vide pour aucun) :", category.parent_id?.toString() || '');

  if (newCategoryName && newDescription) {
    // Création de l'objet 'updatedCategory' dans le format attendu par le service
    const updatedCategory: Category = {
      id: category.id,  // Assure-toi d'ajouter l'ID ici, car le backend pourrait en avoir besoin
      category_name: newCategoryName,
      description: newDescription,
      parent_id: newParentId ? parseInt(newParentId) : undefined
    };

    // On passe maintenant l'objet avec la structure attendue par 'updateCategory'
    this.categoryService.updateCategory(category.id, updatedCategory).subscribe({
      next: () => {
        alert('Catégorie mise à jour avec succès !');
        this.loadCategories();
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de la catégorie :', err);
      },
    });
  }
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
