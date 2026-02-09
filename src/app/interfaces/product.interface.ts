export interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: Date | string;
  date_revision: Date | string;
}


export interface ProductsResponse {
  data?: Product[];
  message?: string;
  success?: boolean;
  error?: boolean;
}

export interface ProductDetailResponse {
  data: Product;
  message?: string;
  success?: boolean;
}

export interface ProductFormValue {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

