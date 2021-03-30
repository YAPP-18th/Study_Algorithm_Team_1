def solution(s):
    answer = len(s)
    n = len(s) // 2 + 1
    for i in range(1, n+1):
        convert = ""
        index = 0
        part = s[index:i]
        index += i
        cnt = 1
        for index in range(i, len(s), i):
            if part == s[index:index+i]:
                cnt += 1
            elif cnt > 1:
                convert += str(cnt)
                convert += part
                cnt = 1
            else:
                convert += part

            part = s[index:index+i]
            index += i

        if cnt > 1:
            convert += str(cnt)
        convert += part
        answer = min(answer, len(convert))
    return answer

# 경우의 수가 많지 않기 때문에, 브루트 포스, 즉 무식하게 풀면 되는 문제였다.
# 근데 처음 풀이는 굳이 일일이 압축 문자열을 만들기 보다는, 압축되는 상황에서 문자열 갯수를 감소시키는 방식으로
# 접근해봤는데, 특정 테스트케이스에서 계속 실패를 했었다.
# 결국 압축 문자열을 직접 만드는 방식으로 변경하니 통과는 했는데, 기존 방법의 반례가 뭐였는지 아직도 모르겠다..ㅠㅠ
