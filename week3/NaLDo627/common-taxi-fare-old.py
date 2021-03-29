# 무식하게 모든 경로를 찾아서 대조해 보는 방법. 당연히 시간 초과 ^^;;
def search(road, paths, visited, current, current_path, target):
    # dfs 속 bfs
    temp_path = list(current_path)
    temp_path.append(current)
    queue = []
    visited[current] = 1
    for i in range(len(road[current])):
        if road[current][i] == 0 or visited[i] != 0:
            continue

        queue.append(i)

    while queue:
        dest = queue.pop(0)
        if dest == target:
            temp_path.append(dest)
            paths.append(temp_path)
        else:
            search(road, paths, visited, dest, temp_path, target)

    visited[current] = 0


def solution(n, s, a, b, fares):
    answer = 999999999
    road = [[0] * n for _ in range(n)]
    visited = [0] * n
    for f in fares:
        p1, p2, value = f
        road[p1-1][p2-1] = value
        road[p2-1][p1-1] = value
    # print(road)
    a_paths = []
    search(road, a_paths, visited, s-1, [], a-1)

    b_paths = []
    search(road, b_paths, visited, s-1, [], b-1)

    for a_path in a_paths:
        for b_path in b_paths:
            i1 = 1
            i2 = 1
            temp = 0
            while i1 < len(a_path) and i2 < len(b_path) and a_path[i1] == b_path[i2]:
                p1, p2 = a_path[i1-1], a_path[i1]
                temp += road[p1][p2]
                i1 += 1
                i2 += 1

            while i1 < len(a_path):
                p1, p2 = a_path[i1-1], a_path[i1]
                temp += road[p1][p2]
                i1 += 1

            while i2 < len(b_path):
                p1, p2 = b_path[i2-1], b_path[i2]
                temp += road[p1][p2]
                i2 += 1

            answer = min(answer, temp)

    return answer

print(solution(6,4,6,2,[[4, 1, 10], [3, 5, 24], [5, 6, 2], [3, 1, 41], [5, 1, 24], [4, 6, 50], [2, 4, 66], [2, 3, 22], [1, 6, 25]]))