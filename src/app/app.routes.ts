import { Routes } from '@angular/router';

export const routes: Routes = [
   {
    path: 'products',
    loadComponent: () => import('./pages/products/products-page/products-page').then(m => m.ProductsPage)
  }, {
    path: 'products/create',
    loadComponent: () => import('./pages/create-page/create-page').then(m => m.CreatePage)
  }, {
    path: 'products/edit/:id',
    loadComponent: () => import('./pages/edit-page/edit-page').then(m => m.EditPage)
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: '/products'
  }, {
    path: '**',
    redirectTo: '/products'
  }
];
