ORDERS = (
    ['*', '+', '-'],
    ['*', '-', '+'],
    ['+', '*', '-'],
    ['+', '-', '*'],
    ['-', '*', '+'],
    ['-', '+', '*']
)

# 데이터를 다루기 쉽도록 리스트 형태로 가공한다.
def parse_expression(expression):
    parsed = []
    temp = ""
    for exp in expression:
        if exp in {'-', '+', '*'}:
            parsed.append(int(temp))
            parsed.append(exp)
            temp = ""
            continue

        temp += exp
    parsed.append(int(temp))
    return parsed


# 연산자 우선순위를 판별 할 수 있도록 하는 함수, 숫자가 작은게 더 우선순위가 높다
def compare(oper1, oper2, order):
    prior1 = order.index(oper1)
    prior2 = order.index(oper2)
    if prior1 < prior2:
        return -1

    if prior1 > prior2:
        return 1
    return 0


# 리스트 형태의 중위 표현식을 후위 표현식으로 바꾸어 준다.
def make_postfix(parsed, order):
    postfix = []
    stack = []
    for value in parsed:
        # 피연산자일 경우 그대로 출력
        if value not in {'-', '+', '*'}:
            postfix.append(value)
            continue

        # stack이 비어있다면 연산자 push
        if len(stack) == 0:
            stack.append(value)
            continue

        # stack이 비어있지 않고 stack의 마지막 항목이 우선순위가 더 높다면 pop 후 출력 (반복)
        while len(stack) > 0 and compare(stack[-1], value, order) <= 0:
            postfix.append(stack.pop())
            continue

        # 현재 연산자 stack에 push
        stack.append(value)

    # stack에 남은게 있다면 모두 출력
    while stack:
        postfix.append(stack.pop())
    return postfix

def solution(expression):
    answer = 0
    parsed = parse_expression(expression)
    for order in ORDERS:
        postfix = make_postfix(list(parsed), order)
        stack = []
        for value in postfix:
            # 피연산자일 경우 stack에 push
            if value not in {'-', '+', '*'}:
                stack.append(value)
                continue

            # 연산자일 경우 stack 을 두 번 pop 하여 해당 연산자로 연산 후 다시 stack에 push 한다
            b, a = (stack.pop(), stack.pop())

            # eval 함수는 문자열로 되어있는 식을 그대로 계산해주는 함수이다. (자바스크립트에도 있는 것으로 앎)
            stack.append(eval(str(a) + value + str(b)))

        answer = max(answer, abs(stack[0]))

    return answer

print(solution("100-200*300-500+20"))

# 후위 표기식의 계산법을 알면 쉽게 풀 수 있는 문제
# (이지만 정작 생각이 안나서 다시 찾아서 보고 풀었다..)
#
# 먼저 일반식(중위 표현식)을 후위 표현식으로 만들고, 미리 정의해 둔 연산자 우선순위에 따라 계산을 하면 된다.
# 중위 표현식을 후위표현식으로 만드는 과정, 또 후위 표현식을 계산하는 과정 모두 스택이 필요하다.
# 기존의 후위 표현식 계산법과 아주 똑같으나, 연산자 우선순위에만 차이를 두면 된다.
# 문제의 길이가 크지 않기에, 우선순위가 다른 6가지의 경우를 모두 세어보아도 괜찮을 것 같았다.
