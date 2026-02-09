import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('should format Date object', () => {
    const date = new Date('2024-06-01');
    expect(formatDate(date)).toBe('2024-06-01');
  });

  it('should format string date', () => {
    expect(formatDate('2024-06-01')).toBe('2024-06-01');
  });

  it('should return empty string for null', () => {
    expect(formatDate('' as any)).toBe('');
  });
});
