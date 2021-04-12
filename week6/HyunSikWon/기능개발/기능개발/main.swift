//
//  main.swift
//  기능개발
//
//  Created by 원현식 on 2021/04/06.
//

import Foundation

func solution(_ progresses: [Int], _ speeds: [Int]) -> [Int] {
  var answer = [Int]()
  var status = progresses // 작업의 진도현황
  var progressNumber = 0 // 현재 배포될 작업의 index
  
  while progressNumber < progresses.count {
    // 모든 작업에 작업 속도만큼을 더함.
    for i in 0..<progresses.count {
      status[i] += speeds[i]
    }
    
    // 현재 배포되어야 하는 작업이 끝났다면
    if status[progressNumber] >= 100 {
      // 현재 작업 뒤에 완료된 작업을 구한다.
      var count = 0
      for i in progressNumber..<progresses.count {
        guard status[i] >= 100 else { break }
        count += 1
      }
      
      // 완료된 작업의 개수만큼 index 이동
      progressNumber += count
      answer.append(count)
    }
    
  }

  return answer
}

print(solution([93, 30, 55], [1, 30, 5]))
print([2, 1])

print(solution([95, 90, 99, 99, 80, 99], [1, 1, 1, 1, 1, 1]))
print([1, 3, 2])
