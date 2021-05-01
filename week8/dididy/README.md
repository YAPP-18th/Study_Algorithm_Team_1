# 8주차 문제

## 파일명 정렬 - Lv2
파일명을 기준에 맞춰서 정렬하는 문제이다.

HEAD, NUMBER, TAIL로 각 파일명을 나눠서 객체 형태로 저장했다. 나누는 기준은 정규표현식으로 처리했는데 '\d+'로 하나 이상의 숫자를 찾아 숫자가 시작하고 끝나는 index를 찾을 수 있도록 하였다.

변환된 객체 배열을 NUMBER 기준으로 정렬할 수 있도록 하였다. 여기서 HEAD의 대소문자는 구분하지 않으므로 toLowerCase 메서드를 사용해 처리했다.

## 위장 - Lv2
간단한 해시문제였다.

각각의 옷이 몇개있는지를 객체 형태로 만들어서 객체의 모든 value를 순회하며 이전 누적 값(1부터 시작)에 (현재 옷의 갯수 + 1)을 곱한 뒤 나온 결과에서 모든 옷을 입지 않은 경우를 빼주면 원하는 값을 얻을 수 있다.

## 블록 이동하기 - Lv3

