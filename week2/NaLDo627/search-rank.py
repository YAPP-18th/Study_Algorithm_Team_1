# 이진 분할 알고리즘이 구현된 파이썬 표준 라이브러리, lower bound 사용 위해 임포트
import bisect


def init_db():
    db = {}
    language_list = ["cpp", "java", "python", "-"]
    position_list = ["backend", "frontend", "-"]
    career_list = ["junior", "senior", "-"]
    food_list = ["chicken", "pizza", "-"]
    for l in language_list:
        for p in position_list:
            for c in career_list:
                for f in food_list:
                    db[l + p + c + f] = []
    return db


def build_db(info):
    db = init_db()
    for i in info:
        language, position, career, food, score = i.split(" ")

        # for문으로 만들 수도 있겠지만, 이런식으로 써두는 편이 이해가 더 수월할 것 같았다 ^^;
        db[language + position + career + food].append(int(score))
        db["-" + position + career + food].append(int(score))
        db[language + "-" + career + food].append(int(score))
        db[language + position + "-" + food].append(int(score))
        db[language + position + career + "-"].append(int(score))

        db["-" + "-" + career + food].append(int(score))
        db["-" + position + "-" + food].append(int(score))
        db["-" + position + career + "-"].append(int(score))
        db[language + "-" + "-" + food].append(int(score))
        db[language + "-" + career + "-"].append(int(score))
        db[language + position + "-" + "-"].append(int(score))

        db[language + "-" + "-" + "-"].append(int(score))
        db["-" + position + "-" + "-"].append(int(score))
        db["-" + "-" + career + "-"].append(int(score))
        db["-" + "-" + "-" + food].append(int(score))

        db["-" + "-" + "-" + "-"].append(int(score))

    # lower_bound 사용 위해 미리 정렬해둔다.
    for key in db.keys():
        db[key].sort()

    return db


# lower bound 함수를 직접 구현 (처음해보는거라 이렇게 만드는게 맞나 싶다)
def lower_bound(db_list, score):
    if len(db_list) == 0:
        return 0

    start, end = 0, len(db_list) - 1
    while start <= end:
        mid = (start + end) // 2
        # 찾은 경우 중간점 인덱스 반환
        if db_list[mid] >= score and (mid == 0 or mid > 0 and db_list[mid-1] <= score):
            while mid > 0 and db_list[mid-1] >= score:
                mid -= 1

            return len(db_list) - mid

        elif db_list[mid] > score:
            end = mid - 1
        else:
            start = mid + 1

    if end < 0:
        return len(db_list)
    return 0
print(lower_bound([9, 11, 11, 11, 100, 100, 200, 300], 100))

# bisect 모듈 사용
def bisect_lower_bound(db_list, score):
    return len(db_list) - bisect.bisect_left(db_list, int(score), lo=0, hi=len(db_list))


def select(db, single_query):
    single_query = single_query.replace("and ", "")
    language, position, career, food, score = single_query.split(" ")
    single_query = ''.join([language, position, career, food])
    # return lower_bound(db[single_query], int(score)) # 직접 구현으로도 테스트 통과됨을 확인
    return bisect_lower_bound(db[single_query], int(score))


def solution(info, query):
    answer = []
    db = build_db(info)
    for single_query in query:
        answer.append(select(db, single_query))
    return answer


print(solution(
    ["java backend junior pizza 150", "python frontend senior chicken 210", "python frontend senior chicken 150",
     "cpp backend senior pizza 260", "java backend junior chicken 80", "python backend senior chicken 50"],
    ["java and backend and junior and pizza 100", "python and frontend and senior and chicken 200",
     "cpp and - and senior and pizza 250", "- and backend and senior and - 150", "- and - and - and chicken 100",
     "- and - and - and - 150"]))

# 아마 이 문제를 푸는 모두가 그랬을 거라고 생각하지만, 시간 초과 이슈를 해결해야 할 문제다.
# 처음 풀었을때는 각각의 경우의 수에 모두 딕셔너리(자바로 치면 해시테이블) 자료형을 사용하여 각각의 경우의 수 점수를 저장한
# 데이터베이스를 구축해두고, 쿼리가 들어올때마다 모두 순회하여 결과를 구하는 식이었다.
# 딕셔너리 자료형 특성상 저장과 탐색에서는 큰 시간이 소요되지 않았지만, 문제는 X점 이상을 구할 때 그 경우의 수를 모두 순회해야 하는데,
# 여기서 시간초과가 났었다.
#
# *해결
# 풀이를 좀 참고한 결과 db 저장에서는 각각의 축약어를 사용해서 각각 경우의 수를 저장하는 것으로 db 구조를 개선하였고,
# X점 이상을 구할 때는 lower_bound 라는 것을 활용하면 되었다. (이때 lower_bound 라는 개념을 처음 알았다.)
# lower_bound란 정렬된 데이터에서 이분 탐색 법으로 특정 숫자 이상의 지점을 찾아내는 알고리즘이다.
# 직접 구현해봤는데 잘 안돼서, 좀 더 찾아보니 bisect 라는 파이썬 표준 라이브러리가 있었다.
# bisect 는 이분 분할 알고리즘이 적용된 라이브러리로, lower bound를 구할때 적합하다.
# 이를 사용해서 X점 이상 구할때 사용하니 잘 해결되었다.
# (나중에 직접 구현한 함수로도 통과함을 확인했다)
# 이 문제를 통해 lower bound 의 개념과 구현법, 그리고 유용한 파이썬 라이브러리까지 알게되어 좋았다!
