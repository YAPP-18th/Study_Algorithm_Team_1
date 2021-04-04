const solution = (number, n) => {
  // 입력받은 string type의 number를 배열로 만들고, 원소를 Number type으로 바꿉니다.
  const numbers = number.split('').map((x) => x | 0);
  const answer = [];

  // start는 배열의 시작 인덱스를 저장합니다.
  let start = 0;
  // end는 마지막 인덱스를 저장합니다.
  for (let end = n; end < numbers.length; end++) {
    // max는 start 부터 end + 1 까지의 배열 원소 중 최대값을 저장합니다.
    let max = 0;
    for (let i = start; i <= end; i++) {
      if (max < numbers[i]) {
        max = numbers[i];
        start = i + 1;
        // numbers의 값을 순회하다가 9가 나오면 9 이상의 값은 없으므로 종료합니다.
        if (max === 9) break;
      }
    }
    // 그 값을 answer 배열에 넣습니다.
    answer.push(max);
  }

  return answer.join('');
};

test('solution', () => {
  expect(solution('1231234', 3)).toBe('3234');
  expect(solution('1924', 2)).toBe('94');
  expect(solution('4177252841', 4)).toBe('775841');
});
