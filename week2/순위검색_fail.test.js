const solution = (info, query) => {
  const tree = {};
  splitString(info).forEach((i) => makeTree(i, tree));
  return splitString(query).map((q) => getScore(q, tree).length);
};

const splitString = (info) => info.map((s) => s.split(' '));

const makeTree = (array, obj) => {
  (function go(target, index) {
    if (index === array.length - 2) {
      target[array[index]] = [
        ...(target[array[index]] || []),
        Number(array[index + 1]),
      ];
      return;
    }
    target[array[index]] = { ...(target[array[index]] || {}) };
    return go(target[array[index]], index + 1);
  })(obj, 0);

  return obj;
};

const getScore = (array, obj) => {
  const result = [];
  const elements = array.filter((v) => v !== 'and');
  (function go(target, index) {
    if (index === 4) {
      result.push(...target.filter((v) => elements[index] <= v));
      return;
    }
    if (elements[index] === '-') {
      for (const key in target) {
        go(target[key], index + 1);
      }
      return;
    }
    go(target[elements[index]] || [], index + 1);
  })(obj, 0);

  return result;
};

test('solution', () => {
  expect(
    solution(
      [
        'java backend junior pizza 150',
        'python frontend senior chicken 210',
        'python frontend senior chicken 150',
        'cpp backend senior pizza 260',
        'java backend junior chicken 80',
        'python backend senior chicken 50',
      ],
      [
        'java and backend and junior and pizza 100',
        'python and frontend and senior and chicken 200',
        'cpp and - and senior and pizza 250',
        '- and backend and senior and - 150',
        '- and - and - and chicken 100',
        '- and - and - and - 150',
      ]
    )
  ).toEqual([1, 1, 1, 1, 2, 4]);
});

test('info 배열에 있는 문자열을 함수의 인자 기준으로 나누어 하나의 배열로 만든다', () => {
  expect(
    splitString([
      'java backend junior pizza 150',
      'python frontend senior chicken 210',
      'python frontend senior chicken 150',
      'cpp backend senior pizza 260',
      'java backend junior chicken 80',
      'python backend senior chicken 50',
    ])
  ).toEqual([
    ['java', 'backend', 'junior', 'pizza', '150'],
    ['python', 'frontend', 'senior', 'chicken', '210'],
    ['python', 'frontend', 'senior', 'chicken', '150'],
    ['cpp', 'backend', 'senior', 'pizza', '260'],
    ['java', 'backend', 'junior', 'chicken', '80'],
    ['python', 'backend', 'senior', 'chicken', '50'],
  ]);
  expect(
    splitString([
      'java and backend and junior and pizza 100',
      'python and frontend and senior and chicken 200',
      'cpp and - and senior and pizza 250',
      '- and backend and senior and - 150',
      '- and - and - and chicken 100',
      '- and - and - and - 150',
    ])
  ).toEqual([
    ['java', 'and', 'backend', 'and', 'junior', 'and', 'pizza', '100'],
    ['python', 'and', 'frontend', 'and', 'senior', 'and', 'chicken', '200'],
    ['cpp', 'and', '-', 'and', 'senior', 'and', 'pizza', '250'],
    ['-', 'and', 'backend', 'and', 'senior', 'and', '-', '150'],
    ['-', 'and', '-', 'and', '-', 'and', 'chicken', '100'],
    ['-', 'and', '-', 'and', '-', 'and', '-', '150'],
  ]);
});

describe('javascript의 객체로 makeTree 구조를 만듭니다.', () => {
  const object = {};
  const arrays = [
    ['java', 'backend', 'junior', 'pizza', '150'],
    ['python', 'frontend', 'senior', 'chicken', '210'],
    ['python', 'frontend', 'senior', 'chicken', '150'],
    ['cpp', 'backend', 'senior', 'pizza', '260'],
    ['java', 'backend', 'junior', 'chicken', '80'],
    ['python', 'backend', 'senior', 'chicken', '50'],
  ];

  it('모든 원소에 대한 순회를 하면 최종적으로 객체 트리 구조가 나옵니다.', () => {
    arrays.forEach((array) => makeTree(array, object));
    expect(object).toEqual({
      java: {
        backend: {
          junior: {
            pizza: [150],
            chicken: [80],
          },
        },
      },
      python: {
        frontend: {
          senior: {
            chicken: [210, 150],
          },
        },
        backend: {
          senior: {
            chicken: [50],
          },
        },
      },
      cpp: {
        backend: {
          senior: {
            pizza: [260],
          },
        },
      },
    });
  });
});

describe('tree에서 원하는 답을 찾습니다.', () => {
  it('전체 원소가 있는 경우', () => {
    const object = {
      java: {
        backend: {
          junior: {
            pizza: [150],
            chicken: [80],
          },
        },
      },
      python: {
        frontend: {
          senior: {
            chicken: [210, 150],
          },
        },
        backend: {
          senior: {
            chicken: [50],
          },
        },
      },
      cpp: {
        backend: {
          senior: {
            pizza: [260],
          },
        },
      },
    };

    expect(
      getScore(
        ['java', 'and', 'backend', 'and', 'junior', 'and', 'pizza', '100'],
        object
      )
    ).toEqual([150]);
    expect(
      getScore(
        ['python', 'and', 'frontend', 'and', 'senior', 'and', 'chicken', '200'],
        object
      )
    ).toEqual([210]);
    expect(
      getScore(
        ['cpp', 'and', '-', 'and', 'senior', 'and', 'pizza', '250'],
        object
      )
    ).toEqual([260]);
    expect(
      getScore(
        ['-', 'and', 'backend', 'and', 'senior', 'and', '-', '150'],
        object
      )
    ).toEqual([260]);
    expect(
      getScore(['-', 'and', '-', 'and', '-', 'and', 'chicken', '100'], object)
    ).toEqual([210, 150]);
    expect(
      getScore(['-', 'and', '-', 'and', '-', 'and', '-', '150'], object)
    ).toEqual([150, 210, 150, 260]);
  });
});
