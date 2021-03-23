const solution = (s) =>
  s
    .split(' ')
    .map((word) => change(word))
    .join(' ');

const change = (word) =>
  /^[a-zA-Z]/.test(word)
    ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    : word;

test('solution', () => {
  expect(solution('3people unFollowed me')).toBe('3people Unfollowed Me');
  expect(solution('for the last week')).toBe('For The Last Week');
});

test('첫 문자를 대문자로 바꾼다', () => {
  expect(change('apple')).toBe('Apple');
  expect(change('3people')).toBe('3people');
  expect(change('Banana')).toBe('Banana');
});
