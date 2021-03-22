const solution = (expression) => {
  const operators = combination(getOperator(expression));
  const array = toArray(expression);
  return Math.max(...operators.map((oper) => calculate(oper, [...array])));
};

const getOperator = (expression) => [
  ...new Set(expression.replace(/[0-9]/g, '').split('')),
];

const combination = (operators) => {
  const result = [];
  const check = Array(operators.length).fill(false);
  const go = (target, index) => {
    if (index === operators.length) {
      result.push(target);
      return;
    }
    for (let i = 0; i < operators.length; i++) {
      if (check[i]) continue;
      target.push(operators[i]);
      check[i] = true;
      go([...target], index + 1);
      check[i] = false;
      target.pop();
    }
  };

  go([], 0);
  return result;
};

const toArray = (expression) => {
  // 참고: https://stackoverflow.com/questions/30279778/javascript-regex-spaces-between-characters
  return expression
    .replace(/(\*|\-|\+)(?!$)/g, ' $1 ')
    .split(' ')
    .map((x) => (/\+|\-|\*/.test(x) ? x : x | 0));
};

const calculate = (operators, expression) => {
  const cal = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
  };

  for (let i = 0; i < operators.length; i++) {
    const oper = operators[i];
    // 해당 연산자가 포함되어 있으면 반복
    while (expression.includes(oper)) {
      // 연산자가 처음으로 나오는 위치를 찾음.
      const index = expression.findIndex((it) => it === oper);
      const number = cal[oper](expression[index - 1], expression[index + 1]);
      expression.splice(index - 1, 3, number);
    }
  }
  return expression[0] < 0 ? -expression[0] : expression[0];
};

test('solution', () => {
  expect(solution('100-200*300-500+20')).toBe(60420);
});

test('연산자를 뽑아낸다.', () => {
  expect(getOperator('100-200*300-500+20')).toEqual(['-', '*', '+']);
});

test('뽑아낸 연산자로 우선순위에 따른 조합을 구한다', () => {
  expect(combination(['-', '*', '+'])).toEqual([
    ['-', '*', '+'],
    ['-', '+', '*'],
    ['*', '-', '+'],
    ['*', '+', '-'],
    ['+', '-', '*'],
    ['+', '*', '-'],
  ]);
});

test('수식을 배열의 원소로 뽑아낸다', () => {
  expect(toArray('100-200*300-500+20')).toEqual([
    100,
    '-',
    200,
    '*',
    300,
    '-',
    500,
    '+',
    20,
  ]);
});

test('뽑아낸 숫자를 연산자 우선순위 배열에 따라 연산한 결과를 구한다', () => {
  expect(
    calculate(['*', '+', '-'], [100, '-', 200, '*', 300, '-', 500, '+', 20])
  ).toBe(60420);
  expect(
    calculate(['-', '*', '+'], [100, '-', 200, '*', 300, '-', 500, '+', 20])
  ).toBe(20020);
  expect(
    calculate(['-', '+', '*'], [100, '-', 200, '*', 300, '-', 500, '+', 20])
  ).toBe(18000);
  expect(
    calculate(['*', '-', '+'], [100, '-', 200, '*', 300, '-', 500, '+', 20])
  ).toBe(60380);
});
