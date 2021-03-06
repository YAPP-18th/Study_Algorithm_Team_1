function solution(orders, course) {
  const answer = [];
  let dict = {};

  for (let i = 0; i < orders.length; i++) {
    for (let j = 0; j < course.length; j++) {
      const combinationResult = combination(
        orders[i].split('').sort(),
        course[j]
      );

      combinationResult.forEach((each) => {
        let joinEach = each.join('');
        if (dict[joinEach]) {
          dict[joinEach]++;
        } else {
          dict[joinEach] = 1;
        }
      });
    }
  }

  for (let i = 0; i < course.length; i++) {
    let max = 2;
    const getArr = [];

    for (each in dict) {
      if (each.length === course[i]) {
        max = Math.max(dict[each], max);
      }
    }

    for (each in dict) {
      if (each.length === course[i] && dict[each] === max) {
        getArr.push(each);
      }
    }
    answer.push(...getArr);
  }

  return answer.sort();
}

// 해당 조합 코드는 직접 구현하지 않았습니다.
// 출처: https://velog.io/@gytlr01/조합-순열-부분집합-알고리즘-자바스크립트
function combination(arr, num) {
  let result = [];
  if (num == 1) return arr.map((e) => [e]);

  arr.forEach((e, i, array) => {
    let rest = array.slice(i + 1);
    let combinations = combination(rest, num - 1);
    let combiArr = combinations.map((x) => [e, ...x]);
    result.push(...combiArr);
  });
  return result;
}

/*

## How
알고리즘을 이용해 최적화를 하는 문제는 아니었다. 각 주문에 대한 조합을 만들고 해당 조합이 몇 번 나왔는지를 파악해서 2번 이상 주문된 경우 course의 수에 맞는 조합을 출력하면 된다.

그냥 객체를 하나 만들어서 주문된 메뉴들의 course 수에 해당하는 조합을 구해 객체에 key로 넣고 value로 몇 번 반복되는지 파악했다.

그러고는 course의 수에 맞게 가장 많이 주문되고 2번 이상 주문된 메뉴를 배열에 넣어 정렬하여 출력할 수 있도록 하였다.

## Retrospective

*/
