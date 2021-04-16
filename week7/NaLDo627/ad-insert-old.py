# 계속 나아가면서 하나 더하고 하나 빼는 형식으로도 풀어봤지만, 시간초과가 났다.

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
        for i in range(start_timestamp, end_timestamp):
            timeline[i] += 1

    sum_value = 0
    for i in range(adv_timestamp):
        sum_value += timeline[i]

    maximum = sum_value
    answer = "00:00:00"
    for i in range(adv_timestamp, play_timestamp):
        sum_value += timeline[i]
        sum_value -= timeline[i - adv_timestamp]

        if sum_value > maximum:
            answer = to_timeformat(i - adv_timestamp + 1)
            maximum = sum_value


    return answer