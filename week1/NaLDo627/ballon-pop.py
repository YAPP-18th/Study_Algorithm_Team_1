import heapq

def solution(a):
    if len(a) == 1: # 길이가 1일 수도 있기 때문에 그 경우 1을 리턴한다.
        return 1

    # 기본적으로 앞, 뒤는 무조건 남길 수 있다.
    answer = 2

    front_min = a[0]

    # 뒤쪽 최솟값 갱신을 위해 뒤쪽 리스트를 깊은 복사 후 최소 힙으로 만든다.
    rear_min_heap = list(a[2:])
    heapq.heapify(rear_min_heap)
    rear_min = heapq.heappop(rear_min_heap)

    # 이미 지나간 숫자에 다음 최소값이 있을 수 있기 때문에, 추적용으로 집합 자료구조를 하나 만든다.
    heap_ignore_set = set()

    for i in range(1, len(a)-1):
        # 현재 위치가 앞쪽 최소값이나 뒤쪽 최소값 중 하나보다 작으면 된다.
        # 만약 둘 중 하나가 크더라도 1회 찬스(?)를 사용해서 제거할 수 있기 때문
        if a[i] < front_min or a[i] < rear_min:
            answer += 1

        # 앞의 최소값 갱신
        front_min = min(front_min, a[i])

        # 뒤의 최소값 갱신
        heap_ignore_set.add(a[i])

        # 만약 이 다음 숫자가 뒤쪽 최솟값이라면 갱신해줘야 한다.
        if a[i+1] == rear_min and len(rear_min_heap) > 0:
            rear_min = heapq.heappop(rear_min_heap)
            while rear_min in heap_ignore_set and len(rear_min_heap) > 0:
                rear_min = heapq.heappop(rear_min_heap)

    return answer

print(solution([9, -1, -5])) # 3
print(solution([-16,27,65,-2,58,-92,-71,-68,-61,-33])) # 6

# 처음 생각 -> 인접한 것끼리 비교해서 무조건 큰것을 없애고, 필요할 때만 작은 것을 없앨 수 있도록 하면 되지 않을까?
# (필요할 때란 얻고자 하는 숫자가 없어질 위기에 처했을 때를 말하는 것)
# 그러나 예외의 경우가 너무 많은 것 같다.
#  나눠서 생각하기 -> 맨 앞, 맨 뒤는 항상 남길 수 있다, 리스트 중간값의 경우 그 위치 좌, 우 최소값보다 작다면 살아남을 수 있다.
#  사실 풍선 터뜨리는 순서는 크게 상관 없을 수 있는데, 너무 생각을 깊게 했던 것 같다.
#  그런데 이번엔 최솟값 구하는데 이슈다. 매번 min 함수나 heap 을 사용하자니 시간이 너무 많이 든다.
#  그래서 최솟값을 그때그떄마다 업데이트하기로 했다. 앞쪽은 그게 쉬운데, 뒤쪽은 그게 어렵다.
#  그래서 아까 생각한 heap을 응용해서, 최소값 원소가 나오면 heap을 pop 하는 방식으로 풀이했다.
#  .. 뭔가 알고리즘 풀이인데 자료구조를 때려 박아서 푼 느낌...