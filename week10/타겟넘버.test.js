const solution = (numbers, target) => {
  let answer = 0;

  const recursive = (index, sum) => {
    if (index === numbers.length) {
      if (sum === target) {
        answer++;
      }
      return;
    }
    recursive(index + 1, sum + numbers[index]);
    recursive(index + 1, sum - numbers[index]);
  };

  recursive(0, 0);
  return answer;
};

test('solution', () => {
  expect(solution([1, 1, 1, 1, 1], 3)).toEqual(5);
});
