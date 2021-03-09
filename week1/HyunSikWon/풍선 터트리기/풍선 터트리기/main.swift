//
//  main.swift
//  풍선 터트리기
//
//  Created by 원현식 on 2021/03/02.
//

import Foundation

/*
 1. a의 최대 길이가 충분히 크므로 단순히 구현만 하는 것이 아니라 효율성도 고려.
 2. 투 포인터 알고리즘을 고려하여 문제에 접근함.
 3. 양 끝의 수는 무조건 남을 수 있다. - 핵심
 현재 숫자가 끝에 있는 것과 다름이 없냐??
*/

func solution(_ a: [Int]) -> Int {
    var answer = Set<Int>()
    var min = 1000000001
    
    for i in 0..<a.count {
        if a[i] < min {
            answer.insert(a[i])
            min = a[i]
        }
    }
    
    min = 1000000001
    for i in (0..<a.count).reversed() {
        if a[i] < min {
            answer.insert(a[i])
            min = a[i]
        }
    }
    
    return answer.count
}


// 입출력 예
print("-----1-----")
let a1 = [9, -1, -5]
print(solution(a1))
print(3)

print("\n-----2-----")
let a2 = [-16, 27, 65, -2, 58, -92, -71, -68, -61, -33]
print(solution(a2))
print(6) // -16, -92, -71, -68, -61, -33
