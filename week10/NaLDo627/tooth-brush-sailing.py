class Seller():
    def __init__(self, name, referer=None):
        self.name = name
        self.referer = referer
        self.money = 0


class SellerManagement():
    def __init__(self):
        self.sellers = {}


    def add_seller(self, seller):
        self.sellers[seller.name] = seller


    def on_profit(self, name, amount):
        seller = self.sellers[name]
        profit = amount * 100
        while seller is not None:
            fee = profit // 10
            seller.money += (profit - fee)

            profit = fee
            seller = seller.referer


def solution(enroll, referral, seller, amount):
    management = SellerManagement()

    for i in range(len(enroll)):
        name = enroll[i]
        referer = referral[i]
        if referral[i] != "-":
            employee = Seller(name, management.sellers[referer])
        else:
            employee = Seller(name)
        management.add_seller(employee)

    for i in range(len(seller)):
        management.on_profit(seller[i], amount[i])

    answer = []
    for name in enroll:
        answer.append(management.sellers[name].money)
    return answer

# 객체지향적으로 접근해서 풀이했다. 각 판매원을 노드로 설정하고 이름, 부모 인스턴스 참조, 잔액을 기록할 수 있도록 했다.
# 관리 시스템을 만들어서 내부적으로 딕셔너리 자료형을 사용해 판매원을 저장할 수 있도록 했다.
# 다음은 수익 발생시 관리 시스템에서 메서드를 사용해서 명시된 알고리즘을 처리할 수 있도록 한다.
