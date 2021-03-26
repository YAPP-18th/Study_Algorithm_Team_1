const compareChain = (before, current) => {
  if (current === undefined) {
    return true;
  }

  return before[before.length - 1] === current[0];
};

const getFail = (arr) => {
  let beforeWord = arr[0][0];
  let currentWord = '';

  const hash = { [arr[0][0]]: true };

  for (let j = 0; j < arr[0].length; j++) {
    for (let i = 0; i < arr.length; i++) {
      if (i === 0 && j === 0) {
        continue;
      }

      currentWord = arr[i][j];

      if (i !== 0) {
        beforeWord = arr[i - 1][j];
      }

      if (!compareChain(beforeWord, currentWord) || hash[currentWord]) {
        return [i + 1, j + 1];
      }

      hash[currentWord] = true;

      if (i === arr.length - 1) {
        beforeWord = arr[i][j];
      }
    }
  }

  return [0, 0];
};

const seperateWord = (n, words) => {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push([]);
  }

  words.forEach((each, index) => {
    arr[index % arr.length].push(each);
  });

  return arr;
};

const solution = (n, words) => {
  return getFail(seperateWord(n, words));
};

test('Test compareChain', () => {
  expect(compareChain('tank', 'kind')).toEqual(true);
  expect(compareChain('tank', 'ex')).toEqual(false);
});

test('Test getFail', () => {
  expect(
    getFail(
      seperateWord(3, [
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
    )
  ).toEqual([3, 3]);
});

test('Test getFail', () => {
  expect(
    getFail([
      ['tank', 'wheel', 'mother'],
      ['kick', 'land', 'robot'],
      ['know', 'dream', 'tank'],
    ])
  ).toEqual([3, 3]);
});

test('Test seperateWord', () => {
  expect(
    seperateWord(3, [
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
  ).toEqual([
    ['tank', 'wheel', 'mother'],
    ['kick', 'land', 'robot'],
    ['know', 'dream', 'tank'],
  ]);
});

test('Test case', () => {
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
