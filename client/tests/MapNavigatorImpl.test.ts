function add(a:number, b:number){
  return a + b;
}

describe('testing add function', () => {
  test('one plus one should be two', () => {
    expect(add(1,1)).toBe(2);
  });

  test('one plus two should be three', () => {
    expect(add(1, 1)).toBe(3);
  });
});