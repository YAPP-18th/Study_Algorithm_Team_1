# 데이터 처리를 쉽게 하기 위해 시간을 초단위 정수형으로 변경한다.
def to_timestamp(time_format):
    hour, second = time_format.split(":")
    return int(hour) * 60 + int(second)


# 출력용 - 시간 형식으로 변환한다.
def to_timeformat(timestamp):
    hour = timestamp // 60
    second = timestamp % 60
    return "%02d:%02d" % (hour, second)


def solution(n, t, m, timetable):
    # 기존의 승객 시간표를 초단위로 변경한다.
    timestamp_table = []
    for time in timetable:
        timestamp_table.append(to_timestamp(time))
    timestamp_table.sort()

    # 셔틀이 오는 시간을 리스트로 만든다.
    shuttle_table = []
    shuttle_time = 9 * 60
    for i in range(n):
        shuttle_table.append(shuttle_time)
        shuttle_time += t

    # 셔틀마다 타는 승객들을 딕셔너리 내 리스트 형태로 저장한다.
    shuttle_passengers = {}
    s_index = 0
    for timestamp in timestamp_table:
        # 현재 승객이 탈 수 있는 셔틀의 시간대로 맞춘다.
        while s_index < len(shuttle_table) and \
                timestamp > shuttle_table[s_index]:
            s_index += 1

        # 셔틀에 타지 못하는 승객은 생각하지 않기로 한다.
        if s_index >= len(shuttle_table):
            break

        shuttle_time = shuttle_table[s_index]
        current_passengers = shuttle_passengers.get(str(shuttle_time), [])

        # 만약 현재 시간의 셔틀에 승객이 가득 차면 다음 셔틀에 태운다.
        if len(current_passengers) == m:
            s_index += 1
            if s_index >= len(shuttle_table):
                break

            shuttle_time = shuttle_table[s_index]
            current_passengers = shuttle_passengers.get(str(shuttle_time), [])
        current_passengers.append(timestamp)
        shuttle_passengers[str(shuttle_time)] = current_passengers

    # 맨 마지막에 오는 셔틀을 기준으로 생각한다.
    shuttle_time = shuttle_table[-1]
    current_passengers = shuttle_passengers.get(str(shuttle_time), [])

    # 만약 셔틀에 자리가 여유롭다면 셔틀 출발시간까지 오면 된다.
    if len(current_passengers) < m:
        answer = to_timeformat(shuttle_time)
    # 만약 셔틀에 자리가 없다면 승객 중 가장 늦게 오는 사람보다 1분 일찍 오면 된다.
    else:
        passenger = current_passengers[-1]
        answer = to_timeformat(passenger - 1)

    return answer

print(solution(1,1,5,["08:00", "08:01", "08:02", "08:03"]))
print(solution(2,10,2,["09:10", "09:09", "08:00"]))
print(solution(2,1,2,["09:00", "09:00", "09:00", "09:00"]))
print(solution(1,1,5,["00:01", "00:01", "00:01", "00:01", "00:01"]))
print(solution(1,1,1,["23:59"]))
print(solution(10,60,45,["23:59","23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59", "23:59"]))

# 알고리즘 실력보다는, 상당한 구현력을 요구하는 문제인 듯 하다.
# 셔틀버스 시간표를 만들고, 그 시간표에 탑승하는 승객들의 시간을 딕셔너리에 리스트 형태로 저장한다.
# 가장 늦게 탑승하면 되니까, 셔틀버스 시간표 중 가장 늦은 시간을 기준으로 잡는다.
# 그 셔틀에 만약 자리가 있을 경우 - 셔틀 시간에 맞춰 타면 된다.
# 그 셔틀에 만약 자리가 없을 경우 - 승객 중 가장 늦게타는 사람보다 1분 빨리 타면 된다.
# 여기까지 생각해내기가 좀 어려웠다.. 단순하게 생각하면 되는 문제였다.
# 다만 자료형(셔틀버스 시간표)을 미리 만들어두는 편이 훨씬 수월하게 풀렸다.
