def check_arr(arr, row_start, row_end, col_start, col_end):
    before = -1
    flag = True
    for i in range(row_start, row_end):
        for j in range(col_start, col_end):
            if i == 0 and j == 0:
                before = arr[i][j]
                continue

            if before != arr[i][j]:
                flag = False
                break

        if flag is False:
            break

    if flag is True and before == 0:
        return 0
    elif flag is True and before == 1:
        return 1
    return -1

def div_n_conq(arr):
    ret = [0, 0]
    mid = len(arr) // 2

    # all
    value = check_arr(arr, 0, len(arr), 0, len(arr))
    if value == 0 or value == 1:
        ret[value] = 1
        return ret

    # top-left
    value = check_arr(arr, 0, mid, 0, mid)
    if value == 0 or value == 1:
        ret[value] += 1
    else:
        temp_list = [arr[i][:mid] for i in range(mid)]
        result = div_n_conq(temp_list)
        ret[0] += result[0]
        ret[1] += result[1]

    # top-right
    value = check_arr(arr, 0, mid, mid, len(arr))
    if value == 0 or value == 1:
        ret[value] += 1
    else:
        temp_list = [arr[i][mid:] for i in range(mid)]
        result = div_n_conq(temp_list)
        ret[0] += result[0]
        ret[1] += result[1]

    # bottom-left
    value = check_arr(arr, mid, len(arr), 0, mid)
    if value == 0 or value == 1:
        ret[value] += 1
    else:
        temp_list = [arr[i][:mid] for i in range(mid, len(arr))]
        result = div_n_conq(temp_list)
        ret[0] += result[0]
        ret[1] += result[1]

    # bottom-right
    value = check_arr(arr, mid, len(arr), mid, len(arr))
    if value == 0 or value == 1:
        ret[value] += 1
    else:
        temp_list = [arr[i][mid:] for i in range(mid, len(arr))]
        result = div_n_conq(temp_list)
        ret[0] += result[0]
        ret[1] += result[1]

    return ret

def solution(arr):
    return div_n_conq(arr)

print(solution([[1,1,0,0],[1,0,0,0],[1,0,0,1],[1,1,1,1]]))

# 보자마자 분할정복으로 풀면 되겠다고 떠올랐다.
# 처음 풀었을때 테스트케이스 딱 하나가 실패했었는데, [[0,0], [0,0]] 의 경우를 생각해 줬어야 했다.
# (답이 [1,0]이 되어야 하는데 기존 작성한 로직대로라면 [4,0]이 나와버렸다..)
# 그래서 초반에 모든 배열을 살펴보는 로직을 추가했다.

