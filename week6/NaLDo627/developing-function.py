def solution(progresses, speeds):
    answer = []
    checked = 0
    while checked < len(progresses):
        for i in range(len(progresses)):
            progresses[i] += speeds[i]

        if progresses[checked] >= 100:
            count = 0
            while checked < len(progresses) and progresses[checked] >= 100:
                count += 1
                checked += 1
            answer.append(count)
    return answer

# 검사할 인덱스의 번호를 두고, 100을 넘길때마다 100넘기는 갯수를 answer에 추가한다.
