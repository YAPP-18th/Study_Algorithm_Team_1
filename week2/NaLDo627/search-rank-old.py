# 문제 초안 문제점 :
# - db 구축 부분 가독성이 떨어짐
# - X점 이상을 구할 때 시간 초과 이슈

def init_db():
    db = {}
    language_list = ["cpp", "java", "python"]
    position_list = ["backend", "frontend"]
    career_list = ["junior", "senior"]
    food_list = ["chicken", "pizza"]
    for l in language_list:
        db[l] = {}
        for p in position_list:
            db[l][p] = {}
            for c in career_list:
                db[l][p][c] = {}
                for f in food_list:
                    db[l][p][c][f] = []
    return db


def build_db(info):
    db = init_db()
    for i in info:
        language, position, career, food, score = i.split(" ")
        db[language][position][career][food].append(int(score))
    return db

def select(db, single_query):
    single_query = single_query.replace("and ", "")
    language, position, career, food, score = single_query.split(" ")
    answer = 0

    language_list = []
    if language == '-':
        language_list = list(db.keys())
    else:
        language_list.append(language)

    for l in language_list:
        position_list = []
        if position == '-':
            position_list = list(db[l].keys())
        else:
            position_list.append(position)

        for p in position_list:
            career_list = []
            if career == '-':
                career_list = list(db[l][p].keys())
            else:
                career_list.append(career)

            for c in career_list:
                food_list = []
                if food == '-':
                    food_list = list(db[l][p][c].keys())
                else:
                    food_list.append(food)

                for f in food_list:
                    score_list = db[l][p][c][f]
                    for s in score_list: # X점 이상 구하기 -> 시간초과!
                        if s >= int(score):
                            answer += 1
    return answer


def solution(info, query):
    answer = []
    db = build_db(info)
    for single_query in query:
        answer.append(select(db, single_query))
    return answer

print(solution(["java backend junior pizza 150","python frontend senior chicken 210","python frontend senior chicken 150","cpp backend senior pizza 260","java backend junior chicken 80","python backend senior chicken 50"],
               ["java and backend and junior and pizza 100","python and frontend and senior and chicken 200","cpp and - and senior and pizza 250","- and backend and senior and - 150","- and - and - and chicken 100","- and - and - and - 150"]))

# 사실 이 코드에서 lower bound 만 적용되어도 통과하긴 한다. (테스트 해봄)
