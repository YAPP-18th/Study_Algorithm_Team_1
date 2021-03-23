//
//  main.swift
//  수식 최대화
//
//  Created by 원현식 on 2021/03/16.
//

import Foundation

/*
우선순위의 모든 경우를 다 해보는 것으로 문제를 풀었습니다.
 */

// 계산 함수
func calculate(_ x: String, _ op: String, _ y: String) -> String {
    var result: Int64 = 0
    
    if op == "*" {
        result = Int64(x)!*Int64(y)!
    } else if op == "+"{
        result = Int64(x)!+Int64(y)!
    } else {
        result = Int64(x)!-Int64(y)!
    }
    
    return String(result)
}

func solution(_ expression:String) -> Int64 {
    var arr = [String]()
    
    var temp = ""
    for char in expression {
        if Int(String(char)) == nil {
            arr.append(temp)
            arr.append(String(char))
            temp = ""
        } else {
            temp += String(char)
        }
    }
    arr.append(temp)
    
    let priorities = [
        ["*","+","-"], ["*","-","+"],
        ["+","*","-"], ["+","-","*"],
        ["-","+","*"], ["-","*","+"],
    ]

    var answer: Int64 = 0
    // 모든 경우
    for priority in priorities {
        var tempExpression = arr 
        // 우선순위를 적용하여 계산
        for op in priority {
            var index = 1
            while index < tempExpression.count-1 {
                if tempExpression[index] == op {
                    let newValue = calculate(tempExpression[index-1], op, tempExpression[index+1])
                    tempExpression[index] = newValue // 연산자 위치에 연산 결과 값
                    tempExpression.remove(at: index-1) // 좌측 제거
                    tempExpression.remove(at: index) // 한 칸씩 당겨지므로 index위치 제거
                    index -= 1
                }
                index += 1
            }
        }
        
        if abs(Int64(tempExpression.first!)!) > answer { // 절대값으로 비교
            answer = abs(Int64(tempExpression.first!)!)
        }
            
    }
    
    return answer
}

let expression1 = "100-200*300-500+20"
print(solution(expression1))
print(60420)

let expression2 = "50*6-3*2"
print(solution(expression2))
print(300)
