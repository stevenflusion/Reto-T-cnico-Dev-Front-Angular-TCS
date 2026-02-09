import { Component, computed, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Product,
  ProductDetailResponse,
  ProductFormValue,
} from '../../interfaces/product.interface';
import { Form } from '../../components/form/form';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-page',
  imports: [Form],
  templateUrl: './edit-page.html',
  styleUrl: './edit-page.css',
})
export class EditPage {
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  navegate = inject(Router);
  productId = signal<string>('');
  successProduct = signal<boolean>(false);
  errorProduct = signal<boolean>(false);

  closeModaError = () => this.errorProduct.set(false);

  productResource = this.productService.productDetailResource(() => this.productId());

  product = computed<Product | null>(() => {
    const res = this.productResource.value();
    if (!res) return null;
    const detail = res as ProductDetailResponse;
    return (detail.data ?? res) as Product;
  });

  ngOnInit(): void {
    this.productResource.reload();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId.set(id);
    }
  }

  editProduct(formValue: ProductFormValue) {
    console.log(formValue);

    const productToSend: Product = {
      id: formValue.id,
      name: formValue.name,
      description: formValue.description,
      logo: formValue.logo,
      date_release: formValue.date_release,
      date_revision: formValue.date_revision,
    };

    this.productService.editProduct(this.productId(), productToSend).subscribe({
      next: (res: any) => {
        if (res.message === 'Product updated successfully') {
          this.successProduct.set(true);
          setTimeout(() => {
            this.successProduct.set(false);
          }, 1500);
          setTimeout(() => {
            this.navegate.navigate(['/']);
          }, 2500);
          this.productService.refetchProducts();
        }
      }
    });
  }
}
