from functools import cmp_to_key

# 혹시 반례 아시는 분은 코멘트 달아주세요.. ㅠㅠ
def compare(x, y):
    if int(x[0]) > int(y[0]):
        return -1
    elif int(x[0]) < int(y[0]):
        return 1
    # 330 3 3330a 3303 : 334 3 3334 3343a
    if len(x) == len(y) and len(x) != 1:
        return compare(x[1:], y[1:])
    elif len(x) < len(y):
        if int(x[0]) > int(y[1]):
            return -1
        elif int(x[0]) < int(y[1]):
            return 1
        return compare(x, y[1:])
    elif len(x) > len(y):
        if int(x[1]) > int(y[0]):
            return -1
        elif int(x[1]) < int(y[0]):
            return 1
        return compare(x[1:], y)

    return 0

def solution(numbers):
    str_nums = list(map(str, numbers))
    str_nums = sorted(str_nums, key=cmp_to_key(compare))
    answer = str(int(''.join(str_nums)))
    return answer