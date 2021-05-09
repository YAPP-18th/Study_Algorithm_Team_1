# 직접 정의하는 대신 아래 모듈도 사용가능하다.
# from fractions import gcd


# 유클리드 호제법으로 최대 공약수를 구함
def gcd(a, b):
    while b != 0:
        r = a % b
        a = b
        b = r
    return a


def lcm(a, b):
    return (a * b) / gcd(a, b)


def solution(arr):
    answer = arr[0]
    for i in range(1, len(arr)):
        answer = lcm(answer, arr[i])
    return answer


# 쉬울 줄 알았는데, 의외로 헷갈렸다.
# 최소공배수, 최대공약수의 지식이 생각보다 부족했던 것 같다(..)
# 최대 공약수는 유클리드 호제법으로 구할 수 있고, 최소 공배수는 두 수를 곱한 다음 최대 공약수로 나누는 것으로 구할 수 있다
# 그 다음 하나의 숫자를 기준으로 잡고, 배열마다 최소공배수를 갱신시켜 나가면서 구할 수 있다.
