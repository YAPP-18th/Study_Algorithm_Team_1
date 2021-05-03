//
//  main.swift
//  쿼드압축 후 개수 세기
//
//  Created by 원현식 on 2021/04/29.
//

import Foundation

// 압축 가능 여부
func check(_ arr: [[Int]], _ r: Int, _ c: Int, _ size: Int) -> Bool {
  let v = arr[r][c]
  for i in r..<r+size {
    for j in c..<c+size {
      if v != arr[i][j] {
        return false
      }
    }
  }
  return true
}


func divide(_ arr: [[Int]], _ r: Int, _ c: Int, _ size: Int, _ answer: inout (zero: Int, one: Int)) {
  guard size > 0 else { return }

  if check(arr, r, c, size) {
    if arr[r][c] == 0 {
      answer.zero += 1
    } else {
      answer.one += 1
    }
    return
  }
  
  // 4등분
  divide(arr, r, c, size/2, &answer)
  
  divide(arr, r+size/2, c+size/2, size/2, &answer)
  
  divide(arr, r, c+size/2, size/2, &answer)
  
  divide(arr, r+size/2, c, size/2, &answer)

}

func solution(_ arr: [[Int]]) -> [Int] {

  var answer: (zero: Int, one: Int) = (0,0)
  divide(arr, 0, 0, arr.count, &answer)
  return [answer.zero, answer.one]
}
