const calcToMin = (time) => {
  return parseInt(time[0] + time[1]) * 60 + parseInt(time[3] + time[4]);
};

const calcToTime = (time) => {
  const hours = parseInt(time / 60)
    .toString()
    .padStart(2, '0');
  const minutes = (time % 60).toString().padStart(2, '0');

  return hours + ':' + minutes;
};

const solution = (n, t, m, timetable) => {
  const timeTable = [];

  for (let i = 0; i < timetable.length; i++) {
    timeTable.push(calcToMin(timetable[i]));
  }

  timeTable.sort((a, b) => a - b);

  let lastTime = calcToMin('09:00');

  for (let i = 1; i <= n; i++) {
    let expectRideCount = timeTable.filter((each) => lastTime >= each).length;

    if (i === n) {
      if (expectRideCount >= m) {
        lastTime = timeTable[m - 1] - 1;
      }

      break;
    }

    lastTime += t;

    if (expectRideCount > m) {
      expectRideCount = m;
    }

    while (expectRideCount) {
      timeTable.shift();
      expectRideCount--;
    }
  }

  return calcToTime(lastTime);
};

test('Test calcToMin function', () => {
  expect(calcToMin('09:00')).toEqual(540);
});

test('Test calcToTime function', () => {
  expect(calcToTime(540)).toEqual('09:00');
});

test('Test case', () => {
  expect(solution(1, 1, 5, ['08:00', '08:01', '08:02', '08:03'])).toEqual(
    '09:00'
  );
  expect(solution(2, 10, 2, ['09:10', '09:09', '08:00'])).toEqual('09:09');
  expect(solution(2, 1, 2, ['09:00', '09:00', '09:00', '09:00'])).toEqual(
    '08:59'
  );
  expect(
    solution(1, 1, 5, ['00:01', '00:01', '00:01', '00:01', '00:01'])
  ).toEqual('00:00');
  expect(solution(1, 1, 1, ['23:59'])).toEqual('09:00');
  expect(
    solution(10, 60, 45, [
      '23:59',
      '23:59',
      '23:59',
      '23:59',
      '23:59',
      '23:59',
      '23:59',
      '23:59',
      '23:59',
      '23:59',
      '23:59',
      '23:59',
      '23:59',
      '23:59',
      '23:59',
      '23:59',
    ])
  ).toEqual('18:00');
});
