//
//  main.swift
//  행렬 테두리 회전하기
//
//  Created by 원현식 on 2021/05/11.
//

import Foundation

func rotate(_ x1: Int, _ y1: Int, _ x2: Int, _ y2: Int, _ board: inout [[Int]]) -> Int {
  var minValue = Int.max
  var newPosition = [(row: Int, col: Int, value: Int)]()
  
  for r in x1...x2 {
    for c in y1...y2 {
      guard r == x1 || c == y1 || r == x2 || c == y2 else { continue }
      minValue = min(minValue, board[r][c])
      // 테두리 위치 이동
      if r == x1 { // ->
        if c < y2 {
          newPosition.append((row: r, col: c+1, value: board[r][c]))
        } else {
          newPosition.append((row: r+1, col: c, value: board[r][c]))
        }
      } else if c == y1 { // up
        if r > x1 {
          newPosition.append((row: r-1, col: c, value: board[r][c]))
        } else {
          newPosition.append((row: r, col: c+1, value: board[r][c]))
        }

      } else if r == x2 { // <-
        if c > y1 {
          newPosition.append((row: r, col: c-1, value: board[r][c]))
        } else {
          newPosition.append((row: r-1, col: c, value: board[r][c]))
        }
      } else if c == y2 { // down
        if r < x2 {
          newPosition.append((row: r+1, col: c, value: board[r][c]))
        } else {
          newPosition.append((row: r, col: c-1, value: board[r][c]))
        }
      }
    }
  }
  
  // 회전 후 행렬 변경
  for (row, col, value) in newPosition {
    board[row][col] = value
  }
  
  return minValue
}


func solution(_ rows:Int, _ columns:Int, _ queries:[[Int]]) -> [Int] {
  var board = Array(repeating: Array(repeating: 0, count: columns), count: rows)
  
  for i in 1...rows {
    for j in 1...columns {
      board[i-1][j-1] = ((i-1)*columns + j)
    }
  }
  
  var answer = [Int]()
  for query in queries {
    let x1 = query[0], y1 = query[1], x2 = query[2], y2 = query[3]
    answer.append(rotate(x1-1, y1-1, x2-1, y2-1, &board))
  }
  
  return answer
}

print(solution(6, 6,
               [[2, 2, 5, 4], [3, 3, 6, 6], [5, 1, 6, 3]]))

print(solution(100, 97, [[1, 1, 100, 97]]))
