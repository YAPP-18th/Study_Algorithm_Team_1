def solution(s):
    answer = []
    set_list = []

    split_list = s.split(",{")
    for i in range(len(split_list)):
        split_list[i] = split_list[i].replace("{","")
        split_list[i] = split_list[i].replace("}","")
        set_list.append(set(split_list[i].split(",")))

    # 집합의 원수 수 대로 정렬한다.
    set_list.sort(key=lambda x: len(x))

    # 임시 집합에 값을 쌓아 나가면서 튜플을 완성해나간다.
    temp_set = set()
    for values in set_list:
        value = (values - temp_set).pop()
        answer.append(int(value))
        temp_set.add(value)

    return answer

# 집합문제여서 집합만을 활용해서 푸는 문제인가 싶었는데,
# 마땅한 방법이 떠오르지 않아서 고민하다가,
# 그냥 원소 수 대로 정렬 후 차집합을 삽입함으로서 풀었다.
# 예를 들어, "{{2},{2,1},{2,1,3},{2,1,3,4}}" 이렇게 정렬 되어 있으면,
# 1 - 하나짜리 집합의 원소인 2를 튜플에 삽입
# 2 - 두 개가 들어있는 집합에서 이미 삽입된 {2}를 제외한 나머지값 삽입
# 3 - 세 개가 들어있는 집합에서 이미 삽입된 {2, 1}를 제외한 나머지값 삽입
# ...계속