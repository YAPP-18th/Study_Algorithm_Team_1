def solution(numbers):
    str_nums = list(map(str, numbers))
    str_nums.sort(key=lambda x: x*3, reverse=True)
    answer = str(int(''.join(str_nums)))
    return answer

# 생각보다 단순했던 문제
# 문자열 비교 특성을 이용해서, 같은 인덱스 중 큰 숫자를 앞으로 오게끔 하여 정렬하면 된다.
# (예: 333과 1212 비교 : 333333333 > 121212121212
# 처음 생각했던 풀이는 compare 함수를 직접 작성해서 푸는거였는데, 뭐가 잘못됬는지 오답이 났다.
# 혹시 반례 아시는 분은 코멘트 달아주세요.. ㅠㅠ
