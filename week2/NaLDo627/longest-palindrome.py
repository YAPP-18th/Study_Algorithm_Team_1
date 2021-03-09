def solution(s):
    answer = 1

    for idx, char in enumerate(s):
        offset = 1
        temp = 1


        # 팰린드롬 개수가 홀수일 경우
        while idx - offset >= 0 and idx + offset <= len(s) - 1:
            if s[idx - offset] != s[idx + offset]:
                break

            temp += 2
            offset += 1
        answer = max(answer, temp)

        # 팰린드롬 개수가 짝수일 경우
        offset = 0
        temp = 0
        while idx - offset >= 0 and idx + offset + 1 <= len(s) - 1:
            if s[idx - offset] != s[idx + offset + 1]:
                break

            temp += 2
            offset += 1
        answer = max(answer, temp)

    return answer

print(solution("abcdcba")) # 7
print(solution("abacde")) # 3

# 팰린드롬 문자열 개수가 홀수인 경우와 짝수인 경우로 나누어서 생각
# 문자열 전체를 돌아보면서 현재 위치 기준으로 대칭인지 검사해본다.
# 시간 복잡도는 O(n^2)
# 즉, 데이터 셋이 적으면 위 풀이가 가능한데, 만약 길이가 엄청 길다면..??
# 더 줄일 수 있는 방법이 있는지 궁금하다 (다른 풀이들도 참고해 봤만 O(n^2) 아래는 없는 듯 하다..)
