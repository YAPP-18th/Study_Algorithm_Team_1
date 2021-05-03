//
//  main.swift
//  땅따먹기
//
//  Created by 원현식 on 2021/04/27.
//

import Foundation

func solution(_ land: [[Int]]) -> Int {
  if land.count == 0 {
    return land[0].max()!
  }
  
  var newLand = land
  for i in 1..<newLand.count {
    let bottom = newLand[i]
    let top = newLand[i-1]
    // i 행을 기준으로
    for j in 0..<4 {
      var max = 0
      // i-1 행의 k 칸들의 값과 i행 j칸의 값을 더했을 때 가장 큰 값을 기록한다. i행의 각 칸에는 만들 수 있는 최대 값이 누적된다.
      for k in 0..<4 {
        guard j != k else { continue }
        if bottom[j] + top[k] > max {
          max = bottom[j] + top[k]
        }

      }
      
      newLand[i][j] = max
    }
    
  }
  
  
  
  return newLand[land.count-1].max()!
}

print(solution([[1, 2, 3, 5],
                [5, 6, 7, 8],
                [4, 3, 2, 1]]))
print(16)
