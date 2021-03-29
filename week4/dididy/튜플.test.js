const removeBracket = (string) => {
  const regexNum = /[{}]/g;
  return string.replace(regexNum, '');
};

const solution = (s) => {
  const getMap = removeBracket(s)
    .split(',')
    .reduce((acc, cur) => acc.set(cur, acc.get(cur) + 1 || 1), new Map());

  return Array.from(getMap)
    .sort((a, b) => b[1] - a[1])
    .map((each) => each[0] | 0);
};

test('Test removeBracket function', () => {
  expect(removeBracket('{{2},{2,1},{2,1,3},{2,1,3,4}}')).toEqual(
    '2,2,1,2,1,3,2,1,3,4'
  );
});

test('Test case', () => {
  expect(solution('{{2},{2,1},{2,1,3},{2,1,3,4}}')).toEqual([2, 1, 3, 4]);
  expect(solution('{{1,2,3},{2,1},{1,2,4,3},{2}}')).toEqual([2, 1, 3, 4]);
  expect(solution('{{20,111},{111}}')).toEqual([111, 20]);
  expect(solution('{{123}}')).toEqual([123]);
  expect(solution('{{4,2,3},{3},{2,3,4,1},{2,3}}')).toEqual([3, 2, 4, 1]);
});
