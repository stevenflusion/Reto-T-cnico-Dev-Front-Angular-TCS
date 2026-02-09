import { AbstractControl, ValidationErrors } from '@angular/forms';

export function minTodayValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  const selectedDate = control.value;

  return selectedDate < todayString ? { minToday: true } : null;
}
