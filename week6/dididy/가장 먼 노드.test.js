const solution = (n, edge) => {
  const queue = [1];
  const visited = new Array(n + 1).fill(-1);

  visited[0] = 0;
  visited[1] = 0;

  const BFS = () => {
    do {
      let node = queue.shift();

      for (let i = 0; i < edge.length; i++) {
        if (edge[i].includes(node)) {
          let filter = edge[i].filter((each) => each !== node);

          if (visited[filter[0]] !== -1) {
            edge.splice(i, 1);
            i--;
            continue;
          }

          queue.push(filter[0]);
          visited[filter[0]] = visited[node] + 1;
          edge.splice(i, 1);
          i--;
        }
      }
    } while (edge.length !== 0);

    return visited.filter((each) => each === Math.max(...visited)).length;
  };

  return BFS();
};

test('Test case', () => {
  expect(
    solution(6, [
      [3, 6],
      [4, 3],
      [3, 2],
      [1, 3],
      [1, 2],
      [2, 4],
      [5, 2],
    ])
  ).toEqual(3);
});
