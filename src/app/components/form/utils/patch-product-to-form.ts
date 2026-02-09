import { FormGroup } from '@angular/forms';
import { Product, ProductFormValue } from '../../../interfaces/product.interface';


function toFormDate(value: Date | string): string {
  return typeof value === 'string'
    ? value.slice(0, 10)
    : (value as Date).toISOString().slice(0, 10);
}


export function productToFormValue(product: Product): Partial<ProductFormValue> {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    logo: product.logo,
    date_release: toFormDate(product.date_release),
    date_revision: toFormDate(product.date_revision),
  };
}


export function patchFormWithProduct(
  form: FormGroup,
  product: Product | null
): void {
  if (product) {
    const value = productToFormValue(product);
    form.patchValue(value);
    const idControl = form.get('id');
    if (idControl) {
      idControl.enable({ emitEvent: false });
      idControl.setValue(product.id, { emitEvent: false });
      idControl.disable({ emitEvent: false });
    }
  } else {
    form.get('id')?.enable();
  }
}
