import { FormControl } from '@angular/forms';
import { minTodayValidator } from './validators';

describe('minTodayValidator', () => {
  it('should allow today date', () => {
    const today = new Date().toISOString().split('T')[0];
    const control = new FormControl(today);
    expect(minTodayValidator(control)).toBeNull();
  });

  it('should reject past date', () => {
    const control = new FormControl('2000-01-01');
    expect(minTodayValidator(control)).toEqual({ minToday: true });
  });

  it('should return null if empty', () => {
    const control = new FormControl('');
    expect(minTodayValidator(control)).toBeNull();
  });
});
