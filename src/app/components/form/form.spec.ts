import { TestBed } from '@angular/core/testing';
import { Form } from './form';
import { ProductService } from '../../services/product';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';

describe('Form', () => {
  let component: Form;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        Form,
        { provide: ProductService, useValue: {} },
      ],
    });

    component = TestBed.inject(Form);
  });

  it('should emit submitForm when form is valid', () => {
  component.productForm.setValue({
    id: '1',
    name: 'Test',
    description: 'Desc test',
    logo: 'logo.png',
    date_release: '2024-01-01',
    date_revision: '2025-01-01',
  });

  const spy = jest.spyOn(component.submitForm, 'emit');
  component.functionToPerform();

  expect(spy).toHaveBeenCalled();
  expect(component.showGeneralError()).toBe(false);
});


  it('should show error if form is invalid', () => {
    component.productForm.controls['name'].setValue(''); // inválido
    component.functionToPerform();

    expect(component.showGeneralError()).toBe(true);
  });

  it('should reset form preserving id', () => {
    component.product = { id: '123', name: 'Prod' } as any;
    component.productForm.controls['id'].setValue('123');
    component.resetForm();

    expect(component.productForm.controls['id'].value).toBe('123');
  });
});
