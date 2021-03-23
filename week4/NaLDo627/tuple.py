def solution(s):
    answer = []
    set_list = []

    split_list = s.split(",{")
    for i in range(len(split_list)):
        split_list[i] = split_list[i].replace("{","")
        split_list[i] = split_list[i].replace("}","")
        set_list.append(set(split_list[i].split(",")))

    set_list.sort(key = lambda x: len(x))

    temp_set = set()
    for values in set_list:
        value = (values - temp_set).pop()
        answer.append(int(value))
        temp_set.add(value)

    return answer

# 집합문제여서 집합만을 활용해서 푸는 문제인가 싶었는데,
# 마땅한 방법이 떠오르지 않아서 고민하다가,
# 그냥 정렬 후 차집합을 삽입함으로서 풀었다.
# 묘하게 허탈한 느낌..