const solution = (n) => {
  let answer = 0;
  let count = getLength(n);

  let flag = true;

  while (flag) {
    n++;

    if (count === getLength(n)) {
      answer = n;
      flag = false;
    }
  }
  return answer;
};

const getLength = (n) => {
  return n.toString(2).split(1).length;
};

test('1의 갯수를 구한다', () => {
  expect(getLength(78)).toEqual(5);
  expect(getLength(1024)).toEqual(2);
});

test('solution', () => {
  expect(solution(78)).toEqual(83);
  expect(solution(15)).toEqual(23);
});
