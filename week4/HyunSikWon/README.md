# 4주차

## 튜플
순서가 뒤죽박죽일 수 있어서,가장 작은 원소부터 탐색하는 방법으로 진행했습니다.
 -> 크기가 1인 배열에서 첫번째 값을, 2인 배열에서 두번째 값을...
 
## 영어 끝말잇기
단순 구현 문제라 설명은 생략하겠습니다.


## 셔틀버스
1. 먼저 운행하는 모든 셔틀 도착시간을 구한뒤,
2. 셔틀 수용인원과 크루 도착시간에 따라 해당 셔틀을 탄 크루들의 도착시간을 배열에 기록했습니다.
 2-1. 기다리는 크루가 없으면 빈 배열.
3. 주인공 콘은 막차에 턱걸이로 타면 되기 때문에 막차를 기준으로
 3-1. 막차에 자리가 있으면, 막차가 도착한 시간에만 가면된다.
 3-2. 막차에 자리가 없으면, 막차에 탄 사람들 중 가장 늦게 도착한 사람보다 1분 일찍오면 된다.
 
 전체 버스 운영 기록의 예시, 2번 테스트 케이스 기준:
 버스 도착시간은 각각 9:00, 9:10
 전체 기록: [["08:00"], ["09:09", "09:10"]]
 
 현재 코드는 반례에대한 처리를 했지만, 처리하지 않아도 정답처리가 되었습니다.
 반례 테스트 케이스, 10, 60, 45, ["9:00"] -> 답: 18:00
 
