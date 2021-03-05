const solution = (a) => {
  // const answer = [];
  // for (let i = 0; i < a.length; i++) {
  //   const left = isExistMinValue(a[i], a.slice(0, i));
  //   const right = isExistMinValue(a[i], a.slice(i + 1, a.length));
  //   if (left && right) continue;
  //   answer.push(a[i]);
  // }
  // return answer.length;
  return a.filter((value, index) =>
    [
      isExistMinValue(value, a.slice(0, index)),
      isExistMinValue(value, a.slice(index + 1, a.length)),
    ].some((x) => !x)
  ).length;
};

const isExistMinValue = (value, array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] < value) {
      return true;
    }
  }
  return false;
};

test('solution', () => {
  expect(solution([-16, 27, 65, -2, 58, -92, -71, -68, -61, -33])).toBe(6);
  expect(solution([9, -1, 5])).toBe(3);
});

test('자신보다 작은 값이 있는지 찾는다', () => {
  expect(isExistMinValue(-16, [27, 65, -2, 58, -92, -71, -68, -61, -33])).toBe(
    true
  );
  expect(isExistMinValue(27, [-16])).toBe(true);
  expect(isExistMinValue(27, [65, -2, 58, -92, -71, -68, -61, -33])).toBe(true);
  expect(isExistMinValue(65, [-16, 27])).toBe(true);
  expect(isExistMinValue(65, [-2, 58, -92, -71, -68, -61, -33])).toBe(true);
  expect(isExistMinValue(-92, [-16, 27, 65, -2, 58])).toBe(false);
  expect(isExistMinValue(-92, [-71, -68, -61, -33])).toBe(false);
});
