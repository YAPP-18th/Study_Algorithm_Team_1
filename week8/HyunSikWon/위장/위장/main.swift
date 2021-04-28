//
//  main.swift
//  위장
//
//  Created by 원현식 on 2021/04/19.
//

import Foundation
func solution(_ clothes:[[String]]) -> Int {
  var dictionary: [String: Int] = [:]
  for c in clothes {
    guard dictionary[c[1]] != nil else {
      dictionary[c[1]] = 1
      continue
    }
    dictionary[c[1]]! += 1
  }
  var answer = 1
  for (_, value) in dictionary {
    answer *= (value+1)
  }
  
  // 옷을 안 입는 경우를 빼야함.
  return answer-1
}

print(solution([["yellow_hat", "headgear"],
                ["blue_sunglasses", "eyewear"],
                ["green_turban", "headgear"]]))
print(5)

print(solution([["crow_mask", "face"],
                ["blue_sunglasses", "face"],
                ["smoky_makeup", "face"]]))
print(3)
