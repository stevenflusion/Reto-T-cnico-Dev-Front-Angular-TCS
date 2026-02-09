import { FormGroup } from '@angular/forms';

export function calculateRevisionDate(releaseDateStr: string): string {
  const releaseDate = new Date(releaseDateStr);
  const revisionDate = new Date(releaseDate);
  revisionDate.setFullYear(releaseDate.getFullYear() + 1);
  return revisionDate.toISOString().split('T')[0];
}

export function setupDateRevisionSync(productForm: FormGroup): void {
  productForm.get('date_release')?.valueChanges.subscribe((value) => {
    if (!value) return;

    const revisionDate = calculateRevisionDate(value);
    productForm.get('date_revision')?.setValue(revisionDate, { emitEvent: false });
  });
}
