def solution(n, words):
    answer = [0, 0]
    turn = 0
    rotation = 1
    used_set = set()

    last_char = ""
    for word in words:
        if last_char != "" and last_char != word[0] or word in used_set:
            return [turn+1, rotation]

        used_set.add(word)
        turn += 1
        if turn >= n:
            turn %= n
            rotation += 1
        last_char = word[-1]

    return answer

# 크게 어려울 것 없었던 문제였던것 같다.
# words 배열을 순회하면서 마지막으로 등장했던 단어의 끝자리를 기억해두고,
# 조건에 맞지않는 순간 그때의 순서와 횟수를 리턴하면 끝