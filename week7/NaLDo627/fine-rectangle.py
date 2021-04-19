# 최대 공약수를 구해주는 파이썬 내장 함수
from math import gcd

def solution(w,h):
    gcd_value = gcd(w, h)
    # answer = w*h - gcd_value * (w // gcd_value + h // gcd_value - 1)
    answer = w*h - (w + h - gcd_value)
    return answer

# 생각보다 수학적(기학적)인 생각이 들어가야 하는 문제
# 넓이와 길이의 최대공약수를 구하고, 각각 최대 공약수르 나눈다. (최대 공약수를 1로 만듬)
# 그 상황에서 겹치는 사각형의 개수는 넓이 + 최대 - 1 이다.
# 그 다음, 그 개수를 다시 최대 공약수만큼 곱해주면 겹쳐지는 사각형의 개수가 나온다.
# 마지막으로 전체 사각형의 개수에서 그 겹쳐지는 사각형의 개수를 빼면 된다.
# 알고리즘에 수학이 들어가면 생각해내기가 더 어려워지는거 같다...
