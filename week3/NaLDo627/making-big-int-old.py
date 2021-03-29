# 조합을 이용한 풀이, 수의 순서가 정해져 있는 시점에서 그렇게 유효한 풀이는 아닌 것 같다.

from itertools import combinations

def solution(number, k):
    answer = 0
    c = len(number) - k
    for cand in combinations(range(len(number)), c):
        index_list = list(cand)
        index_list.sort()
        temp = ''
        for index in index_list:
            temp += number[index]

        answer = max(answer, int(temp))
    return str(answer)