//
//  main.swift
//  다리를 지나는 트럭
//
//  Created by 원현식 on 2021/04/05.
//

import Foundation

func solution(_ bridge_length:Int, _ weight:Int, _ truck_weights:[Int]) -> Int {
  var time = 1
  var bridge = Array(repeating: 0, count: bridge_length)
  var currentTruckIndex = 0
  var count = 0
  var currentWeight = 0
  
  while count < truck_weights.count {
    time += 1
    bridge.removeFirst()
    
    // 다리에 진입 가능한 경우.
    if currentTruckIndex < truck_weights.count && truck_weights[currentTruckIndex] + currentWeight <= weight {
      // 다리에 진입
      bridge.append(truck_weights[currentTruckIndex])
      // 현재 다리에 진입되어있는 차들의 총 무게
      currentWeight += truck_weights[currentTruckIndex]
      // 진입할 차량 인덱스
      currentTruckIndex += 1
      
    } else {
      // 0은 빈 공간을 의미.
      bridge.append(0)
    }
    
    // 다리를 모두 건넜다.
    if bridge.first! != 0 {
      // 다리를 건넌 트럭의 수
      count += 1
      currentWeight -= bridge.first!
    }
    
  }

  
  return time
}
// [0, 0] -> [7, 0] - > [0, 7] -> [4, 0]
print(solution(2, 10, [7, 4, 5, 6]))
print(8)

print(solution(100, 100, [10]))
print(101)

print(solution(100, 100, [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]))
print(110)

