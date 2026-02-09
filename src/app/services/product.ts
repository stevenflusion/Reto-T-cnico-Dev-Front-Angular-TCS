import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ProductsResponse, ProductDetailResponse, Product } from '../interfaces/product.interface';


@Injectable({
  providedIn: 'root',
})
export class ProductService {

  http = inject(HttpClient);
  base_url = environment.API_URL;

  private dataURL = `${this.base_url}bp/products`;

  productsResource = httpResource<ProductsResponse>(() => this.dataURL, {
    defaultValue: { data: [], success: true },
  });

  productDetailResource = (id: () => string) =>
    httpResource<ProductDetailResponse>(() => {
      const productId = id();
      return productId ? `${this.dataURL}/${productId}` : undefined;
    });

  createProduct(data: Product) {
    return this.http.post<ProductsResponse>(this.dataURL, data);
  }

  editProduct(id: string, data: Product) {
    return this.http.put<ProductsResponse>(`${this.dataURL}/${id}`, data);
  }

  deleteProduct(id: string) {
    return this.http.delete<ProductsResponse>(`${this.dataURL}/${id}`);
  }

  refetchProducts() {
    this.productsResource.reload()
  }

}
