//
//  main.swift
//  가장 큰 수
//
//  Created by 원현식 on 2021/04/12.
//

import Foundation

// 비교 함수
func compare(_ a: Int, _ b: Int) -> Bool {
  return (String(a) + String(b)) > (String(b) + String(a))
}

func solution(_ numbers:[Int]) -> String {
  let sorted = numbers.sorted(by: compare)
  let answer = sorted.reduce(""){String($0) + String($1)}
  return answer.first! != "0" ? answer : "0"
}

print(solution([0]))
print("6210")

print(solution([3, 30, 34, 5, 9]))
print("9534330")

print(solution([0,0]))
print("0")
