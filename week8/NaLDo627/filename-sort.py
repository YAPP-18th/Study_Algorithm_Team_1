# from functools import cmp_to_key
import re

# 동작이 이상함, cmp_to_key 메서드는 뭔가 믿을게 못된다..
# def compare(x, y):
#     if x[0].lower() != y[0].lower():
#         if x[0] > y[0]:
#             return 1
#         return -1

#     return x[1] - y[1]


def solution(files):
    parsed_files = []

    for file in files:
        HEAD = ""
        NUMBER = ""
        is_head = True
        p = re.compile("[^0-9]")
        for char in file:
            if p.match(char):
                if is_head:
                    HEAD += char
                else:
                    NUMBER += char
                continue

            if is_head is False:
                break

            p = re.compile("[0-9]")
            is_head = False
            if p.match(char):
                NUMBER += char

        parsed_files.append([HEAD, int(NUMBER), file])

    answer = list(map(lambda x: x[2], sorted(parsed_files, key=lambda x: (x[0].lower(), x[1]))))
    return answer

# 정렬 함수를 얼마나 잘 활용하는지 묻는 문제인 것 같다.
# 구현 자체는 어렵지 않았으나, cmp_to_key 파이썬 내장 함수가 이상하게 동작하는 것 같다.
# (저번에도 그렇고, cmp_to_key 를 사용하여 구현하였으나 테스트케이스에서 실패함)
# 좀 더 찾아보니, 튜플 형식으로 우선순위를 설정할 수가 있었다.
# 다른 풀이에서는 아예 숫자 기준으로 split 하여 정렬했는데, 코드가 훨씬 더 간결해졌다.
