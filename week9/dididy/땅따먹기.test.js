const solution = (land) => {
  const landCopy = land.map((each) => each.slice(0));

  for (let i = 1; i < landCopy.length; i++) {
    for (let j = 0; j < 4; j++) {
      const [a, b, c] = [0, 1, 2, 3].filter((each) => each !== j);

      landCopy[i][j] += Math.max(
        landCopy[i - 1][a],
        landCopy[i - 1][b],
        landCopy[i - 1][c]
      );
    }
  }

  return Math.max(...landCopy[landCopy.length - 1]);
};

test('solution', () => {
  expect(
    solution([
      [1, 2, 3, 5],
      [5, 6, 7, 8],
      [4, 3, 2, 1],
    ])
  ).toEqual(16);
});
