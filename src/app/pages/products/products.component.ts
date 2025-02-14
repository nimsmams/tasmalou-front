import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../product.service';
import { Product } from '../../entities';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],  // Ajout de HttpClientModule pour les requêtes HTTP
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  product: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Récupérer tous les produits via le service
    this.productService.getAll().subscribe({
      next: (data) => {
        console.log('Produits récupérés :', data);
        this.product = data;  // Stocker les produits dans la variable 'products'
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des produits:', err);
        alert('Erreur lors de la récupération des produits.');
      },
    });
  }
}


    /*constructor(private ProductService: ProductService) {
      this.ProductService.getAll().subscribe((product) => (this.product = product));
    }

}*/