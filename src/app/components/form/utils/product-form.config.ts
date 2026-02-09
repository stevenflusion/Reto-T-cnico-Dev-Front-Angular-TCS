import { FormControl, FormGroup, Validators } from '@angular/forms';
import { minTodayValidator } from './validators';
import { INITIAL_FORM_VALUE } from '../constants';


export function createProductForm(): FormGroup {
  return new FormGroup(
    {
      id: new FormControl<string>(INITIAL_FORM_VALUE.id, {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
      }),
      name: new FormControl<string>(INITIAL_FORM_VALUE.name, {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
      }),
      description: new FormControl<string>(INITIAL_FORM_VALUE.description, {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(200)],
      }),
      logo: new FormControl<string>(INITIAL_FORM_VALUE.logo, {
        nonNullable: true,
        validators: Validators.required,
      }),
      date_release: new FormControl<string>(INITIAL_FORM_VALUE.date_release, {
        nonNullable: true,
        validators: [Validators.required, minTodayValidator],
      }),
      date_revision: new FormControl(
        { value: INITIAL_FORM_VALUE.date_revision, disabled: true },
        { nonNullable: true }
      ),
    },
    { updateOn: 'change' }
  );
}
