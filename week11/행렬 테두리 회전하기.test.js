const rotate = (arr, query) => {
  let min = Infinity;

  const row1 = query[0] - 1;
  const col1 = query[1] - 1;
  const row2 = query[2] - 1;
  const col2 = query[3] - 1;

  const temp = arr[row1][col1];

  min = temp;

  for (let i = row1; i < row2; i++) {
    arr[i][col1] = arr[i + 1][col1];
    if (min > arr[i][col1]) min = arr[i][col1];
  }
  for (let i = col1; i < col2; i++) {
    arr[row2][i] = arr[row2][i + 1];
    if (min > arr[row2][i]) min = arr[row2][i];
  }
  for (let i = row2; i > row1; i--) {
    arr[i][col2] = arr[i - 1][col2];
    if (min > arr[i][col2]) min = arr[i][col2];
  }
  for (let i = col2; i > col1; i--) {
    arr[row1][i] = arr[row1][i - 1];
    if (min > arr[row1][i]) min = arr[row1][i];
  }

  arr[row1][col1 + 1] = temp;

  return min;
};

const solution = (rows, columns, queries) => {
  const answer = [];

  let arr = Array.from(Array(rows), () => new Array(columns));

  let number = 1;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      arr[i][j] = number++;
    }
  }

  console.log(arr, ',', queries[0]);

  for (let i = 0; i < queries.length; i++) {
    answer.push(rotate(arr, queries[i]));
  }

  return answer;
};

test('시계방향으로 회전시킨 뒤 최소값을 구한다', () => {
  expect(
    rotate(
      [
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12],
        [13, 14, 15, 16, 17, 18],
        [19, 20, 21, 22, 23, 24],
        [25, 26, 27, 28, 29, 30],
        [31, 32, 33, 34, 35, 36],
      ],
      [2, 2, 5, 4]
    )
  ).toEqual(8);
});

test('solution', () => {
  expect(
    solution(6, 6, [
      [2, 2, 5, 4],
      [3, 3, 6, 6],
      [5, 1, 6, 3],
    ])
  ).toEqual([8, 10, 25]);
  expect(
    solution(3, 3, [
      [1, 1, 2, 2],
      [1, 2, 2, 3],
      [2, 1, 3, 2],
      [2, 2, 3, 3],
    ])
  ).toEqual([1, 1, 5, 3]);
  expect(solution(100, 97, [[1, 1, 100, 97]])).toEqual([1]);
});
