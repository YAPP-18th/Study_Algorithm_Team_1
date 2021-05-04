const solution = (tickets) => {
  const arr = tickets.slice().sort();
  const visit = new Array(tickets.length).fill(0);

  let answer = 0;

  const dfs = (start, result, index) => {
    result.push(start);

    if (index === arr.length) {
      answer = result;
      return true;
    }

    for (let i = 0; i < arr.length; i++) {
      if (visit[i] === 0 && arr[i][0] === start) {
        visit[i] = 1;

        if (dfs(arr[i][1], result, index + 1)) {
          return true;
        }

        visit[i] = 0;
        result.pop();
      }
    }

    return false;
  };

  dfs('ICN', [], 0);

  return answer;
};

test('solution', () => {
  expect(
    solution([
      ['ICN', 'JFK'],
      ['HND', 'IAD'],
      ['JFK', 'HND'],
    ])
  ).toEqual(['ICN', 'JFK', 'HND', 'IAD']);
  expect(
    solution([
      ['ICN', 'SFO'],
      ['ICN', 'ATL'],
      ['SFO', 'ATL'],
      ['ATL', 'ICN'],
      ['ATL', 'SFO'],
    ])
  ).toEqual(['ICN', 'ATL', 'ICN', 'SFO', 'ATL', 'SFO']);
});
