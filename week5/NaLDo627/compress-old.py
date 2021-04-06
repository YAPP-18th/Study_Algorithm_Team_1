# 반례가 도대체 뭔지를 모르겠다..
def solution(s):
    answer = len(s)
    n = len(s) // 2 + 1
    for i in range(1, n+1):
        length = len(s)
        index = 0
        part = s[index:i]
        index += i
        flag = False
        while index < len(s):
            if part == s[index:index+i]:
                length -= i
                flag = True
            elif flag is True:
                flag = False
                length += 1

            part = s[index:index+i]
            index += i

        if flag is True:
            length += 1
        answer = min(answer, length)
    return answer


print(solution("ababcdcdababcdcd"))