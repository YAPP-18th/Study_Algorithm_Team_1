// 가장 긴 펠린드롬
// https://programmers.co.kr/learn/courses/30/lessons/12904

function isPalindrome(s, start, end) {
  let mid = Math.floor((end - start + 1) / 2) - 1;

  for (let i = 0; i <= mid; i++) {
    if (s[start + i] !== s[end - i]) {
      return false;
    }
  }

  return true;
}

function solution(s) {
  for (let answer = s.length; answer > 1; answer--) {
    let start = 0;
    let end = answer - 1;

    while (end < s.length) {
      if (isPalindrome(s, start, end)) {
        return answer;
      }

      start++;
      end++;
    }
  }

  return 1;
}


/*

## How
처음에 접근했을 때는 0부터 문자열 길이 - 1까지의 조합을 2중 for 문으로 만들어서 i, j 인덱스만큼 슬라이스 한 문자열과 `reverse()` 메서드로 더 잡은 문자열을 비교해서 같으면 해당 문자열의 길이를 캐싱하도록 했다.

문제는 이런 경우 정확성은 통과하지만 효율성에서 통과하지 못하게 된다. 불필요한 순회를 줄이는 식으로 최적화하다가 결국 다른 사람의 풀이를 찾아보았다.

DP를 사용하는 방법도 있었는데 기발하다고 생각하긴 했지만 정확성에서도 시간 초과가 났다.

그러던 중 찾았던 풀이는 이와 같다.

// length: 6
abcdcba

// length: 5
abcdcb
 bcdcba

 // length: 4
abcdc
 bcdcb
  cdcba

// length: 3
...

이와 같이 순회하도록 반복문을 구성하고 중앙값을 기준으로 시작 + i, 끝 - i에 해당하는 index를 비교한다. 만약 하나라도 틀리면 멈추고 다음 것을 비교한다. 만약 모든 문자열이 일치하는 경우 현재 문자열의 길이를 반환한다.

이게 가능한 이유는 문자열의 길이를 기반으로 순회하기 때문이다. 즉, 반복할수록 문자열의 길이가 작아지는 구조이기 때문에 그 범위의 문자열이 팰린드롬이라면 가장 큰 팰린 드럼은 해당 index가 된다.

## Retrospective


*/