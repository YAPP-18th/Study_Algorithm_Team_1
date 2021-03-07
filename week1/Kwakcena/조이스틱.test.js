const solution = (name) => {
  const array = name.split('');
  let dist = 0;
  let index = 0;
  while (1) {
    dist += distance(array[index]);
    array[index] = 'A';
    const nextObj = next(array, index);
    if (array.join('') === 'A'.repeat(name.length)) {
      break;
    }
    dist += nextObj.dist;
    index = nextObj.index;
  }

  return dist;
};

const distance = (letter) => {
  const ascii = letter.charCodeAt(0);
  return ascii < 78 ? ascii - 65 : 91 - ascii;
};

const left = (name, start) => {
  let index = start - 1;
  let dist = 1;
  while (true) {
    if (dist === name.length) {
      index = -1;
      dist = -1;
      break;
    }
    if (index < 0) index = name.length - 1;
    if (name[index] !== 'A') break;
    index--;
    dist++;
  }

  return { index, dist };
};

const right = (name, start) => {
  let index = start + 1;
  let dist = 1;
  while (true) {
    if (dist === name.length) {
      index = -1;
      dist = -1;
      break;
    }
    if (index === name.length) index = 0;
    if (name[index] !== 'A') break;
    index++;
    dist++;
  }

  return { index, dist };
};

const next = (name, start) => {
  const leftObject = left(name, start);
  const rightObject = right(name, start);

  if (leftObject.dist < rightObject.dist) {
    return leftObject;
  }
  return rightObject;
};

test('solution', () => {
  expect(solution('JEROEN')).toBe(56);
  expect(solution('BBBAAAB')).toBe(9);
  expect(solution('ABABAAAAABA')).toBe(11);
  expect(solution('CANAAAAANAN')).toBe(49);
});

test('현재 알파벳에서 A까지의 거리를 반환한다', () => {
  expect(distance('J')).toBe(9);
  expect(distance('N')).toBe(13);
  expect(distance('B')).toBe(1);
  expect(distance('A')).toBe(0);
});

test('현재 index에서 왼쪽 방향으로 진행할 때 A가 아닌 알파벳이 나오는 거리와 index를 구한다.', () => {
  expect(
    left(['C', 'A', 'N', 'A', 'A', 'A', 'A', 'A', 'N', 'A', 'N'], 0)
  ).toEqual({
    dist: 1,
    index: 10,
  });
  expect(
    left(['A', 'A', 'N', 'A', 'A', 'A', 'A', 'A', 'N', 'A', 'N'], 10)
  ).toEqual({
    dist: 2,
    index: 8,
  });
  expect(
    left(['A', 'A', 'N', 'A', 'A', 'A', 'A', 'A', 'N', 'A', 'A'], 8)
  ).toEqual({
    dist: 6,
    index: 2,
  });
  expect(
    left(['A', 'A', 'N', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'], 2)
  ).toEqual({
    dist: -1,
    index: -1,
  });
});

test('현재 index에서 오른쪽 방향으로 진행할 때 A가 아닌 알파벳이 나오는 거리와 index를 구한다.', () => {
  expect(
    right(['C', 'A', 'N', 'A', 'A', 'A', 'A', 'A', 'N', 'A', 'N'], 0)
  ).toEqual({
    dist: 2,
    index: 2,
  });
  expect(
    right(['A', 'A', 'N', 'A', 'A', 'A', 'A', 'A', 'N', 'A', 'N'], 2)
  ).toEqual({
    dist: 6,
    index: 8,
  });
  expect(
    right(['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'N', 'A', 'N'], 8)
  ).toEqual({
    dist: 2,
    index: 10,
  });
  expect(
    left(['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'N'], 10)
  ).toEqual({
    dist: -1,
    index: -1,
  });
});

test('왼쪽과 오른쪽 중 더 나은 방향을 정하여 이동한 거리와 index를 반환한다', () => {
  expect(
    next(['A', 'A', 'N', 'A', 'A', 'A', 'A', 'A', 'N', 'A', 'N'], 0)
  ).toEqual({
    dist: 1,
    index: 10,
  });
  expect(
    next(['A', 'A', 'N', 'A', 'A', 'A', 'A', 'A', 'N', 'A', 'A'], 10)
  ).toEqual({
    dist: 2,
    index: 8,
  });
  expect(
    next(['A', 'A', 'N', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'], 8)
  ).toEqual({
    dist: 5,
    index: 2,
  });
  expect(
    next(['A', 'A', 'N', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'A'], 2)
  ).toEqual({
    dist: -1,
    index: -1,
  });
});
