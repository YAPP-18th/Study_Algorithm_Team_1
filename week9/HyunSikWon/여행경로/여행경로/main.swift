//
//  main.swift
//  여행경로
//
//  Created by 원현식 on 2021/04/29.
//

import Foundation

func depart(_ currentAirPort: String,
            _ depth: Int,
            _ tickets: [[String]],
            _ routes: inout [String],
            _ visited: inout [Bool],
            _ answer: inout [String]) {
  
  routes.append(currentAirPort)
  
  if depth == tickets.count {
    answer = routes
    return
  }
  
  for i in 0..<tickets.count where answer.isEmpty {
    let ticket = tickets[i]
    
    // 방문 검사, 현재 공항이 출발지인 티켓을 찾는다.
    if visited[i] == false && ticket[0] == currentAirPort {
      visited[i] = true
      depart(ticket[1], depth+1, tickets, &routes, &visited, &answer)
      visited[i] = false
    }
    
  }
  
  routes.removeLast()

}

func solution(_ tickets: [[String]]) -> [String] {
  let sorted = tickets.sorted { $0[1] < $1[1] }
  var routes = [String]()
  var answer = [String]()
  var visited = Array(repeating: false, count: sorted.count)
  
  depart("ICN", 0, sorted, &routes, &visited, &answer)
  
  return answer
}



print(solution([["ICN", "JFK"], ["HND", "IAD"], ["JFK", "HND"]]))
print(["ICN", "JFK", "HND", "IAD"])


print(solution([["ICN", "SFO"],
                ["ICN", "ATL"],
                ["SFO", "ATL"],
                ["ATL", "ICN"],
                ["ATL", "SFO"]]))


print(["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"])
