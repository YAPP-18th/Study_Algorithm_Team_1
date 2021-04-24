const solution = (clothes) => {
  const eachClothesCount = clothes.reduce(
    (acc, cur) => ({ ...acc, [cur[1]]: acc[cur[1]] ? acc[cur[1]] + 1 : 1 }),
    {}
  );

  return Object.values(eachClothesCount).reduce((acc, cur) => (acc *= cur + 1), 1) - 1;
};

test('solution', () => {
  expect(
    solution([
      ['yellow_hat', 'headgear'],
      ['blue_sunglasses', 'eyewear'],
      ['green_turban', 'headgear'],
    ])
  ).toEqual(5);
  expect(
    solution([
      ['crow_mask', 'face'],
      ['blue_sunglasses', 'face'],
      ['smoky_makeup', 'face'],
    ])
  ).toEqual(3);
});
