def solution(land):
    N = len(land)

    for i in range(N-1):
        land[i+1][0] += max(land[i][1], land[i][2], land[i][3])
        land[i+1][1] += max(land[i][0], land[i][2], land[i][3])
        land[i+1][2] += max(land[i][0], land[i][1], land[i][3])
        land[i+1][3] += max(land[i][0], land[i][1], land[i][2])

    answer = max(land[N-1][0], land[N-1][1], land[N-1][2], land[N-1][3])
    return answer

# 레벨 2 치고는 DP를 적용해야 해서 어려운 문제였던것 같다.
# 다음 열에 겹치지 않은 열들의 최대값을 더해나가면서, 마지막에 쌓인 최대값을 구한다.
