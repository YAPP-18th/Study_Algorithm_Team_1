const greatestCommonFactor = (a, b) => {
  while (b > 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }

  return a;
};

const leastCommonMultiple = (a, b) => {
  return (a * b) / greatestCommonFactor(a, b);
};

const solution = (arr) => {
  let answer = 1;

  arr.forEach((each) => {
    answer = leastCommonMultiple(answer, each);
  });

  return answer;
};

test('최소공배수를 구한다', () => {
  expect(greatestCommonFactor(12, 8)).toEqual(4);
  expect(greatestCommonFactor(2, 5)).toEqual(1);
});

test('최대공약수를 구한다', () => {
  expect(leastCommonMultiple(12, 8)).toEqual(24);
  expect(leastCommonMultiple(2, 5)).toEqual(10);
});

test('solution', () => {
  expect(solution([2, 6, 8, 14])).toEqual(168);
  expect(solution([1, 2, 3])).toEqual(6);
});
