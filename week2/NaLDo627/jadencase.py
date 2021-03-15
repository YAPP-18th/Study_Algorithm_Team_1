def solution(s):
    answer = ''
    for idx, string in enumerate(s.split(' ')):
        if idx != 0:
            answer += ' '

        # 파이썬은 capitalize라는 함수를 기본 제공한다. 이 함수는 첫글자를 대문자로, 나머지를 소문자로 만든다.
        answer += string.capitalize()

        # 만약 capitalize 함수가 찝찝하면 아래처럼 구현할 수도 있겠다.
        # answer += string[0].upper() + string[1:].lower()

    return answer

print(solution("3people unFollowed me"))
print(solution("for the last week"))