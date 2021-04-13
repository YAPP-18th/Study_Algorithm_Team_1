def solution(n, edge):
    answer = 0
    dist = [0] * n
    dist[0] = 1
    edges = {}

    # 인접 간선들의 리스트를 딕셔너리 형태로 만든다.
    for e in edge:
        source, dest = e
        source -= 1
        dest -= 1

        nodes = edges.get(source, [])
        nodes.append(dest)
        edges[source] = nodes

        nodes = edges.get(dest, [])
        nodes.append(source)
        edges[dest] = nodes

    # 첫 노드 주변 녀석들은 거리가 1이다.
    for node in edges[0]:
        dist[node] = 1

    queue = list(edges[0])
    while queue:
        curr = queue.pop(0)
        nodes = edges[curr]

        for node in nodes:
            if dist[node] != 0:
                continue

            queue.append(node)
            # 주변 노드 = 자기 자신의 거리표 + 1
            dist[node] = dist[curr] + 1

    maximum = 0
    for i in range(1, n):
        if dist[i] > maximum:
            maximum = dist[i]
            answer = 1
        elif dist[i] == maximum:
            answer += 1

    return answer

# dfs 로 접근해봤는데, 잘 안풀려서 풀이를 보니 bfs였다(...)
# (생각해보면 시작점이 정해져 있고 가장 먼 녀석을 찾으면 되니까 bfs가 맞는거 같다)
#
# 거리표를 하나 만들어서, bfs로 탐색하면서 거리를 업데이트 하고, 거기서 답을 구한다.
