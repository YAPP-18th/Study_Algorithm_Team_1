function binarySearch(scores, score) {
  const len = scores.length;

  let start = 0;
  let end = len;

  while (start < end) {
    const mid = Math.floor((start + end) / 2);
    if (scores[mid] >= score) {
      end = mid;
    } else {
      start = mid + 1;
    }
  }

  return len - start;
}

function solution(info, query) {
  const answer = [];

  const dictionary = {};

  const languages = ['cpp', 'java', 'python', '-'];
  const jobs = ['backend', 'frontend', '-'];
  const careers = ['junior', 'senior', '-'];
  const foods = ['chicken', 'pizza', '-'];

  for (const language of languages) {
    for (const job of jobs) {
      for (const career of careers) {
        for (const food of foods) {
          dictionary[language + job + career + food] = [];
        }
      }
    }
  }

  for (const eachInfo of info) {
    const [language, job, career, food, score] = eachInfo.split(' ');

    [language, '-'].forEach((ll) => {
      [job, '-'].forEach((jj) => {
        [career, '-'].forEach((cc) => {
          [food, '-'].forEach((ff) => {
            dictionary[ll + jj + cc + ff].push(parseInt(score));
          });
        });
      });
    });
  }

  for (const key in dictionary) {
    dictionary[key] = dictionary[key].sort((a, b) => a - b);
  }

  for (const eachQuery of query) {
    const [language, job, carrer, food, score] = eachQuery
      .split('and')
      .map((each) => each.trim().split(' '))
      .flat();

    const idx = binarySearch(
      dictionary[language + job + carrer + food],
      parseInt(score)
    );

    answer.push(idx);
  }

  return answer;
}

/*

## How
메뉴 리뉴얼 문제와 같이 조합을 구하고 그것을 쿼리 화한 것을 key로 하는 객체를 만들어 해당 key에 해당하는 점수 배열을 추가한 뒤 해당 객체에 각 query로 접근하여 기준 점수보다 높은 값을 출력하도록 하면 정확성을 통과할 수 있다.

하지만 효율성을 통과할 수 없는데 그 이유는 쿼리로 객체를 조회한 array에서 기준 이상의 값을 구하는 과정의 시간 복잡도가 O(NM)이 되기 때문이다. 모든 쿼리가 `-`로 정해지지 않았을 때 결국 모든 점수를 순회해서 찾아야 하는데 주어지는 info와 query의 개수를 고려하면 터질 수밖에 없는 구조이다.

따라서 이분 탐색을 이용해 O(NlogM)으로 시간 복잡도를 줄여야 효율성을 통과할 수 있다. 이분 탐색은 정렬된 데이터를 기준으로 한다. 함수를 따로 만들어 처리했는데 탐색을 완료하면 return 할 때 전체 길이에서 탐색 완료한 값을 빼줌으로써 기준 이상의 점수 개수를 반환하도록 했다.

## Retrospective

*/
