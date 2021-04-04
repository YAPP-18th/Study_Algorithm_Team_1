from itertools import combinations

def solution(orders, course):
    answer = []
    menuset = set()

    # orders 순회하면서 메뉴 등록
    for order in orders:
        menuset.update(set(order))
    menus = list(menuset)
    menus.sort()

    for c in course:
        answer_candidates = []
        maximum = 2
        for cand in combinations(menus, c):
            count = 0
            cand_set = set(cand)
            for order in orders:
                if cand_set & set(order) == cand_set:
                    count += 1
                    if count == maximum:
                        answer_candidates.append(''.join(cand))
                    elif count > maximum:
                        answer_candidates.clear()
                        answer_candidates.append(''.join(cand))
                        maximum += 1
        answer.extend(answer_candidates)

    answer.sort()
    return answer

print(solution(["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"], [2,3,4]))
