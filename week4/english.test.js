const solution = (n, words) => {
  const answers = new Set([words[0]]);
  for (let i = 1; i < words.length; i++) {
    const player = (i % n) + 1;
    const turn = parseInt(i / n) + 1;
    if (answers.has(words[i]) || !isPossible(words[i - 1], words[i])) {
      return [player, turn];
    }
    answers.add(words[i - 1]);
  }
  return [0, 0];
};

const isPossible = (first, second) => {
  if (second === undefined) {
    return true;
  }
  return first.slice(-1) === second[0];
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

test('두 단어가 끝말잇기 구조인가?', () => {
  expect(isPossible('tank', 'kick')).toBe(true);
  expect(isPossible('kick', 'know')).toBe(true);
  expect(isPossible('know', 'tank')).toBe(false);
});

// n	words	result
// 3	["tank", "kick", "know", "wheel", "land", "dream", "mother", "robot", "tank"]	[3,3]
// 5	["hello", "observe", "effect", "take", "either", "recognize", "encourage", "ensure", "establish", "hang", "gather", "refer", "reference", "estimate", "executive"]	[0,0]
// 2	["hello", "one", "even", "never", "now", "world", "draw"]	[1,3]
