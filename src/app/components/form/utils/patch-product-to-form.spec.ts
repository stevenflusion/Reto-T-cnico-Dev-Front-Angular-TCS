import { FormGroup } from '@angular/forms';
import { createProductForm } from './product-form.config';
import { patchFormWithProduct } from './patch-product-to-form';

describe('patchFormWithProduct', () => {
  it('should patch form and disable id', () => {
    const form = createProductForm();

    patchFormWithProduct(form, {
      id: 'abc123',
      name: 'Test',
      description: 'Valid description here',
      logo: 'logo.png',
      date_release: '2024-01-01',
      date_revision: '2025-01-01'
    } as any);

    expect(form.controls.id.disabled).toBe(true);
    expect(form.controls.name.value).toBe('Test');
  });

  it('should enable id when product is null', () => {
    const form = createProductForm();
    patchFormWithProduct(form, null);
    expect(form.controls.id.enabled).toBe(true);
  });
});
