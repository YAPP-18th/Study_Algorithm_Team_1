const solution = (a) => {
  // 왼쪽과 오른쪽에 대한 결과를 받아 두 개의 배열값을
  const [l, r] = [left(a), right(a)];
  // 같은 index끼리 더합니다.
  const result = l.map((v, i) => v + r[i]);
  // 더한 결과 배열에서 자신을 기준으로 양쪽에 자신보다 작은 숫자가
  // 둘 다 있는 경우는 원소가 2 값을 가지므로, 2를 제외한 값만
  // 걸러내서 그 길이를 반환합니다.
  return result.filter((v) => v !== 2).length;
};

// 배열을 인자로 받아 0번 index를 가장 작은 최소값으로 정하고
// 오른쪽 방향으로 배열을 순회합니다.
// 순회의 목적은 현재 index값, 즉 a[i]의 값 왼쪽에 최소값이 있는지를
// 검사하여 count 배열에 같은 위치의 index, 즉 count[i] 값을
// 증가시켜 최소값 존재 유무를 카운팅 합니다.
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

// left와 마찬가지로 이번에는 자신의 위치를 기준으로 하여
// 오른쪽 값에 대해여 판별합니다.
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
