import { createProductForm } from './product-form.config';

describe('createProductForm', () => {
  it('should be invalid when empty', () => {
    const form = createProductForm();
    expect(form.invalid).toBe(true);
  });

  it('id should enforce min and max length', () => {
    const form = createProductForm();
    form.controls.id.setValue('ab');
    expect(form.controls.id.invalid).toBe(true);

    form.controls.id.setValue('abcdefghijk');
    expect(form.controls.id.invalid).toBe(true);

    form.controls.id.setValue('abc');
    expect(form.controls.id.valid).toBe(true);
  });

  it('name should enforce length rules', () => {
    const form = createProductForm();
    form.controls.name.setValue('test');
    expect(form.controls.name.invalid).toBe(true);

    form.controls.name.setValue('Valid Product Name');
    expect(form.controls.name.valid).toBe(true);
  });
});
