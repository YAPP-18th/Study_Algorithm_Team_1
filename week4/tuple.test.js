const solution = (s) => {
  return changeBracket(s).reduce((acc, it) => deleteDuplicate(acc, it), []);
};

const changeBracket = (s) => {
  return JSON.parse(s.replace(/\{/g, '[').replace(/\}/g, ']')).sort(
    (a, b) => a.length - b.length
  );
};

const deleteDuplicate = (source, target) => {
  return source.concat(target.filter((it) => !source.includes(it)));
};

test('solution', () => {
  expect(solution('{{4,2,3},{3},{2,3,4,1},{2,3}}')).toEqual([3, 2, 4, 1]);
  expect(solution('{{1,2,3},{2,1},{1,2,4,3},{2}}')).toEqual([2, 1, 3, 4]);
  expect(solution('{{20,111},{111}}')).toEqual([111, 20]);
  expect(solution('{{123}}')).toEqual([123]);
  expect(solution('{{4,2,3},{3},{2,3,4,1},{2,3}}')).toEqual([3, 2, 4, 1]);
});

test('{ -> [, } -> ] 로 바꾸고 원소 개수에 따라 정렬합니다.', () => {
  expect(changeBracket('{{4,2,3},{3},{2,3,4,1},{2,3}}')).toEqual([
    [3],
    [2, 3],
    [4, 2, 3],
    [2, 3, 4, 1],
  ]);
});

test('배열의 원소들을 순서대로 넣으며 중복을 제거합니다.', () => {
  expect(deleteDuplicate([], [3])).toEqual([3]);
  expect(deleteDuplicate([3], [2, 3])).toEqual([3, 2]);
  expect(deleteDuplicate([3, 2], [4, 2, 3])).toEqual([3, 2, 4]);
  expect(deleteDuplicate([3, 2, 4], [2, 3, 4, 1])).toEqual([3, 2, 4, 1]);
});
