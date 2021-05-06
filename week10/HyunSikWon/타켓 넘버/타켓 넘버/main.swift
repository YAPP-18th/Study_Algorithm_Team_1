//
//  main.swift
//  타켓 넘버
//
//  Created by 원현식 on 2021/05/06.
//

import Foundation

func solution(_ numbers: [Int], _ target: Int) -> Int {
  var answer = 0
  for i in 0..<Int(pow(2.0, Double(numbers.count))){
    var operators = [String]()
    
    // 모든 경우를 다 구함.
    for j in 0..<numbers.count {
      if(i & (1 << j) != 0) {
        operators.append("+")
      } else {
        operators.append("-")
      }
    }
    
    var num = 0
    for i in 0..<numbers.count {
      let op = operators[i]
      if op == "+" {
         num += +numbers[i]
      } else {
        num += -numbers[i]
      }
    }
    
    if num == target { answer += 1 }
  }
  
  return answer
}
