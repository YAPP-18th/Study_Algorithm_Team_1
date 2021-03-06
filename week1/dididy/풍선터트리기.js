function solution(a) {
  let answer = 0;

  const dpLeft = Array(1000001);
  const dpRight = Array(1000001);

  const aLength = a.length;

  dpLeft[0] = a[0];

  for (let i = 1; i < aLength; i++) {
    dpLeft[i] = Math.min(a[i], dpLeft[i - 1]);
  }

  dpRight[aLength - 1] = a[aLength - 1];

  for (let i = aLength - 2; i >= 0; i--) {
    dpRight[i] = Math.min(a[i], dpRight[i + 1]);
  }

  for (let i = 0; i < aLength; i++) {
    if (a[i] <= dpLeft[i] || a[i] <= dpRight[i]) {
      answer++;
    }
  }

  return answer;
}

/*

## How
문제는 규칙에 맞게 풍선을 터트릴 때 마지막까지 남을 수 있는 풍선의 번호를 출력하는 것이다.

조건은 선택된 풍선의 왼쪽 오른쪽 풍선을 터트릴 수 있는데 단 한번만 작은 값을 터트릴 쑤 있고 그 외에는 큰 값을 터트려야 한다.

조건에 부합한 규칙을 생각해보면 이렇다.

1. 기준으로 선택된 풍선의 왼쪽과 오른쪽에 각각 최소의 번호를 가진 풍선을 남긴다.
2. 만약 양 옆의 풍선보다 기준으로 선택된 풍선이 작다면 풍선을 남길 수 없다.

즉 하나라도 기준으로 선택된 풍선보다 커야한다.

DP로 각 index별 왼쪽 오른쪽의 최소값을 각각 메모이제이션 하고 이를 토대로 기준 값이 메모이제이션 된 양 옆의 값 보다 작은 경우가 존재한다면 해당 기준 값은 조건에 부합한다.

## Retrospective

*/
