from queue import PriorityQueue

INF = float('inf')
road = []
cache = []

def dijkstra(src, dst):
    global road, cache
    if cache[src][dst] != -1:
        return cache[src][dst]

    pq = PriorityQueue() # put, get (d, i) -> d는 거리, i는 인덱스번호
    dist = [INF for _ in range(len(road))]
    dist[src] = 0
    pq.put((0, src))

    while not pq.empty():
        d, i = pq.get()

        if dist[i] < d:
            continue

        for ds in road[i]:
            nx, ncost = ds[0], ds[1]
            ncost += d
            if ncost >= dist[nx]:
                continue

            pq.put((ncost, nx))
            dist[nx] = ncost

    cache[src][dst] = dist[dst]
    cache[dst][src] = dist[dst]
    return dist[dst]

def solution(n, s, a, b, fares):
    answer = INF
    global road, cache
    road = [[] for _ in range(n)]
    cache = [[-1] * n for _ in range(n)]
    for f in fares:
        p1, p2, value = f
        road[p1-1].append([p2-1, value])
        road[p2-1].append([p1-1, value])

    for i in range(n):
        answer = min(answer, dijkstra(s-1, i) + dijkstra(i, a-1) + dijkstra(i, b-1))

    return answer

print(solution(6,4,6,2,[[4, 1, 10], [3, 5, 24], [5, 6, 2], [3, 1, 41], [5, 1, 24], [4, 6, 50], [2, 4, 66], [2, 3, 22], [1, 6, 25]]))

# 처음 문제를 접했을 떄는 사실 감이 잘 안와서 무식하게 풀었다.
# 갈 수 있는 모든 경우의 수를 추출하고, 각각의 경로에 대해 공통과 따로를 나눠서 계산했다.
# 아니나 다를까 시간초과가 났다. (구현은 또 드럽게 복잡하다)
#
# 사실 최단거리 찾기 문제했으면 다익스트라 알고리즘을 떠올릴 법도 한데, 여기서 어떻게 적용을 해야 할지 잘 떠올리지 못했다.
# (사실 알고리즘 자체도 까먹었다. 이래서 기본을 평소에 잘 다져야..)
# 너무 어렵게 생각할 것 없이, n개의 지점 중 중간 지점을 하나 선택해서(i), 출발지에서 거기까지 거리 + a 도착지 + b 도착지의 최소값을 구하면
# 될 일이었다.
# (0 <= i < n 일때, 출발지~i + i~a + i~b 의 최소값)
#
# 문제 자체가 어려워 보이지만, 사실 기본을 잘 응용하면 풀 수 있는 문제다. 기본 알고리즘을 복습해야겠다..
#
# 번외) 그래프를 이차원 배열로 표현했었는데, 그러니까 시간 초과가 났다. 그래서 인접한 좌표를 담은 리스트로 다시 표현해서 풀었더니 됬다.
# 기본적으로 사용되는 자료형은 크기가 n^2 이하여야 통과를 하나보다.. (아 이건 좀)
