const solution = (n, results) => {
  let answer = 0;

  const battle = Array.from(Array(n + 1), () => Array(n + 1).fill(false));

  results.forEach(([a, b]) => (battle[a][b] = true));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      for (let k = 1; k <= n; k++) {
        if (battle[j][i] && battle[i][k]) {
          battle[j][k] = true;
        }
      }
    }
  }

  for (let i = 1; i <= n; i++) {
    let count = 0;

    for (let j = 1; j <= n; j++) {
      if (battle[i][j] || battle[j][i]) {
        count++;
      }
    }

    if (count === n - 1) {
      answer++;
    }
  }

  return answer;
};

test('solution', () => {
  expect(
    solution(5, [
      [4, 3],
      [4, 2],
      [3, 2],
      [1, 2],
      [2, 5],
    ])
  ).toEqual(2);
});
