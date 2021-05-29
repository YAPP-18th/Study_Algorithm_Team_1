const solution = (n) => {
  let answer = 0;

  while (n > 0) {
    if (n % 2 !== 0) {
      n = n - 1;
      answer = answer + 1;
      continue;
    }
    n = n / 2;
  }
  return answer;
};

test('solution', () => {
  expect(solution(5)).toEqual(2);
  expect(solution(6)).toEqual(2);
  expect(solution(5000)).toEqual(5);
});
