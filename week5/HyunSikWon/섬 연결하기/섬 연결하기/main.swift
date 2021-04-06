//
//  main.swift
//  섬 연결하기
//
//  Created by 원현식 on 2021/03/30.
//

import Foundation

func unionParent(_ node1: Int, _ node2: Int, _ parent: inout [Int]) {
  let pa = getParent(node1, &parent)
  let pb = getParent(node2, &parent)
  
  if pa < pb {
    parent[pb] = pa
  } else {
    parent[pa] = pb
  }
}

func getParent(_ node: Int, _ parent: inout [Int]) -> Int {
  if parent[node] == node {
    return parent[node]
  } else {
    return getParent(parent[node], &parent)
  }
}

func solution(_ n:Int, _ costs:[[Int]]) -> Int {
  var totalCosts = 0
  var parent = Array(repeating: 0, count: n)
  for i in 0..<n {
    parent[i] = i
  }
  
  costs.sorted{ $0[2] < $1[2] }.forEach { cost in
    
    let node1 = cost[0]; let node2 = cost[1]; let cost = cost[2]
    
    if getParent(node1, &parent) != getParent(node2, &parent) {
      unionParent(node1, node2, &parent)
      totalCosts += cost
    }
    
  }
  
  return totalCosts
}

let n = 4
let costs = [[0,1,1],[0,2,2],[1,2,5],[1,3,1],[2,3,8]]
print(solution(n, costs))
print(4)
