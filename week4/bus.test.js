const solution = (n, t, m, timetable) => {
  const bus = Array(n)
    .fill(0)
    .map((x, i) => 540 + t * i);
  const crew = timetable
    .map((time) => getMinutes(time))
    .sort((a, b) => a - b)
    .filter((x) => x <= bus[n - 1]);

  let answer = getHHMM(bus[n - 1]);
  for (let i = 0; i < n; i++) {
    const crewOnBus = crew.filter((x) => x <= bus[i]).length;
    if (i === n - 1) {
      if (crewOnBus >= m) {
        answer = getHHMM(crew[m - 1] - 1);
      }
    }
    crew.splice(0, crewOnBus > m ? m : crewOnBus);
  }
  return answer;
};

const getMinutes = (time) => {
  const [hour, minute] = time.split(':').map((x) => x | 0);
  return hour * 60 + minute;
};

const getHHMM = (time) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return (
    (hours < 10 ? '0' + hours : hours + '') +
    ':' +
    (minutes < 10 ? '0' + minutes : minutes + '')
  );
};

test('solution', () => {
  expect(solution(2, 10, 2, ['09:10', '09:09', '08:00'])).toBe('09:09');
  expect(solution(1, 1, 5, ['08:00', '08:01', '08:02', '08:03'])).toBe('09:00');
});

test('HH:MM 형식의 시간을 M 으로 바꾼다.', () => {
  expect(getMinutes('09:00')).toBe(540);
  expect(getMinutes('09:01')).toBe(541);
  expect(getMinutes('10:01')).toBe(601);
  expect(getMinutes('18:00')).toBe(1080);
  expect(getMinutes('23:59')).toBe(1439);
});

test('M 형식을 HH:MM 형식으로 바꾼다.', () => {
  expect(getHHMM(540)).toBe('09:00');
});
