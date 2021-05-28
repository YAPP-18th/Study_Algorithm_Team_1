//
//  main.swift
//  압축
//
//  Created by 원현식 on 2021/05/25.
//

import Foundation

func solution(_ msg:String) -> [Int] {
  var result = [Int]()
  
  var dictionary = [
    "A", "B", "C", "D", "E", "F",
    "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X",
    "Y", "Z" ]
  
  let message = ([] + msg).map{String($0)}
  var w = message[0]
  var c = ""
  var i = 0
  
  while i < message.count {
    // 현재 입력과 다음 글자를 찾는다.
    for j in i+1..<message.count {
      // 사전에 해당 문자가 존재하지 않는 경우.
      if !dictionary.contains(w+message[j]) {
        c = message[j]
        break
      } else {
        w = w+message[j]
      }
    }
    
    
    for k in 0..<dictionary.count {
      if dictionary[k] == w {
        result.append(k+1)
        break
      }
    }
    dictionary.append(w+c)
    
    i += w.count
    w = c
  }
  
  return result
}
print(solution("TOBEORNOTTOBEORTOBEORNOT"))
