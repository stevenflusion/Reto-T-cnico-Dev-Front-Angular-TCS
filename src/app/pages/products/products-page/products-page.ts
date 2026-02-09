import { Component, inject, signal } from '@angular/core';
import { ProductStore } from '../services/product-store.service';
import { ModalsDeleteProduct } from "../../../components/modals/modals";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../../interfaces/product.interface';

@Component({
  selector: 'app-products-page',
  imports: [ModalsDeleteProduct, RouterLink, CommonModule],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage {
  store = inject(ProductStore);

  selectedProduct = signal<Product | null>(null);
  showDeleteModal = signal(false);

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.store.searchTerm.set(value);
    this.store.itemsPerPage.set(5);
  }

  onItemsPerPageChange(event: Event) {
    const value = Number((event.target as HTMLSelectElement).value);
    this.store.itemsPerPage.set(value);
  }

  openDeleteModal(product: Product) {
    this.selectedProduct.set(product);
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
  }

  confirmDelete() {
    const product = this.selectedProduct();
    if (!product) return;

    this.store.deleteProduct(product.id).subscribe(() => {
      this.showDeleteModal.set(false);
    });
  }
}
