const solution = (n, words) => {
  // 사용했던 단어인지 확인하기 위한 객체.
  const used = {};
  // 첫 단어를 객체에 넣어 놓고 시작.
  used[words[0]] = 1;

  for (let i = 1; i < words.length; i++) {
    // 이전 단어와 현재 단어.
    const [previous, current] = [words[i - 1], words[i]];
    // 현재 단어가 객체에 존재하면 +1, 아니면 value가 0인 값으로 설정.
    used[current] = (used[current] || 0) + 1;

    // 만약 이전 단어의 마지막 글자와 현재 단어의 첫 글자가 다르거나,
    // 사용했던 단어라면 해당 key 값의 value는 1을 넘어서므로 그때의 답을 return.
    if (previous.slice(-1) !== current[0] || used[current] > 1) {
      // (i % n) + 1 은 현재 player, (i / n) + 1은 현재 차례.
      // javascript에서 나누기는 소수점을 포함하기 떄문에 parseInt를 한다.
      return [(i % n) + 1, parseInt(i / n) + 1];
    }
  }
  // 끝말잇기가 모두 잘 되면 [0, 0] 반환.
  return [0, 0];
};

test('solution', () => {
  expect(
    solution(3, [
      'tank',
      'kick',
      'know',
      'wheel',
      'land',
      'dream',
      'mother',
      'robot',
      'tank',
    ])
  ).toEqual([3, 3]);
  expect(
    solution(5, [
      'hello',
      'observe',
      'effect',
      'take',
      'either',
      'recognize',
      'encourage',
      'ensure',
      'establish',
      'hang',
      'gather',
      'refer',
      'reference',
      'estimate',
      'executive',
    ])
  ).toEqual([0, 0]);
  expect(
    solution(2, ['hello', 'one', 'even', 'never', 'now', 'world', 'draw'])
  ).toEqual([1, 3]);
});
