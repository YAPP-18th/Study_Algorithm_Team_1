//
//  main.swift
//  합승 택시 요금
//
//  Created by 원현식 on 2021/03/16.
//

import Foundation

/*
 S에서 각 노드까지의 최단거리를 구한 후, 각 노드에서 A,B까지의 최단 거리를 구하여 합하는 방식을 생각했고,
 처음엔 다익스트라를 떠올렸지만 스위프트에서는 힙,큐 같은 자료구조가 따로 제공되지 않아 구현이 힘들었습니다.
 결국 문제는 모든 노드에서 모든 노드로의 최단 거리를 구해야 해결하기 쉬워서 Floyd Warshall을 사용했습니다.
*/

func floydWarshall(_ n: Int, _ distance: inout [[Int]]) {
    for k in 1...n {
        for i in 1...n {
            for j in 1...n {
                distance[i][j] = min(distance[i][j], distance[i][k] + distance[k][j])
            }
        }
    }
}

func makeGraph(_ n: Int, _ fares: [[Int]]) -> [[Int]] {
    var graph = Array(repeating: Array(repeating: 999999, count: n+1), count: n+1)
    
    for route in fares {
        let n1 = route[0]
        let n2 = route[1]
        let fare = route[2]
        
        graph[n1][n2] = fare
        graph[n2][n1] = fare
    }
    
    for i in 1...n {
        graph[i][i] = 0
    }
    
    return graph
}

func solution(_ n:Int, _ s:Int, _ a:Int, _ b:Int, _ fares:[[Int]]) -> Int {
    var distance = makeGraph(n, fares)
    
    // 모든 노드에서 노드까지의 거리가 최단거리인 그래프.
    floydWarshall(n, &distance)
    
    // 기준을 S->A + S->B 로 잡고.
    var answer = distance[s][a] + distance[s][b]

    // S->i 노드까지의 거리에 i->A, i->B까지 거리의 합을 구한다.
    for i in 1...n {
        answer = min(answer, distance[s][i] + distance[i][a] + distance[i][b])
    }

    return answer
}


