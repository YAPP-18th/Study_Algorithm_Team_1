const solution = (name) => {
  return 0;
};

const distance = (letter) => {
  const ascii = letter.charCodeAt(0);
  return ascii < 78 ? ascii - 65 : 91 - ascii;
};

test('solution', () => {
  // expect(solution('JEROEN')).toBe(56);
  // expect(solution('BBBAAAB')).toBe(9);
});

test('현재 알파벳에서 A까지의 거리를 반환한다', () => {
  expect(distance('J')).toBe(9);
  expect(distance('E')).toBe(4);
  expect(distance('R')).toBe(9);
  expect(distance('Q')).toBe(10);
  expect(distance('O')).toBe(12);
  expect(distance('N')).toBe(13);
  expect(distance('B')).toBe(1);
});
