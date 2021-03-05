from itertools import combinations
from collections import Counter

def solution(orders, course):
    answer = []

    for c in course:
        candidates = []

        for order in orders:
            # combinations = order 라는 문자열 안에서 c 개로 이루어진 조합을 추출해서 리스트 형식으로 만든다.
            for cand in combinations(order, c):
                candidates.append(''.join(sorted(cand)))

        # Counter 의 most_common 메서드로 조합이 많이 나온 순서대로 나열한다.
        answer_candidates = Counter(candidates).most_common()

        # (메뉴종류, 개수) 순대로 정렬되어 있는 것 중, 개수가 2개 이상이고 최대 개수와 동일한 것만 추출하여 답안지에 넣는다.
        answer.extend([menu for menu, cnt in answer_candidates if cnt > 1 and cnt == answer_candidates[0][1]])

    answer.sort()
    return answer

print(solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2,3,4]))

# 최초 풀이 -> 무식하게 품 -> 시간초과
# orders 에 등장하는 메뉴들을 하나의 set으로 만들고, set에서 조합을 추출하여 orders 순회하면서 카운팅을 하면 되지 않을 까 싶었다.
# 로직상으로는 맞는거 같은데, 20문제 중 3문제가 시간 초과가 떴다(..)
#
# 보완된 풀이 -> 주문 목록 중에서 combination 추출해서 경우의 수 줄임 -> Counter로 횟수 체크
# 기존에는 모든 상품에서 조합을 추출했다면, 개선된 풀이에서는 주문 목록 순회하면서 그때그때마다 조합을 추출한다. 이렇게 할 경우, 가짓수가 더 적어진다.
# Counter -> list 혹은 문자열에서 반복되는 개수를 세어주고, 많이 반복된 수대로 정렬해주는 파이썬 내장 클래스이다.
# https://www.daleseo.com/python-collections-counter/