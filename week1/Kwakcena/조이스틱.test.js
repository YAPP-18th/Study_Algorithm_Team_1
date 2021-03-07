const solution = (name) => {
  let direction = 0;
  let answer = name.split('');

  let index = 0;
  let count = 0;
  let n = 20;
  while (n) {
    count += distance(answer[index]);
    answer[index] = 'A';
    if (left(name, index) < right(name, index)) {
      direction = 1;
    } else {
      direction = 0;
    }

    // console.log(answer.join(''), index, count);
    if (direction === 0) {
      index++;
      if (index === name.length) {
        index = 0;
      }
    } else {
      index--;
      if (index < 0) {
        index = answer.length - 1;
      }
    }
    if (answer.join('') === 'A'.repeat(name.length)) {
      break;
    }
    count++;
    n--;
  }

  return count;
};

const distance = (letter) => {
  const ascii = letter.charCodeAt(0);
  return ascii < 78 ? ascii - 65 : 91 - ascii;
};

const left = (name, index) => {
  let count = 0;
  do {
    count++;
    index--;
    if (index < 0) index = name.length - 1;
  } while (name[index] === 'A');

  return {
    count,
    index,
  };
};

const right = (name, index) => {
  let count = 0;
  do {
    count++;
    index++;
    if (index === name.length) index = 0;
  } while (name[index] === 'A');
  return {
    count,
    index,
  };
};

test('solution', () => {
  // expect(solution('JEROEN')).toBe(56);
  // expect(solution('BBBAAAB')).toBe(9);
  // expect(solution('ABABAAAAABA')).toBe(11);
  expect(solution('CANAAAAANAN')).toBe(49);
  // expect(solution('BBBAAAB')).toBe(9);
  // expect(solution('BBBAAAB')).toBe(9);
  // expect(solution('BBBAAAB')).toBe(9);
  // expect(solution('BBBAAAB')).toBe(9);
  // expect(solution('BBBAAAB')).toBe(9);
  // expect(solution('BBBAAAB')).toBe(9);
});

test('현재 알파벳에서 A까지의 거리를 반환한다', () => {
  expect(distance('J')).toBe(9);
  expect(distance('E')).toBe(4);
  expect(distance('R')).toBe(9);
  expect(distance('Q')).toBe(10);
  expect(distance('O')).toBe(12);
  expect(distance('N')).toBe(13);
  expect(distance('B')).toBe(1);
  expect(distance('A')).toBe(0);
});

test('현재 위치에서 왼쪽으로 갈 때 A가 아닌 알파벳이 나오는 거리와 index를 구한다', () => {
  expect(left('BAABAB', 3)).toEqual({
    count: 3,
    index: 0,
  });
  expect(left('ABABAAAAABA', 3)).toEqual({
    count: 2,
    index: 1,
  });
  expect(left('ABABAAAAABA', 1)).toEqual({
    count: 3,
    index: 9,
  });
  expect(left('AAABAAAAABA', 3)).toEqual({
    count: 5,
    index: 9,
  });
  expect(left('AANAAAAANAA', 2)).toEqual({
    count: 5,
    index: 8,
  });
});

test('현재 위치에서 오른쪽으로 갈 때 A가 아닌 알파벳이 나오는 거리와 index를 구한다', () => {
  expect(right('BAABAB', 3)).toEqual({
    count: 2,
    index: 5,
  });
  expect(right('ABABAAAAABA', 3)).toEqual({
    count: 6,
    index: 9,
  });
  expect(right('ABABAAAAABA', 1)).toEqual({
    count: 2,
    index: 3,
  });
  expect(right('AAABAAAAABA', 3)).toEqual({
    count: 6,
    index: 9,
  });
  expect(right('AANAAAAANAA', 8)).toEqual({
    count: 5,
    index: 2,
  });
});
