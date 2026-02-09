import { Component, inject, signal } from '@angular/core';
import { Product, ProductFormValue } from '../../interfaces/product.interface';
import { ProductService } from '../../services/product';
import { Form } from '../../components/form/form';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-page',
  imports: [Form],
  templateUrl: './create-page.html',
  styleUrl: './create-page.css',
})
export class CreatePage {
  productService = inject(ProductService);
  route = inject(Router);

  successProduct = signal<boolean>(false);
  errorProduct = signal<boolean>(false);

  closeModaError = () => this.errorProduct.set(false);

  createProduct(formValue: ProductFormValue) {
    console.log(formValue);

    const productToSend: Product = {
      id: formValue.id,
      name: formValue.name,
      description: formValue.description,
      logo: formValue.logo,
      date_release: formValue.date_release,
      date_revision: formValue.date_revision,
    };

    this.productService.createProduct(productToSend).subscribe({
      next: (response: any) => {
        if (response.message === "Product added successfully") {
          this.successProduct.set(true);
          setTimeout(() => {
            this.successProduct.set(false);
          }, 1500);
          setTimeout(() => {
            this.route.navigate(['/']);
          }, 2500);
          this.productService.refetchProducts();
        } 
      }, error: (error: HttpErrorResponse) => {
        if(error.status === 400) {
          this.closeModaError()
          this.errorProduct.set(true);
        }
      }
    });
  }
}
