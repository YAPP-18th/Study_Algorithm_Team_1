//
//  main.swift
//  가장 먼 노드
//
//  Created by 원현식 on 2021/04/06.
//

import Foundation

func makeGraph(_ n: Int, _ vertex: [[Int]]) -> [[Int]] {
  var graph = Array(repeating: [Int](), count: n)
  for v in vertex {
    graph[v[0]-1].append(v[1]-1)
    graph[v[1]-1].append(v[0]-1)
  }
  return graph
}

func bfs(_ start: Int,
              _ n: Int,
              _ graph: [[Int]],
              _ distance: inout [Int]) {
  
  var visited = Array(repeating: false, count: n)
  visited[start] = true
  
  var queue = [start]
  var queueIndex = 0
  while queueIndex < n {
    // 현재 노드
    let currentNode = queue[queueIndex]
    queueIndex += 1
    
    // 현재 노드와 연결된 노드
    for i in 0..<graph[currentNode].count {
      let childNode = graph[currentNode][i]
      // 이미 방문했다면 검색할 필요가 없다. 노드 사이의 거리가 모두 같기 때문
      guard visited[childNode] == false else { continue }
      
      visited[childNode] = true
      queue.append(childNode)
      distance[childNode] = distance[currentNode] + 1
    }
  }
  
}

func solution(_ n: Int, _ vertex: [[Int]]) -> Int {
  let graph = makeGraph(n, vertex)
  var distance = Array(repeating: 0, count: n)
  
  bfs(0, n, graph, &distance)
  var count = 0
  let max = distance.max()!
  distance.forEach { d in
    if d == max {
      count += 1
    }
  }
  
  return count
}

print(solution(6, [[3, 6], [4, 3], [3, 2], [1, 3], [1, 2], [2, 4], [5, 2]]))
print(3)
