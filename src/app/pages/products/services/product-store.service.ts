import { computed, inject, Injectable, signal } from "@angular/core";
import { ProductService } from "../../../services/product";
import { normalizeText } from "../../../shared/utils/string-normalizer";
import { tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ProductStore {
  private productService = inject(ProductService);

  searchTerm = signal('');
  itemsPerPage = signal(5);

  products = computed(() =>
    this.productService.productsResource.value()?.data ?? []
  );

  filteredProducts = computed(() => {
    const term = normalizeText(this.searchTerm());
    if (!term) return this.products();

    return this.products().filter(p =>
      normalizeText(p.name).includes(term)
    );
  });

  paginatedProducts = computed(() =>
    this.filteredProducts().slice(0, this.itemsPerPage())
  );

  isLoading = computed(() =>
    this.productService.productsResource.isLoading()
  );

  deleteProduct(id: string) {
    return this.productService.deleteProduct(id).pipe(
      tap(() => this.productService.refetchProducts())
    );
  }
}
