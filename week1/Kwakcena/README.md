# 1주차 문제 풀이
## 메뉴 리뉴얼

하나의 `order` 에 대해서 조합을 구한뒤 해당 조합의 개수를 세서 가장 큰 값을 구하면 되는 문제.

1. 먼저 order로 입력되는 배열을 문자열 순서대로 정렬한다. 조합의 결과에서 `AB` 와 `BA` 는 같은 코스 메뉴인데, 이를 다르게 인식할 수 있으므로 처음부터 order의 원소들을 문자열 순서대로 정렬하면 이러한 경우를 방지할 수 있다. 문제의 마지막 테스트 케이스를 참고하자.

2. 정렬된 `order` 값의 원소 하나에 대해서 `course` 하나의 원소 길이에 해당하는 조합을 구한다. 예를 들면 아래와 같다.

```javascript
const order = ['XYZ', 'WXY', 'AWX'];
const course = 2

console.log(combination(order, course));
/*
[
  ['XY', 'XZ', 'YZ'],
  ['WX', 'WY', 'XY'],
  ['AW', 'AX', 'WX']
]
*/
```
3. 2차원 배열 형태로 구해진 값을 javascript의 `flat` 메소드를 이용해서 1차원으로 바꿀 수 있다.
```javascript
console.log(combination(order, course).flat());
// ['XY', 'XZ', 'YZ', 'WX', 'WY', 'XY', 'AW', 'AX', 'WX']
```
4. 이를 key-value 쌍의 객체로 바꿔 하나의 조합에 대한 개수를 counting 한다.
```javascript
const result = combination(order, course).flat();
//['XY', 'XZ', 'YZ', 'WX', 'WY', 'XY', 'AW', 'AX', 'WX']

const obj = countOrders(result)
/*
{
  XY: 2,
  XZ: 1,
  YZ: 1,
  WX: 2,
  WY: 1,
  AW: 1,
  AX: 1, 
}
*/
```
5. 객체에서 가장 큰 value값을 구한 뒤 이 값과 일치하는 다른 key값도 뽑아서 배열로 만든다. 문제에서는 최소 2명 이상의 손님으로부터 주문된 단품 메뉴 조합에 대해서만 포함시키기로 했으므로 이를 조건에 추가한다.

6. 이 과정을 order의 모든 원소에 대해서 반복하여 답을 구한다.