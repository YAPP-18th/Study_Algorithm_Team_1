const solution = (enroll, referral, seller, amount) => {
  const answer = [];

  const ref = {};
  const earnFromRef = {};

  enroll.forEach((each, index) => {
    ref[each] = referral[index];
    earnFromRef[each] = 0;
  });

  seller.forEach((each, index) => {
    let money = amount[index] * 100;
    let remain = (money / 10) | 0;

    earnFromRef[each] = earnFromRef[each] + money - remain;
    money = remain;

    let flag = true;
    while (flag) {
      const refPerson = ref[each];

      if (refPerson === '-') {
        flag = false;
      }
      remain = (money / 10) | 0;

      earnFromRef[refPerson] = earnFromRef[refPerson] + money - remain;

      each = refPerson;
      money = remain;
    }
  });

  enroll.forEach((each) => {
    answer.push(earnFromRef[each]);
  });

  return answer;
};

test('solution', () => {
  expect(
    solution(
      ['john', 'mary', 'edward', 'sam', 'emily', 'jaimie', 'tod', 'young'],
      ['-', '-', 'mary', 'edward', 'mary', 'mary', 'jaimie', 'edward'],
      ['young', 'john', 'tod', 'emily', 'mary'],
      [12, 4, 2, 5, 10]
    )
  ).toEqual([360, 958, 108, 0, 450, 18, 180, 1080]);
  expect(
    solution(
      ['john', 'mary', 'edward', 'sam', 'emily', 'jaimie', 'tod', 'young'],
      ['-', '-', 'mary', 'edward', 'mary', 'mary', 'jaimie', 'edward'],
      ['sam', 'emily', 'jaimie', 'edward'],
      [2, 3, 5, 4]
    )
  ).toEqual([0, 110, 378, 180, 270, 450, 0, 0]);
});
