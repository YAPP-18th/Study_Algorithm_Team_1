const getGcd = (a, b) => {
  if (!b) {
    return a;
  }

  return getGcd(b, a % b);
};

const solution = (w, h) => {
  let gcd = getGcd(w, h);
  let answer = w * h - gcd * (w / gcd + h / gcd - 1);

  return answer;
};

test('두 수의 최대공약수를 구한다', () => {
  expect(getGcd(8, 12)).toEqual(4);
});

test('solution', () => {
  expect(solution(8, 12)).toEqual(80);
});
