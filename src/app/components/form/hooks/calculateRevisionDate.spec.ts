import { calculateRevisionDate } from './calculateRevisionDate';

describe('calculateRevisionDate', () => {
  it('should add one year to release date', () => {
    const result = calculateRevisionDate('2024-05-10');
    expect(result).toBe('2025-05-10');
  });

  it('should handle leap year correctly', () => {
    const result = calculateRevisionDate('2020-02-29');
    expect(result).toBe('2021-03-01');
  });
});
