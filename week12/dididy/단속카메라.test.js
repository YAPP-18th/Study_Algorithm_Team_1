const solution = (routes) => {
  const routesCopy = routes.slice();
  let answer = 0;
  let camera = -30001;

  routesCopy
    .sort((a, b) => {
      return a[1] - b[1];
    })
    .forEach((each) => {
      if (camera < each[0]) {
        answer++;
        camera = each[1];
      }
    });

  return answer;
};

test('solution', () => {
  expect(
    solution([
      [-20, 15],
      [-14, -5],
      [-18, -13],
      [-5, -3],
    ])
  ).toEqual(2);
});
