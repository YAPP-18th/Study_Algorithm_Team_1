//
//  main.swift
//  이진 변환 반복하기
//
//  Created by 원현식 on 2021/05/11.
//

import Foundation

func removeZero(_ s: String) -> String {
  let arr = [] + s
  var answer = ""
  for char in arr {
    guard String(char) != "0" else { continue }
    answer += String(char)
  }
  
  return answer
}

func binary(_ i: Int) -> String {
  return String(i, radix: 2)
}

func solution(_ s:String) -> [Int] {
  var countZero = 0
  var time = 0
  var str = s
  
  while str != "1" {
    // 0 제거
    let removed = removeZero(str)
    countZero += (str.count-removed.count)
    
    // 이진변환
    str = binary(removed.count)
    
    time += 1
  }
  

  return [time, countZero]
}

print(solution("1111111"))
