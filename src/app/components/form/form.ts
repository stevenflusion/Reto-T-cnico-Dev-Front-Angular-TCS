import { Component, inject, EventEmitter, Output, Input, OnChanges, SimpleChanges, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product';
import { INITIAL_FORM_VALUE } from './constants';
import { setupDateRevisionSync } from './hooks/calculateRevisionDate';
import { createProductForm } from './utils/product-form.config';
import { patchFormWithProduct } from './utils/patch-product-to-form';
import { Product, ProductFormValue } from '../../interfaces/product.interface';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form implements OnChanges {

  productService = inject(ProductService);
  productForm = createProductForm();

  @Output() submitForm = new EventEmitter<ProductFormValue>();
  @Input() product: Product | null = null;

  showGeneralError = signal<boolean>(false)

  ngOnChanges(changes: SimpleChanges): void {
    const product = changes['product']?.currentValue as Product | null;
    patchFormWithProduct(this.productForm, product);
  }

  functionToPerform() {
    this.productForm.markAllAsTouched();
    if (this.productForm.invalid) {
      this.showGeneralError.set(true);
      return
    };

    this.submitForm.emit(this.productForm.getRawValue() as ProductFormValue);
    this.resetForm();
  }

  resetForm(): void {
    if (this.product) {
      const currentId = this.productForm.controls['id'].value

      this.productForm.reset({
        ...INITIAL_FORM_VALUE,
        id: currentId
      })

    } else {
      this.productForm.reset({ ...INITIAL_FORM_VALUE });
    }
  }

  ngOnInit(): void {
    setupDateRevisionSync(this.productForm);
  }
}
