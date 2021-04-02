def solution(n, costs):
    answer = 0
    container = [i for i in range(n)]
    costs.sort(key=lambda x: x[2]) # 비용값 기준으로 정렬한다.

    for cost in costs:
        parent, child, value = cost
        if container[parent] == container[child]: # 만약 부모가 같다면 싸이클을 형성함으로 건너뛴다.
            continue

        old_parent = container[child]
        for i in range(n):
            if container[i] == old_parent: # 예전 부모로 되어있는 노드를 모두 현재 노드로 변경한다.
                container[i] = container[parent]
        answer += value

    return answer

# 처음엔 bfs인가 싶었는데, 자세히 보니 최소신장트리 문제였다.
# 최소신장트리 알고리즘 역시 기억이 안나서 참고해서 풀었다..
# 먼저 비용 기준으로 costs 배열을 정렬 후, container 배열을 만들어 각 섬별로 부모 노드를 관리한다.
# 만약 연결을 시도할 때 부모노드가 같다면, 싸이클을 형성함으로 그 경우는 건너뛴다.
