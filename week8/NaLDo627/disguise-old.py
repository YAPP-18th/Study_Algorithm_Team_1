# 테스트케이스 딱 하나에서 시간초과 난다...
from itertools import combinations

def solution(clothes):
    answer = 0
    dresses = {}
    for cloth in clothes:
        item, part = cloth
        items = dresses.get(part, 0)
        dresses[part] = items + 1

    keys = list(dresses.keys())
    n = len(dresses.keys())
    for k in range(1, n+1):
        candidates = combinations(keys, k)
        for candidate in candidates:
            temp = 1
            for key in candidate:
                temp *= dresses[key]
            answer += temp

    return answer