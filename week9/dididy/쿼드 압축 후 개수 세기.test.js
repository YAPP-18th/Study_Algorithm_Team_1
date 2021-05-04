const getAnswer = (arr) => {
  const sum = arr.flat().reduce((acc, cur) => acc + cur, 0);

  let len = arr.length;

  if (sum === 0) {
    return [1, 0];
  }

  if (sum === Math.pow(len, 2)) {
    return [0, 1];
  }

  let calcSum = [0, 0];

  len /= 2;

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      const rowLen = i * len;
      const colLen = j * len;

      const next = arr
        .slice(rowLen, rowLen + len)
        .map((row) => row.slice(colLen, colLen + len));

      const [zero, one] = getAnswer(next);

      calcSum[0] += zero;
      calcSum[1] += one;
    }
  }

  return calcSum;
};

const solution = (arr) => {
  const copyArr = arr.slice();

  return getAnswer(copyArr);
};

test('solution', () => {
  expect(
    solution([
      [1, 1, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 1],
      [1, 1, 1, 1],
    ])
  ).toEqual([4, 9]);
  expect(
    solution([
      [1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 1, 1],
      [0, 1, 0, 0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 1, 0, 0, 1],
      [0, 0, 0, 0, 1, 1, 1, 1],
    ])
  ).toEqual([10, 15]);
});
