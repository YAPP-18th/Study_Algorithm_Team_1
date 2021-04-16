const convertToSecond = (timeRange) => {
  const [hours, minutes, seconds] = timeRange
    .split(':')
    .map((each) => each | 0);

  return hours * 3600 + minutes * 60 + seconds;
};

const numberPad = (n, width = 2) =>
  n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;

const convertToDate = (second) => {
  const hours = parseInt(second / 3600) + '';
  const minutes = parseInt((second % 3600) / 60) + '';
  const seconds = (second % 60) + '';
  return numberPad(hours) + ':' + numberPad(minutes) + ':' + numberPad(seconds);
};

const solution = (playTime, advTime, logs) => {
  if (playTime === advTime) {
    return '00:00:00';
  }

  const playTimeSec = convertToSecond(playTime);
  const advTimeSec = convertToSecond(advTime);

  const viewer = Array(playTimeSec + 1).fill(0);

  for (let i = 0; i < logs.length; i++) {
    const log = logs[i];
    const [start, end] = log.split('-').map((each) => convertToSecond(each));
    viewer[start]++;
    viewer[end]--;
  }

  for (let i = 1; i < viewer.length; i++) {
    viewer[i] = viewer[i] + viewer[i - 1];
  }

  for (let i = 1; i < viewer.length; i++) {
    viewer[i] = viewer[i] + viewer[i - 1];
  }

  let mostView = 0;
  let maxTime = 0;

  for (let i = advTimeSec - 1; i < playTimeSec; i++) {
    const progress = i - advTimeSec;

    if (progress >= 0) {
      if (mostView < viewer[i] - viewer[progress]) {
        mostView = viewer[i] - viewer[progress];
        maxTime = progress + 1;
      }
      continue;
    }

    if (mostView < viewer[i]) {
      mostView = viewer[i];
      maxTime = progress + 1;
    }
  }

  return convertToDate(maxTime);
};

test('시:분:초 문자열을 초로 변경한다', () => {
  expect(convertToSecond('02:03:55')).toEqual(7435);
  expect(convertToSecond('00:00:00')).toEqual(0);
});

test('숫자가 한자리일 경우 앞에 0을 추가한다', () => {
  expect(numberPad('1')).toEqual('01');
  expect(numberPad('22')).toEqual('22');
  expect(numberPad('0')).toEqual('00');
});

test('초를 시:분:초 문자열로 변경한다', () => {
  expect(convertToDate(359999)).toEqual('99:59:59');
  expect(convertToDate(0)).toEqual('00:00:00');
});

test('solution', () => {
  expect(
    solution('02:03:55', '00:14:15', [
      '01:20:15-01:45:14',
      '00:25:50-00:48:29',
      '00:40:31-01:00:00',
      '01:37:44-02:02:30',
      '01:30:59-01:53:29',
    ])
  ).toEqual('01:30:59');
  expect(
    solution('99:59:59', '25:00:00', [
      '69:59:59-89:59:59',
      '01:00:00-21:00:00',
      '79:59:59-99:59:59',
      '11:00:00-31:00:00',
    ])
  ).toEqual('01:00:00');
  expect(
    solution('50:00:00', '50:00:00', [
      '15:36:51-38:21:49',
      '10:14:18-15:36:51',
      '38:21:49-42:51:45',
    ])
  ).toEqual('00:00:00');
});
