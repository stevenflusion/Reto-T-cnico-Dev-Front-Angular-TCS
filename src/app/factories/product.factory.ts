import { Product } from '../interfaces/product.interface';

export function createEmptyProduct(): Product {
  const now = new Date();
  return {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: now,
    date_revision: now,
  };
}
