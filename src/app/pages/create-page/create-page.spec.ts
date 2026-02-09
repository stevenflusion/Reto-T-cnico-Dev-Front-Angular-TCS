import { TestBed } from '@angular/core/testing';
import { CreatePage } from './create-page';
import { ProductService } from '../../services/product';
import { of } from 'rxjs';

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

  it('should call createProduct and refetch on success', () => {
    productService.createProduct.mockReturnValue(
      of({ success: true })
    );

    const formValue: any = {
      id: 'abc',
      name: 'Test',
      description: 'Valid description here',
      logo: 'logo.png',
      date_release: '2024-01-01',
      date_revision: '2025-01-01',
    };

    component.createProduct(formValue);

    expect(productService.createProduct).toHaveBeenCalledWith(formValue);
    expect(productService.refetchProducts).toHaveBeenCalled();
  });
});
