import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CreatePage } from './create-page';
import { ProductService } from '../../services/product';
import { of, throwError } from 'rxjs';

describe('CreatePage', () => {
  let component: CreatePage;
  let productService: jest.Mocked<ProductService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreatePage,
        {
          provide: ProductService,
          useValue: {
            createProduct: jest.fn(),
            refetchProducts: jest.fn(),
          },
        },
      ],
    });

    component = TestBed.inject(CreatePage);
    productService = TestBed.inject(ProductService) as jest.Mocked<ProductService>;
  });

  it('should call createProduct and refetch on success', fakeAsync(() => {
    productService.createProduct.mockReturnValue(of({ message: 'Product added successfully' }));

    const formValue = {
      id: 'abc',
      name: 'Test',
      description: 'Valid description here',
      logo: 'logo.png',
      date_release: '2024-01-01',
      date_revision: '2025-01-01',
    };

    component.createProduct(formValue);
    tick(2500); // simula los setTimeout

    expect(productService.createProduct).toHaveBeenCalledWith(formValue);
    expect(productService.refetchProducts).toHaveBeenCalled();
    expect(component.successProduct()).toBe(false); // después del timeout
  }));

  it('should set errorProduct to true on 400 error', () => {
    const error = { status: 400 } as any;
    productService.createProduct.mockReturnValue(throwError(() => error));

    component.createProduct({} as any);

    expect(component.errorProduct()).toBe(true);
  });
});
