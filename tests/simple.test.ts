import { describe, it, expect, test } from 'vitest';

test('simple addition', () => {
  expect(1 + 1).toBe(2);
});

describe('Simple Math', () => {
  it('should add numbers', () => {
    expect(2 + 2).toBe(4);
  });
});
