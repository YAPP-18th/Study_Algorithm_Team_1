//
//  main.swift
//  큰 수 만들기
//
//  Created by 원현식 on 2021/03/15.
//

import Foundation

/*
 최종 결과 값의 길이를 lenght라고 했을 때,
 이를 이용해 앞자리 숫자부터 구하는 방법으로 진행했었습니다.
 e.g. 1924 -> 19, 92, 24 를 통해 9를 구함. 따라서 1은 제거하고 count++; length--
      24 -> 2, 4 를 통해 4를 구함. 따라서 정답은 94.
 
 그러나 이 방법은 시간초과.. 결국 '질문하기'에서 도움을 받아 풀었습니다.
 앞자리를 더 큰 값으로 만들도록 하는 것 같은데.. 코드로는 이해가 가지만
 해결 방법이 어떤 과정에서 도출됐는지 팀원분들의 조언이 좀 필요할 것 같습니다ㅠㅠ
 
 */

func solution(_ number: String, _ k: Int) -> String {
    let numberArr = number.compactMap{Int(String($0))}
    var stack = [Int]()
    var count = 0
    
    for i in 0..<numberArr.count {
        // 스택을 통해 더 큰 값으로 앞자리를 만드는 과정.
        while !stack.isEmpty && count < k && stack.last! < numberArr[i] {
            count += 1
            _ = stack.popLast()
        }
        
        
        if count < k {
            stack.append(numberArr[i])
        } else { // 제거한 수의 개수가 k라면 남은 값들을 모두 스택에 추가.
            stack.append(contentsOf: numberArr[i...])
            break
        }
        
    }

    // 같은 값이 끝까지 반복되는 경우 while문이 실행되지 않음. 이 경우 k를 제거한 길이만큼만 더해준다.
    return stack[..<(number.count-k)].map{String($0)}.joined()
}


// 테스트 케이스
let number1 = "1924"
let k1 = 2
print(solution(number1, k1))
print("94")

let number2 = "1231234"
let k2 = 3
print(solution(number2, k2))
print("3234")

let number3 = "4177252841"
let k3 = 4
print(solution(number3, k3))
print("775841")


let number4 = "5555555"
let k4 = 1
print(solution(number4, k4))
print("555555")
