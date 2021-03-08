const solution = (name) => {
  // name 문자열을 배열로 바꿉니다.
  const array = name.split('');
  // 거리와 현재 위치를 지정할 값입니다.
  let dist = 0;
  let index = 0;

  while (1) {
    // distance는 해당 단어가 A까지 가려면 얼마나 조이스틱을 움직여야 하는지 반환합니다.
    dist += distance(array[index]);
    // 해당 단어를 A로 바꿉니다.
    array[index] = 'A';
    // 다음 위치에 대한 정보가 담겨있습니다. 왼쪽과 오른쪽 중 A가 아닌 알파벳이 먼저 나오는
    // 방향으로 진행하여 그 위치에 대한 정보와 거리값이 담겨있습니다.
    const nextObj = next(array, index);

    // 만약 배열의 모든 값이 A라면 반복문을 끝냅니다.
    if (array.join('') === 'A'.repeat(name.length)) {
      break;
    }
    // 거리와 다음 위치의 index로 갱신해줍니다.
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
