const solution = (maps) => {
  let answer = -1;

  let dy = [1, -1, 0, 0];
  let dx = [0, 0, 1, -1];

  const queue = [[0, 0, 1]];

  while (queue.length) {
    const [y, x, count] = queue[0];

    queue.shift();

    if (y === maps.length - 1 && x === maps[0].length - 1) {
      answer = count;
      break;
    }

    for (let i = 0; i < 4; i++) {
      let nx = y + dy[i];
      let ny = x + dx[i];

      if (ny < 0 || nx < 0 || ny >= maps[0].length || nx >= maps.length) {
        continue;
      }
      if (maps[nx][ny] === 0 || maps[nx][ny] === 2) {
        continue;
      }

      maps[nx][ny] = 2;

      queue.push([nx, ny, count + 1]);
    }
  }

  return answer;
};

test('solution', () => {
  expect(
    solution([
      [1, 0, 1, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 1, 1, 1],
      [1, 1, 1, 0, 1],
      [0, 0, 0, 0, 1],
    ])
  ).toEqual(11);
  expect(
    solution([
      [1, 0, 1, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 0, 1, 1, 1],
      [1, 1, 1, 0, 0],
      [0, 0, 0, 0, 1],
    ])
  ).toEqual(-1);
});
