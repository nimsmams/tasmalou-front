import { Routes } from '@angular/router';
import { AdminAuthGuard } from './guards/admin.guard';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
    {
        path:'', 
        loadComponent: () => import('./pages/home/home.component').then( m => m.HomeComponent)
    },
    {
        path:'home', 
        loadComponent: () => import('./pages/home/home.component').then( m => m.HomeComponent)
    },
    {
        path:'login', 
        loadComponent: () => import('./pages/login/login.component').then( m => m.LoginComponent)
    },
    {
        path:'register', 
        loadComponent: () => import('./pages/register/register.component').then( m => m.RegisterComponent)
    },
    {
        path:'post', 
        loadComponent: () => import('./pages/post/post.component').then( m => m.PostComponent)
    },
    {
        path:'admin', 
        component: AdminComponent,
        canActivate:[AdminAuthGuard]
    },
    {
        path:'plants', 
        loadComponent: () => import('./pages/products/products.component').then( m => m.ProductsComponent)
    },
    {
        path:'besoins', 
        loadComponent: () => import('./pages/besoins/besoins.component').then( m => m.BesoinsComponent)
    },

  
];