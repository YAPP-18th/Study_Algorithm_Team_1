def get_min_movement(target): # 위로 움직이는 것과 아래로 움직이는 것 중 최소 값을 구한다.
    return min(abs(target - ord('A')), abs(target - (ord('A') + 26)))


# 오른쪽으로 움직이는 것과 왼쪽으로 움직이는 것 중 최소값을 구하고, 동시에 그 인덱스 값을 구한다.
def get_min_offset_and_index(name, idx, checked):
    right = 0
    right_idx = -99
    for i in list(range(idx+1, len(name))) + list(range(idx)): # 현재 인덱스부터 정순으로 순회
        right += 1
        if name[i] != 'A' and checked[i] == 0:
            right_idx = i
            break
    else:
        right = -1

    left = 0
    left_idx = -99
    for i in list(range(idx-1, -1, -1)) + list(range(len(name)-1, idx, -1)): # 현재 인덱스부터 역순으로 순회
        left += 1
        if name[i] != 'A' and checked[i] == 0:
            left_idx = i
            break
    else:
        left = -1

    minimum = min(right, left)
    minimum_idx = right_idx if minimum == right else left_idx
    return minimum, minimum_idx

def solution(name):
    answer = 0
    idx = 0
    # 확인용 임시 배열
    checked = [0] * len(name)

    while 0 in checked:
        # 위로 가는 경우 vs 아래로 가는 경우
        checked[idx] = 1
        answer += get_min_movement(ord(name[idx]))

        # 오른쪽으로 가는 경우 vs 왼쪽으로 가는 경우
        value, new_idx = get_min_offset_and_index(name, idx, checked)
        if value < 0:
            break

        answer += value
        idx = new_idx

    return answer

print(solution("JEROEN")) # 56
print(solution("JAN")) # 23

# 풀이
# 반복 : 현재 위치에서 알파벳을 A로 만들 수 있는 최소값 (위, 아래 중) + 현재 위치에서 다른 'A' 가 아닌 곳을 탐색하는 최소값 (왼쪽, 오른쪽 중)
# 위의 반복 구문을 모든 좌표를 검색할 때까지 반복한다.
#
# 위 아래 오른쪽 왼쪽 이라는 방향 자체는 사실 중요하지 않다고 생각. 중요한 것은 최소값이다!
# 그래서 상하의 최소값과 좌우의 최소값을 각각 더하고, 위치를 이동시켜 반복시켜줬다.
# 가독성 부분은 개선이 필요해 보임. (ex. 리스트 순회하는 부분)
