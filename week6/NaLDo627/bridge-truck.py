def solution(bridge_length, weight, truck_weights):
    answer = 0
    current_bridge = []
    total_weight = 0

    while current_bridge or truck_weights:
        for current in current_bridge:
            current[1] += 1

        # 큐이기 때문에 맨 처음만 검사하면 된다.
        if current_bridge and current_bridge[0][1] > bridge_length:
            total_weight -= current_bridge.pop(0)[0]

        if truck_weights and total_weight + truck_weights[0] <= weight:
            current_bridge.append([truck_weights.pop(0), 1])
            total_weight += current_bridge[-1][0]

        answer += 1


    return answer

# 큐를 활용, 허용량까지 현재 다리에 집어 넣고, 각각 시간을 증가시킨다.
# 다리 길이만큼 시간이 흐르면, 현재 다리 큐에서 삭제한다.
