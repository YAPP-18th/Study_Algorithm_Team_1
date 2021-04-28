//
//  main.swift
//  블록 이동하기
//
//  Created by 원현식 on 2021/04/21.
//

import Foundation

func check(_ robot: (x1: Int,y1: Int,x2: Int,y2: Int, time: Int), _ board: [[Int]]) -> Bool {
  guard min(robot.x1, robot.y1, robot.x2, robot.y2) >= 0 else { return false }
  guard max(robot.x1, robot.y1, robot.x2, robot.y2) < board.count else { return false }
  guard board[robot.x1][robot.y1] != 1 else { return false }
  guard board[robot.x2][robot.y2] != 1 else { return false }
  return true
}

func checkVisited(_ robot: (x1: Int,y1: Int,x2: Int,y2: Int, time: Int), _ visited: [[[[Bool]]]]) -> Bool {
  return visited[robot.x1][robot.y1][robot.x2][robot.y2]
}

func bfs(_ board: [[Int]]) -> Int{
  var queue = [(x1: Int, y1: Int,x2: Int,y2: Int, time: Int)]()
  var visited = Array(repeating:
                        Array(repeating:
                                Array(repeating:
                                        Array(repeating: false, count: board.count), count: board.count), count: board.count), count: board.count)
  queue.append((0,0,0,1,0))
  var answer = Int.max
  var queueIndex = 0
  // down, up, right, left
  let move = [[1,0], [-1,0], [0,1],  [0,-1]]
  
  while !queue.isEmpty {
    let robot = queue[queueIndex]
    queueIndex += 1
    visited[robot.x1][robot.y1][robot.x2][robot.y2] = true
    
    if robot.time >= answer {continue}
        
    if ((robot.x1 == board.count-1) && (robot.y1 == board.count-1)) || ((robot.x2 == board.count-1) && (robot.y2 == board.count-1)) {
      answer = robot.time
      break
    }
    
    for direction in move {
      let movedRobot = (robot.x1+direction[0], robot.y1+direction[1], robot.x2+direction[0], robot.y2+direction[1], robot.time+1)
      
      if check(movedRobot, board) && !checkVisited(movedRobot, visited) {
        queue.append(movedRobot)
      }
    }
    
    // 회전
    if robot.x1 == robot.x2 {
      // 로봇이 수평
      // 위로 회전
      if ((robot.x1-1) >= 0 && (robot.x2-1) >= 0)
          && (board[robot.x1-1][robot.y1] == 0)
          && (board[robot.x2-1][robot.y2] == 0) {
        
        let leftSide = robot.y1 < robot.y2 ? (robot.x1, robot.y1) : (robot.x2, robot.y2)
        let rightSide = robot.y1 < robot.y2 ? (robot.x2, robot.y2) : (robot.x1, robot.y1)
        
        // 오른쪽, 위
        var rotatedRobot = (leftSide.0-1, leftSide.1+1 ,rightSide.0, rightSide.1, robot.time + 1)
        if check(rotatedRobot, board) && !checkVisited(rotatedRobot, visited) {
          queue.append((rotatedRobot))
        }
        
        rotatedRobot = (leftSide.0, leftSide.1 ,rightSide.0-1, rightSide.1-1, robot.time + 1)
        // 왼쪽, 위
        if check(rotatedRobot, board) && !checkVisited(rotatedRobot, visited) {
          queue.append((rotatedRobot))
        }
        
      }
      
      // 아래로 회전
      if ((robot.x1+1) < board.count && (robot.x2+1) < board.count)
          && (board[robot.x1+1][robot.y1] == 0)
          && (board[robot.x2+1][robot.y2] == 0) {
        
        let leftSide = robot.y1 < robot.y2 ? (robot.x1, robot.y1) : (robot.x2, robot.y2)
        let rightSide = robot.y1 < robot.y2 ? (robot.x2, robot.y2) : (robot.x1, robot.y1)
        
        // 오른쪽, 아래
        var rotatedRobot = (leftSide.0+1, leftSide.1+1 ,rightSide.0, rightSide.1, robot.time + 1)
        if check(rotatedRobot, board) && !checkVisited(rotatedRobot, visited) {
          queue.append((rotatedRobot))
        }
        
        rotatedRobot = (leftSide.0, leftSide.1 ,rightSide.0+1, rightSide.1-1, robot.time + 1)
        // 왼쪽, 아래
        if check(rotatedRobot, board) && !checkVisited(rotatedRobot, visited) {
          queue.append((rotatedRobot))
        }
 
        
      }
      
    } else if robot.y1 == robot.y2 {
      // 로봇이 수직
      // 우측으로 회전
      if ((robot.y1+1) < board.count && (robot.y2+1) < board.count)
          && (board[robot.x1][robot.y1+1] == 0)
          && (board[robot.x2][robot.y2+1] == 0) {
        
        let upside = robot.x1 < robot.x2 ? (robot.x1, robot.y1) : (robot.x2, robot.y2)
        let downside = robot.x1 < robot.x2 ? (robot.x2, robot.y2) : (robot.x1, robot.y1)
        
        // 오른쪽, 위
        var rotatedRobot = (downside.0-1, downside.1+1 ,upside.0, upside.1, robot.time + 1)
        if check(rotatedRobot, board) && !checkVisited(rotatedRobot, visited) {
          queue.append((rotatedRobot))
        }
        
        // 오른쪽, 아래
        rotatedRobot = (downside.0, downside.1,upside.0+1, upside.1+1, robot.time + 1)
        if check(rotatedRobot, board) && !checkVisited(rotatedRobot, visited) {
          queue.append((rotatedRobot))
        }

      }
      
      // 좌측 회전
      if ((robot.y1-1) >= 0 && (robot.y2-1) >= 0)
          && (board[robot.x1][robot.y1-1] == 0)
          && (board[robot.x2][robot.y2-1] == 0) {
        
        let upside = robot.x1 < robot.x2 ? (robot.x1, robot.y1) : (robot.x2, robot.y2)
        let downside = robot.x1 < robot.x2 ? (robot.x2, robot.y2) : (robot.x1, robot.y1)
        
        // 왼쪽, 위
        var rotatedRobot = (downside.0-1, downside.1-1 ,upside.0, upside.1, robot.time + 1)
        if check(rotatedRobot, board) && !checkVisited(rotatedRobot, visited) {
          queue.append((rotatedRobot))
        }
        
        // 왼쪽, 아래
        rotatedRobot = (downside.0, downside.1,upside.0+1, upside.1-1, robot.time + 1)
        if check(rotatedRobot, board) && !checkVisited(rotatedRobot, visited) {
          queue.append((rotatedRobot))
        }
        
      }
    }
    

  }

  return answer
  
}

func solution(_ board:[[Int]]) -> Int {
  return  bfs(board)
}

print(solution([[0, 0, 0, 1, 1],
                [0, 0, 0, 1, 0],
                [0, 1, 0, 1, 1],
                [1, 1, 0, 0, 1],
                [0, 0, 0, 0, 0]]))

print(7)
