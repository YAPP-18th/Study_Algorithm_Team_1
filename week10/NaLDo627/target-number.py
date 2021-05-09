def dfs(numbers, target, current_value, index):
    if index == len(numbers):
        if current_value == target:
            return 1
        return 0

    number = numbers[index]
    return dfs(numbers, target, current_value + number, index + 1) + \
           dfs(numbers, target, current_value - number, index + 1)

def solution(numbers, target):
    return dfs(numbers, target, 0, 0)

# 심플하게 dfs로 풀이했다.
# 배열을 탐색해가면서 더한 결과와 뺀것 결과를 탐색해나간다.
# 제한사항이 그렇게 크지 않기에 가능한 풀이인 것 같다.
