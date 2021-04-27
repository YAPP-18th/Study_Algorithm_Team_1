def solution(clothes):
    answer = 1
    closet = {}
    for cloth in clothes:
        item, typ = cloth
        count = closet.get(typ, 0)
        closet[typ] = count + 1

    for key in closet.keys():
        answer *= closet[key] + 1
    answer -= 1

    return answer

# 처음에는 조합으로 접근해서 풀었으나, 테스트케이스 딱 하나에서 시간초과가 떳다 (...)
# 조합까지 사용할 필요 없이, 간단한 계산식으로 해결되는 문제였다.
# 종류별 옷 개수 + 1 한 값을 종류마다 모두 곱하면 된다. +1 해주는 이유는 착용을 하지 않은 경우이다.
# 모두 곱하면 -1을 한다. 아무것도 착용하는 경우는 없기 때문이다.
# 경우의 수가 아직 좀 헷갈리는데, 익숙해질 필요가 있겠다.
