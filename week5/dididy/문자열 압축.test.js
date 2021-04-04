function solution(s) {
  let answer = Infinity;

  for (let i = 1; i <= s.length / 2; i++) {
    let converted = s;
    let compress = '';

    while (converted) {
      let count = 1;
      let prefix = converted.slice(0, i);

      converted = converted.slice(i);

      while (converted.startsWith(prefix)) {
        count++;
        converted = converted.slice(i);
      }

      if (count > 1) {
        compress += count + prefix;
        continue;
      }
      compress += prefix;
    }

    answer = Math.min(answer, compress.length);
  }

  return answer;
}

test('Test case', () => {
  expect(solution('aabbaccc')).toEqual(7);
  expect(solution('ababcdcdababcdcd')).toEqual(9);
  expect(solution('abcabcdede')).toEqual(8);
  expect(solution('abcabcabcabcdededededede')).toEqual(14);
  expect(solution('xababcdcdababcdcd')).toEqual(17);
});
