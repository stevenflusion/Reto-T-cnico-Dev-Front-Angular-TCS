import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EditPage } from './edit-page';
import { ProductService } from '../../services/product';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('EditPage', () => {
  let component: EditPage;
  let productService: jest.Mocked<ProductService>;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EditPage,
        {
          provide: ProductService,
          useValue: {
            editProduct: jest.fn(),
            refetchProducts: jest.fn(),
            productDetailResource: jest.fn().mockReturnValue({
              value: () => ({
                data: {
                  id: '1',
                  name: 'Test',
                  description: 'Desc',
                  logo: 'logo.png',
                  date_release: '2024-01-01',
                  date_revision: '2025-01-01',
                },
              }),
              reload: jest.fn(),
            }),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
        {
          provide: Router,
          useValue: { navigate: jest.fn() },
        },
      ],
    });

    component = TestBed.inject(EditPage);
    productService = TestBed.inject(ProductService) as jest.Mocked<ProductService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('should load product id from route', () => {
    component.ngOnInit();
    expect(component.productId()).toBe('1');
  });

  it('should call editProduct and refetch on success', fakeAsync(() => {
    productService.editProduct.mockReturnValue(of({ message: 'Product updated successfully' }));

    const formValue = {
      id: '1',
      name: 'Updated',
      description: 'Updated desc',
      logo: 'logo.png',
      date_release: '2024-01-01',
      date_revision: '2025-01-01',
    };

    component.productId.set('1');
    component.editProduct(formValue);
    tick(2500);

    expect(productService.editProduct).toHaveBeenCalledWith('1', formValue);
    expect(productService.refetchProducts).toHaveBeenCalled();
    expect(component.successProduct()).toBe(false);
  }));
});
