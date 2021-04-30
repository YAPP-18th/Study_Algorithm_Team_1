from collections import defaultdict

def solution(tickets):
    dest_dict = defaultdict(list)

    # 딕셔너리 자료구조 생성
    for source, dest in tickets:
        dest_dict[source].append(dest)

    # 문자열 먼저 나오는 것으로 정렬
    for source in dest_dict:
        dest_dict[source].sort()

    stack = ["ICN"]
    path = []
    while stack:
        source = stack[-1]  # peek

        # 만약 시작지에 포함이 안되어 있거나, 갈수 있는 곳이 없다면 그것이 경로의 마지막이다.
        if source not in dest_dict or len(dest_dict[source]) == 0:
            path.append(stack.pop())
        else:
            # (이미 정렬되어 있기 때문에) 목적지가 빠른 순으로 스택에 push
            stack.append(dest_dict[source].pop(0))

    answer = path[::-1]     # reverse
    return answer

# dfs 문제지만 구현이 생각보다 만만치 않았다. 결국 풀이 참고...
# 목적지에 도달하지 않는 경우는 없으며, 이를 잘 이용하는 문제였다.
# 모든 경로를 dfs로 찾아가 보는데, 이때 모든 경로를 사전에 정렬해둔다. (알파벳 상 가장 빠른 경로를 리턴해야 하기 때문)
# dfs로 탐색하다가 더 이상 갈 곳이 없다면, 그곳이 지금까지의 경로에서 마지막 경로라는 말이므로 리스트에 저장해둔다.
# 마지막에는 저장해둔 리스트를 역순으로 변환하면 출력하면 이것이 모든 티켓을 사용한 경로이다.

