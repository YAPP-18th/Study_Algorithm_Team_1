function solution(s) {
  const answer = [0, 0];
  const regex = /0/g;

  let sCopy = s;

  while (sCopy.length !== 1) {
    answer[0]++;
    answer[1] += (sCopy.match(regex) || []).length;

    sCopy = sCopy.replace(regex, '').length.toString(2);
  }
  return answer;
}

test('solution', () => {
  expect(solution('110010101001')).toEqual([3, 8]);
  expect(solution('01110')).toEqual([3, 3]);
  expect(solution('1111111')).toEqual([4, 1]);
});
