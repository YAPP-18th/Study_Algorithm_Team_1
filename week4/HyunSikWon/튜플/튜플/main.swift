//
//  main.swift
//  튜플
//
//  Created by 원현식 on 2021/03/22.
//

import Foundation

func makeElements(_ str: String) -> [[Int]] {
  var elements = Array(repeating: Array(repeating: 0, count: 0), count: 10_001)
  var temp = [Int]()
  var number = ""
  for char in str {
    if String(char) == "{" {
      temp = []
    } else if String(char) == "}" {
      temp.append(Int(number)!)
      elements[temp.count] = temp
    } else if String(char) == ","{
      if !number.isEmpty {
        temp.append(Int(number)!)
      }
      number = ""
    }else {
      number += String(char)
    }
  }
  
  return elements
}

/*
 순서가 뒤죽박죽일 수 있어서 가장 작은 원소부터 탐색하는 방법으로 진행했습니다.
 -> 크기가 1인 배열에서 첫번째 값을, 2인 배열에서 두번째 값을...
 */

func solution(_ s:String) -> [Int] {
  // 불필요한 {, } 제거
  var str = s
  str.removeFirst()
  str.removeLast()
  
  // 문자열을 정수형 배열을 원소로 갖는 집합으로 변환한다. {{1,2,3},{2,1},{1,2,4,3},{2}} -> [[], [2], [2,1], [1,2,3], [1,2,4,3]]
  let elements = makeElements(str)
  
  
  // 집합의 원소들을 탐색
  var answer = [Int]()
  for i in 1..<elements.count {
    guard elements[i] != [] else { break }

    // 각 원소(정수형 배열)을 탐색하면서 결과 튜플에 없는 값들을 추가한다.
    for j in 0..<elements[i].count {
      guard !answer.contains(elements[i][j]) else {
        continue
      }
      
      answer.append(elements[i][j])
      break // 집합의 원소를 탐색하면서 추가되는 값은 오직 하나, 값이 추가되면 나머지 값들을 볼 필요가 없다.
    }
    
  }
  
    return answer
}


