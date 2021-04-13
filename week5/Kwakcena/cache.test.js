/*
queue 자료구조를 이용해서 cache를 구현했습니다.

queue의 맨 앞에 있는 원소는 가장 오래된 원소입니다.
  1. cache에 원하는 도시가 없다면 해당 도시 이름을 cache에 넣습니다.
    1-1. 만약 cache의 크기가 cacheSize를 넘긴다면 cache의 맨 앞에 있는 데이터를 추출합니다.
  2. cache에 원하는 도시가 있다면 해당 도시를 cache에서 제거합니다.
  3. 제거된 도시는 가장 최근에 쓰인 도시가 되므로 cache의 맨 뒤에 다시 넣어줍니다.

이를 통해 time 값에 HIT, MISS 값을 상황에 따라 적절히 더해줌으로써 time의 최종 결과를 반환합니다.
*/

const solution = (cacheSize, cities) => {
  const [HIT, MISS] = [1, 5];
  const cache = [];

  let time = 0;
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i].toLowerCase();
    const index = cache.findIndex((c) => c === city);

    cache.push(city);
    if (index === -1) {
      time += MISS;
      if (cache.length > cacheSize) {
        cache.shift();
      }
    } else {
      time += HIT;
      cache.splice(index, 1);
    }
  }
  return time;
};

test('solution', () => {
  expect(
    solution(3, [
      'Jeju',
      'Pangyo',
      'Seoul',
      'NewYork',
      'LA',
      'Jeju',
      'Pangyo',
      'Seoul',
      'NewYork',
      'LA',
    ])
  ).toBe(50);
  expect(
    solution(3, [
      'Jeju',
      'Pangyo',
      'Seoul',
      'Jeju',
      'Pangyo',
      'Seoul',
      'Jeju',
      'Pangyo',
      'Seoul',
    ])
  ).toBe(21);
  expect(
    solution(2, [
      'Jeju',
      'Pangyo',
      'Seoul',
      'NewYork',
      'LA',
      'SanFrancisco',
      'Seoul',
      'Rome',
      'Paris',
      'Jeju',
      'NewYork',
      'Rome',
    ])
  ).toBe(60);
  expect(
    solution(5, [
      'Jeju',
      'Pangyo',
      'Seoul',
      'NewYork',
      'LA',
      'SanFrancisco',
      'Seoul',
      'Rome',
      'Paris',
      'Jeju',
      'NewYork',
      'Rome',
    ])
  ).toBe(52);
  expect(solution(2, ['Jeju', 'Pangyo', 'NewYork', 'newyork'])).toBe(16);
  expect(solution(0, ['Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA'])).toBe(25);
});
