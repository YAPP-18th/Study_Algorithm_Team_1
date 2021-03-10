//
//  main.swift
//  가장 긴 팰린드롬
//
//  Created by 원현식 on 2021/03/09.
//

import Foundation

func solution(_ s: String) -> Int {
    var answer = 1
    let arr = [] + s
    
    // 중심부의 값.
    for i in 1..<arr.count {
        for j in 1...i { // 중심부 값을 기준으로 +-1, +-2.. ex) aabaa
            guard i-j >= 0 && i+j < arr.count else { break } // 인덱스 범위 체크
            guard arr[i-j] == arr[i+j] else { break } // 중심부로부터 좌 우로 같은 거리에 있는 값이 같지 않으면 검사할 필요 없음.

 
            if (j*2)+1 > answer { // 같다면 중심부로부터의 거리*2 +1(중심부)
                answer = (j*2)+1
            }
        }
        
        for j in 1...i { // 중심부가 값이 아닌 경우 ex) aa|aa
            guard i-j >= 0 && i+j-1 < arr.count else { break }
            guard arr[i-j] == arr[i+j-1] else { break }
            
            if j*2 > answer {
                answer = j*2
            }
        }
    }
    
    return answer
}

let s1 = "abcdcba"
print(solution(s1))
print(7)

let s2 = "abacde"
print(solution(s2))
print(3)

let s3 = "aaaaaa"
print(solution(s3))
print(6)

let s4 = "aabdc"
print(solution(s4))
print(2)

