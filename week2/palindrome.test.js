const solution = (s) => {
  return s
    .split('')
    .reduce(
      (answer, _, i) =>
        Math.max(
          answer,
          Math.max(pailndrome(s, i, i), pailndrome(s, i, i + 1))
        ),
      0
    );
};

const pailndrome = (s, l, r) => {
  while (l >= 0 && r < s.length && s[l] === s[r]) {
    l--;
    r++;
  }
  return r - l - 1;
};

test('solution', () => {
  expect(solution('abcdcba')).toBe(7);
});

test('pailndrome', () => {
  expect(pailndrome('abcdcba', 0, 0)).toBe(1);
  expect(pailndrome('abcdcba', 0, 1)).toBe(0);
  expect(pailndrome('abcdcba', 1, 1)).toBe(1);
  expect(pailndrome('abcdcba', 1, 2)).toBe(0);
  expect(pailndrome('abcdcba', 2, 2)).toBe(1);
  expect(pailndrome('abcdcba', 2, 3)).toBe(0);
  expect(pailndrome('abcdcba', 3, 3)).toBe(7);
  expect(pailndrome('abcdcba', 3, 4)).toBe(0);
  expect(pailndrome('abcdcba', 4, 4)).toBe(1);
  expect(pailndrome('abcdcba', 4, 5)).toBe(0);
  expect(pailndrome('abcdcba', 5, 5)).toBe(1);
  expect(pailndrome('abcdcba', 5, 6)).toBe(0);
});
