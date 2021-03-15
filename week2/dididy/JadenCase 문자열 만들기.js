// JadenCase 문자열 만들기
// https://programmers.co.kr/learn/courses/30/lessons/12951

function solution(s) {
  let answer = '';
  const processString = s.toLowerCase().split(' ');

  answer = processString
    .map((each) => {
      if (each === '') {
        return '';
      }
      return each[0].toUpperCase() + each.slice(1, each.length);
    })
    .join(' ');

  return answer;
}

/*

## How
그냥 주어진 대로 구현하면 되는 문제였다.

먼저 첫 글자만 대문자여야 하므로 모든 문자열을 `toLowerCase()` 메서드를 이용해 소문자화하였다.

그리고 첫 글자만 `toUpperCase()` 메서드로 대문자화하여 slice 한 나머지 문자와 합치는 식으로 처리했다.

에지 케이스로 공백이 연속해서 주어지는 경우가 있었는데 해당 반례를 조건으로 처리해서 해결하였다.

## Retrospective


*/
