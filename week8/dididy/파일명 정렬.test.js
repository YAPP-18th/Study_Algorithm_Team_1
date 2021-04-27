const seperateEachString = (arr) => {
  return arr.reduce((acc, cur) => {
    const processedName = cur.match(/\d+/);
    const { index: numberIndex } = processedName;

    const tailIndex = numberIndex + processedName[0].length;

    const head = cur.slice(0, numberIndex);
    const number = cur.slice(numberIndex, tailIndex);
    const tail = cur.slice(tailIndex);

    return [...acc, { head, number, tail }];
  }, []);
};

const sortByNumber = (arr) => {
  return arr.sort((a, b) => {
    const aHead = a.head.toLowerCase();
    const bHead = b.head.toLowerCase();

    const aNum = a.number | 0;
    const bNum = b.number | 0;

    if (aHead === bHead) {
      if (aNum > bNum) {
        return 1;
      }
      if (aNum < bNum) {
        return -1;
      }
      return aNum - bNum;
    }
    if (aHead > bHead) {
      return 1;
    }
    return -1;
  });
};

const solution = (files) => {
  return sortByNumber(seperateEachString(files)).reduce(
    (acc, cur) => [...acc, cur.head + cur.number + cur.tail],
    []
  );
};

test('문자열을 기준에 맞춰 객체 형태로 나눈다', () => {
  expect(
    seperateEachString([
      'img12.png',
      'img10.png',
      'img02.png',
      'img1.png',
      'IMG01.GIF',
      'img2.JPG',
    ])
  ).toEqual([
    { head: 'img', number: '12', tail: '.png' },
    { head: 'img', number: '10', tail: '.png' },
    { head: 'img', number: '02', tail: '.png' },
    { head: 'img', number: '1', tail: '.png' },
    { head: 'IMG', number: '01', tail: '.GIF' },
    { head: 'img', number: '2', tail: '.JPG' },
  ]);
});

test('number key를 기준으로 정렬한다', () => {
  expect(
    sortByNumber([
      { head: 'img', number: '12', tail: '.png' },
      { head: 'img', number: '10', tail: '.png' },
      { head: 'img', number: '02', tail: '.png' },
      { head: 'img', number: '1', tail: '.png' },
      { head: 'IMG', number: '01', tail: '.GIF' },
      { head: 'img', number: '2', tail: '.JPG' },
    ])
  ).toEqual([
    { head: 'img', number: '1', tail: '.png' },
    { head: 'IMG', number: '01', tail: '.GIF' },
    { head: 'img', number: '02', tail: '.png' },
    { head: 'img', number: '2', tail: '.JPG' },
    { head: 'img', number: '10', tail: '.png' },
    { head: 'img', number: '12', tail: '.png' },
  ]);
});

test('solution', () => {
  expect(
    solution([
      'img12.png',
      'img10.png',
      'img02.png',
      'img1.png',
      'IMG01.GIF',
      'img2.JPG',
    ])
  ).toEqual([
    'img1.png',
    'IMG01.GIF',
    'img02.png',
    'img2.JPG',
    'img10.png',
    'img12.png',
  ]);
  expect(
    solution([
      'F-5 Freedom Fighter',
      'B-50 Superfortress',
      'A-10 Thunderbolt II',
      'F-14 Tomcat',
    ])
  ).toEqual([
    'A-10 Thunderbolt II',
    'B-50 Superfortress',
    'F-5 Freedom Fighter',
    'F-14 Tomcat',
  ]);
});
