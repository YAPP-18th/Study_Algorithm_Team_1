function solution(cacheSize, cities) {
  if (cities.length === 0) {
    return 0;
  }

  if (cacheSize === 0) {
    return cities.length * 5;
  }

  const HIT = 1;
  const MISS = 5;

  const cache = [];
  let answer = 0;


  for (let i = 0; i < cities.length; i++) {
    const city = cities[i].toUpperCase();

    const index = cache.indexOf(city);

    if (index !== -1) {
      answer += HIT;

      const cachedData = cache[index];

      for (let j = index; j > 0; j--) {
        cache[j] = cache[j - 1];
      }

      cache[0] = cachedData;
      continue;
    }

    answer += MISS;

    if (cacheSize !== 0) {
      cache.unshift(city);

      if (cache.length > cacheSize) {
        cache.pop();
      }
    }
  }

  return answer;
}

test('Test case', () => {
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
  ).toEqual(50);
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
  ).toEqual(21);
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
  ).toEqual(60);
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
  ).toEqual(52);
  expect(solution(2, ['Jeju', 'Pangyo', 'NewYork', 'newyork'])).toEqual(16);
  expect(solution(0, ['Jeju', 'Pangyo', 'Seoul', 'NewYork', 'LA'])).toEqual(25);
});
