const solution = (a) => {
  const [l, r] = [left(a), right(a)];
  const result = l.map((v, i) => v + r[i]);
  return result.filter((v) => v !== 2).length;
};

const left = (a) => {
  let min = a[0];
  const count = Array(a.length).fill(0);
  for (let i = 1; i < a.length; i++) {
    if (min > a[i]) {
      min = a[i];
      continue;
    }
    count[i] += 1;
  }
  return count;
};

const right = (a) => {
  let min = a[a.length - 1];
  const count = Array(a.length).fill(0);
  for (let i = a.length - 2; i >= 0; i--) {
    if (min > a[i]) {
      min = a[i];
      continue;
    }
    count[i] += 1;
  }
  return count;
};

test('solution', () => {
  expect(solution([-16, 27, 65, -2, 58, -92, -71, -68, -61, -33])).toBe(6);
  expect(solution([9, -1, 5])).toBe(3);
});
