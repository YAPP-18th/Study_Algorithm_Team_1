const solution = (orders, courses) => {
  return courses
    .map((course) => {
      return maxValue(
        countOrders(
          sortOrder(orders)
            .map((order) => combination(order, course))
            .flat()
        )
      );
    })
    .flat()
    .sort()
    .filter((it) => it);
};

const sortOrder = (order) => order.map((it) => it.split('').sort().join(''));

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

const countOrders = (orders) => {
  return orders.reduce(
    (acc, order) => ({ ...acc, [order]: (acc[order] || 0) + 1 }),
    {}
  );
};

const maxValue = (orders) => {
  const values = Object.values(orders);
  const keys = Object.keys(orders);
  const max = Math.max(...values);
  if (max < 2) return null;
  return keys.filter((_, i) => values[i] === max);
};

test('solution', () => {
  expect(
    solution(['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'], [2, 3, 4])
  ).toEqual(['AC', 'ACDE', 'BCFG', 'CDE']);
  expect(
    solution(['ABCDE', 'AB', 'CD', 'ADE', 'XYZ', 'XYZ', 'ACD'], [2, 3, 5])
  ).toEqual(['ACD', 'AD', 'ADE', 'CD', 'XYZ']);
  expect(solution(['XYZ', 'XWY', 'WXA'], [2, 3, 4])).toEqual(['WX', 'XY']);
});

test('order의 순서를 먼저 정렬한다', () => {
  expect(sortOrder(['XYZ', 'XWY', 'WXA'])).toEqual(['XYZ', 'WXY', 'AWX']);
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

test('n개의 조합 결과를 카운팅 하기 위해 key-value의 객체로 만든다', () => {
  const orders = ['ABCFG', 'AC', 'CDE', 'ACDE', 'BCFG', 'ACDEH'];
  const result = orders.map((order) => combination(order, 2)).flat();
  expect(countOrders(result)).toEqual({
    AB: 1,
    AC: 4,
    AD: 2,
    AE: 2,
    AF: 1,
    AG: 1,
    AH: 1,
    BC: 2,
    BF: 2,
    BG: 2,
    CD: 3,
    CE: 3,
    CF: 2,
    CG: 2,
    CH: 1,
    DE: 3,
    DH: 1,
    EH: 1,
    FG: 2,
  });
});

test('카운팅 한 값 중 제일 큰 value를 구하고 해당 value와 같은 key값 list를 구한다', () => {
  const orders = {
    AB: 1,
    AC: 4,
    AD: 2,
    AE: 2,
    AF: 1,
    AG: 1,
    AH: 1,
    BC: 2,
    BF: 2,
    BG: 2,
    CD: 3,
    CE: 3,
    CF: 2,
    CG: 2,
    CH: 1,
    DE: 3,
    DH: 1,
    EH: 1,
    FG: 2,
  };

  expect(maxValue(orders)).toEqual(['AC']);
});
