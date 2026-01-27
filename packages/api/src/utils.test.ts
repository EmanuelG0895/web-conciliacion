// Example API utility test
describe('API Utils', () => {
  it('should be testable', () => {
    expect(true).toBe(true);
  });

  it('can test simple functions', () => {
    const add = (a: number, b: number) => a + b;
    expect(add(2, 3)).toBe(5);
  });
});