const solution = (s) => Math.min(...range(s).map((i) => compress(s, i).length));

const range = (s) => [...Array(s.length)].map((_, i) => i + 1);

const chunk = (s, n) =>
  s.length <= n ? [s] : [s.slice(0, n), ...chunk(s.slice(n), n)];

const make = ([result, before, count]) =>
  `${result}${count > 1 ? count : ''}${before}`;

const process = ([result, before, count], current) =>
  before === current
    ? [result, current, count + 1]
    : [make([result, before, count]), current, 1];

const compress = (s, n) => make(chunk(s, n).reduce(process, ['', '', 0]));

test('solution', () => {
  expect(solution('aabbaccc')).toBe(7);
});

test('문자열을 n개 단위로 끊어서 배열로 만든다.', () => {
  expect(chunk('aabbaccc', 2)).toEqual(['aa', 'bb', 'ac', 'cc']);
  expect(chunk('aabbaccc', 3)).toEqual(['aab', 'bac', 'cc']);
  expect(chunk('aabbaccc', 4)).toEqual(['aabb', 'accc']);
});

test('각 단위로 문자열을 끊었을 때 결과를 저장할 배열을 만든다.', () => {
  expect(range('aabbaccc')).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  expect(range('abcabcdede')).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test('문자열의 최종 압축 결과를 만든다,', () => {
  expect(compress('aabbaccc', 1)).toBe('2a2ba3c');
  expect(compress('ababcdcdababcdcd', 2)).toBe('2ab2cd2ab2cd');
  expect(compress('abcabcdede', 3)).toBe('2abcdede');
});

test('압축이 진행되는 과정에서 만들어지는 중간 결과를 구한다.', () => {
  expect(make(['', '', 0])).toBe('');
  expect(make(['', 'a', 1])).toBe('a');
  expect(make(['', 'a', 2])).toBe('2a');
  expect(make(['2a', 'b', 2])).toBe('2a2b');
  expect(make(['2a', 'b', 2])).toBe('2a2b');
  expect(make(['2a2b', 'a', 1])).toBe('2a2ba');
  expect(make(['2a2b', 'a', 1])).toBe('2a2ba');
  expect(make(['2a2ba', 'c', 3])).toBe('2a2ba3c');
});

describe('압축되는 과정', () => {
  it('문자열 "aabbaccc" 를 1개 단위로 압축할 때', () => {
    expect(process(['', '', 0], 'a')).toEqual(['', 'a', 1]);
    expect(process(['', 'a', 1], 'a')).toEqual(['', 'a', 2]);
    expect(process(['', 'a', 2], 'b')).toEqual(['2a', 'b', 1]);
    expect(process(['2a', 'b', 1], 'b')).toEqual(['2a', 'b', 2]);
    expect(process(['2a', 'b', 2], 'a')).toEqual(['2a2b', 'a', 1]);
    expect(process(['2a2b', 'a', 1], 'c')).toEqual(['2a2ba', 'c', 1]);
    expect(process(['2a2ba', 'c', 1], 'c')).toEqual(['2a2ba', 'c', 2]);
    expect(process(['2a2ba', 'c', 2], 'c')).toEqual(['2a2ba', 'c', 3]);
  });

  it('문자열 "aabbaccc" 를 2개 단위로 압축할 때.', () => {
    expect(process(['', '', 0], 'aa')).toEqual(['', 'aa', 1]);
    expect(process(['', 'aa', 1], 'bb')).toEqual(['aa', 'bb', 1]);
    expect(process(['aa', 'bb', 1], 'ac')).toEqual(['aabb', 'ac', 1]);
    expect(process(['aabb', 'ac', 1], 'cc')).toEqual(['aabbac', 'cc', 1]);
  });
});
