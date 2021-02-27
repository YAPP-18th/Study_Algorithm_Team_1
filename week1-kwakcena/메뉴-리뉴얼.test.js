const solution = (n) => {
  return 1;
};

const combination = (order, n) => {
  const result = [];
  const go = (target, index) => {
    if (target.length === n) {
      result.push(target.join(''));
      return;
    }

    for (let i = index; i < order.length; i++) {
      target.push(order[i]);
      go([...target], i + 1);
      target.pop();
    }
  };

  go([], 0);
  return result;
};

test('solution', () => {
  expect(solution(1)).toBe(1);
});

test('각 손님별로 나올 수 있는 n개의 조합을 구한다', () => {
  expect(combination('ABCFG', 2)).toEqual([
    'AB',
    'AC',
    'AF',
    'AG',
    'BC',
    'BF',
    'BG',
    'CF',
    'CG',
    'FG',
  ]);
  expect(combination('AC', 2)).toEqual(['AC']);
  expect(combination('CDE', 2)).toEqual(['CD', 'CE', 'DE']);
  expect(combination('ACDE', 2)).toEqual(['AC', 'AD', 'AE', 'CD', 'CE', 'DE']);
  expect(combination('BCFG', 2)).toEqual(['BC', 'BF', 'BG', 'CF', 'CG', 'FG']);
  expect(combination('ACDEH', 2)).toEqual([
    'AC',
    'AD',
    'AE',
    'AH',
    'CD',
    'CE',
    'CH',
    'DE',
    'DH',
    'EH',
  ]);
});
