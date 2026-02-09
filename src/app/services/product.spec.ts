import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product';
import { environment } from '../../environments/environment.development';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const baseUrl = `${environment.API_URL}bp/products`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should initialize productsResource with default value', () => {
    const value = service.productsResource.value();
    expect(value).toEqual({ data: [], success: true });
  });

  it('should call reload on productsResource', () => {
    const spy = jest.spyOn(service.productsResource, 'reload');
    service.refetchProducts();
    expect(spy).toHaveBeenCalled();
  });

  it('should create a product', () => {
    const product: any = { id: '1', name: 'Test' };

    service.createProduct(product).subscribe((res) => {
      expect(res.success).toBe(true);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(product);

    req.flush({ success: true, data: [] });
  });

  it('should edit a product', () => {
    const product: any = { id: '1', name: 'Updated' };

    service.editProduct('1', product).subscribe();

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('PUT');

    req.flush({ success: true, data: [] });
  });

  it('should delete a product', () => {
    service.deleteProduct('1').subscribe();

    const req = httpMock.expectOne(`${baseUrl}/1`);
    expect(req.request.method).toBe('DELETE');

    req.flush({ success: true, data: [] });
  });

  it('should refetch products', () => {
    const spy = jest.spyOn(service.productsResource, 'reload');
    service.refetchProducts();
    expect(spy).toHaveBeenCalled();
  });
});
