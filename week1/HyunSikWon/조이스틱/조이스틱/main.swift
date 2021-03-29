//
//  main.swift
//  조이스틱
//
//  Created by 원현식 on 2021/03/01.
//

import Foundation

// MARK: - 설명
/*
 name의 길이가 크지 않아 성능 고려는 하지 않아도 된다고 판단하고
 기능 구현에 초점을 맞춰 문제 해결을 진행하였습니다.
 
 상,하/좌우 이동 중 먼저 더 쉬운 상,하 이동을 구현하였습니다.
 알파벳 선택은 A에서 가장 가까운 위치만 찾으면 되기 때문에 ASCII 코드를 이용해 구현했습니다.
 
 좌우 이동은 현재 위치에서 A를 제외한 처리해야할 가장 가장 가까운 위치로 이동하도록 구현했습니다.
 
 */

// MARK: 코드

// 조이스틱 상하 조작(알파벳 조작)
func changeAlphabet(_ target: String) -> Int {
    // 유니코드를 통해 조이스틱 상하 조작의 최소 값을 구함. 거리라고 표현하겠습니다.
    let a = Int(UnicodeScalar(target)!.value) - 65 // target에서 A까지의 거리
    let b = 90 - Int(UnicodeScalar(target)!.value) + 1 // Z에서 target 까지의 거리 + A에서 Z까지 이동(1)
    return min(a, b)
}

// 커서 이동, 이동한 커서 위치(index) 반환
func moveCursor(_ currentCursor: Int, _ answer: inout Int, _ visited: inout [Bool], _ nameArr: [String.Element]) -> Int {
    guard visited.contains(false) else { return 0 } // 모두 방문했다면 종료.
    
    var minDistance = 99 // 임의의 최소 거리
    var index = currentCursor
    
    // 방문하지 않은 위치 중 현재(current)위치에서 가장 가까운 인덱스를 구함.
    for targetIndex in 0..<nameArr.count {
        guard targetIndex != currentCursor else { continue } // 현재 커서 위치는 제외
    
        if visited[targetIndex] == false { // 방문하지 않은 위치 중.
            // 현재 위치에서 target 까지의 최소 거리
            let dis = min(abs(targetIndex - currentCursor), currentCursor + nameArr.count - targetIndex)
            
            // 위에서 구한 거리(dis)가 가장 가까운 거리인지 확인
            if dis < minDistance {
                minDistance = dis
                index = targetIndex
            }
            
        }
        
    }
    // 커서 이동 거리 더함.
    answer += minDistance
    
    // 이동한 인덱스 반환
    return index
}

func solution(_ name: String) -> Int {
    var answer = 0 // 답
    var visited = Array(repeating: false, count: name.count) // 방문 배열
    let nameArr = Array(name) // 이름 문자 배열

    // 이름 중 A는 방문한 것으로 처리.
    for i in 0..<nameArr.count {
        if nameArr[i] == "A" {
            visited[i] = true
        }
    }
    
    var currentCursor = 0
    while visited.contains(false) { // O(n^3)
        visited[currentCursor] = true
        
        answer += changeAlphabet(String(nameArr[currentCursor]))
        currentCursor = moveCursor(currentCursor, &answer, &visited, nameArr)
    }
    
    return answer
}

// MARK: - 입출력
// 입력
let name1 = "JEROEN"
let name2 = "JAN"

// 출력
print(solution(name1))
print(56)

print(solution(name2))
print(23)


