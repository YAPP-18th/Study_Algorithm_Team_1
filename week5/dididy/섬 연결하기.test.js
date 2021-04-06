const parent = {};
const rank = {};

function init(v) {
  parent[v] = v;
  rank[v] = 0;
}

function findParent(v) {
  if (parent[v] !== v) {
    parent[v] = findParent(parent[v]);
  }
  return parent[v];
}

function unionParent(v, u) {
  const root1 = findParent(v);
  const root2 = findParent(u);
  if (root1 !== root2) {
    if (rank[root1] > rank[root2]) {
      parent[root2] = root1;
    } else {
      parent[root1] = root2;
      if (rank[root1] == rank[root2]) {
        rank[root2]++;
      }
    }
  }
}

function solution(n, costs) {
  costs.sort((a, b) => a[2] - b[2]);

  let answer = 0;

  for (let i = 0; i < n; i++) {
    init(i);
  }

  costs.forEach((cost) => {
     if (findParent(cost[0]) !== findParent(cost[1])) {
      unionParent(cost[0], cost[1]);
      answer += cost[2];
    }
  });

  return answer;
}

test('Test case', () => {
  expect(
    solution(4, [
      [0, 1, 1],
      [0, 2, 2],
      [1, 2, 5],
      [1, 3, 1],
      [2, 3, 8],
    ])
  ).toEqual(4);
});
