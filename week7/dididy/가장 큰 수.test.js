const solution = (numbers) => {
  return (
    BigInt(
      numbers
        .sort((a, b) => {
          a += '';
          b += '';

          return b + a - (a + b);
        })
        .join('')
    ) + ''
  );
};

test('solution', () => {
	expect(solution([6, 10, 2])).toEqual("6210");
	expect(solution([3, 30, 34, 5, 9])).toEqual("9534330");
});
