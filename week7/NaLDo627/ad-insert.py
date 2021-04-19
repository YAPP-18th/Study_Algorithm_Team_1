def to_timestamp(timeformat):
    hour, minute, second = timeformat.split(":")
    return int(hour) * 3600 + int(minute) * 60 + int(second)

def to_timeformat(timestamp):
    hour, minute, second = timestamp // 3600, timestamp % 3600 // 60, timestamp % 60
    return "%02d:%02d:%02d" % (hour, minute, second)

def solution(play_time, adv_time, logs):
    play_timestamp = to_timestamp(play_time)
    adv_timestamp = to_timestamp(adv_time)
    timeline = [0] * 360000
    for log in logs:
        start_time, end_time = log.split("-")
        start_timestamp, end_timestamp = to_timestamp(start_time), to_timestamp(end_time)
        timeline[start_timestamp] += 1
        timeline[end_timestamp] -= 1

    # 현재 시청중인 시청자수 누적
    for i in range(1, play_timestamp):
        timeline[i] = timeline[i] + timeline[i-1]

    # 시청자수 전체 누적
    for i in range(1, play_timestamp):
        timeline[i] = timeline[i] + timeline[i-1]

    maximum = timeline[adv_timestamp-1]
    answer = '00:00:00'
    for i in range(adv_timestamp, play_timestamp+1):
        value = timeline[i] - timeline[i-adv_timestamp]
        if value > maximum:
            maximum = value
            answer = to_timeformat(i - adv_timestamp + 1)
    return answer

# 처음에 봤을때 타임라인을 배열로 만들어서 관리하는것은 생각해 냈지만, 시간초과가 날 거 같아서 아니라고 생각했었는데,
# 위와 같이 누적 형식으로 만들면 쉽게 풀리는 문제였다 (약간 적분의 개념같기도 하다..)
# 시작 시간과 끝 시간에만 1과 -1을 찍어두고 난 뒤, 반복문을 통해 이전값을 더해나가는 형식으로 연산하면 그 구간 현재 시청중인 시청자 수의 누적이
# 나타난다. 거기에 동일한 연산을 한 번 더 하면 현재 시간까지의 누적 시청자 수가 배열에 찍히게 된다.
# 이제 시간 배열을 순회하면서 최대 시청자수를 가지는 시간을 뽑아내면 된다.
# 어렵지는 않지만 생각해 내기는 어려운 알고리즘이었는데, 앞으로 비슷한 문제에서 자주 사용할 수 있을 것 같다.
