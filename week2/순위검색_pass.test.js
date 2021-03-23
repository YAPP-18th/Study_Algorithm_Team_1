const solution = (infos, query) => {
  const infoMap = combination(infos);
  const queries = query.map((q) => q.split(' ').filter((v) => v !== 'and'));

  for (const key in infoMap) {
    infoMap[key] = infoMap[key].sort((a, b) => a - b);
  }

  return queries.map((q) => {
    const score = Number(q[4]);
    const key = q.slice(0, 4).join('');
    if (infoMap[key]) {
      return binarySearch(infoMap[key], score);
    }
    return 0;
  }, []);
};

// 출처 : https://bit.ly/3t7E4F6
const binarySearch = (array, score) => {
  let result = 0;
  let start = 0;
  let end = array.length;
  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    if (array[mid] >= score) {
      end = mid;
    } else if (array[mid] < score) {
      start = mid + 1;
    }

    result = array.length - start;
  }
  return result;
};

const combination = (infos) => {
  const result = {};
  function go(target, score, start) {
    const key = target.join('');
    const value = result[key];

    if (value) {
      result[key].push(score);
    } else {
      result[key] = [score];
    }

    for (let i = start; i < target.length; i++) {
      const temp = [...target];
      temp[i] = '-';
      go(temp, score, i + 1);
    }
  }

  for (const info of infos) {
    const array = info.split(' ');
    const score = Number(array.pop());
    go(array, score, 0);
  }

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

test('binarySearch', () => {
  expect(binarySearch([150], 100)).toBe(1);
  expect(binarySearch([50, 50, 80, 150, 150, 210, 260], 100)).toBe(4);
  expect(binarySearch([50, 50, 80, 150, 150, 210, 260], 50)).toBe(7);
  expect(binarySearch([50, 50, 80, 150, 150, 210, 260], 55)).toBe(5);
});
