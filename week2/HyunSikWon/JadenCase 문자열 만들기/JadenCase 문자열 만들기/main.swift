//
//  main.swift
//  JadenCase 문자열 만들기
//
//  Created by 원현식 on 2021/03/08.
//

import Foundation

func solution(_ s: String) -> String {
    var arr = [] + s // 문자열을 char 배열로 만듬
    var answer = String(arr[0]).uppercased() // 첫 문자

    var flag = false // 공백 검사를 위한 flag
    for i in 1..<arr.count {
        guard arr[i] != " " else { // 문자가 공백이면 flag 값을 바꾸고 answer에 더한 후 continue
            flag = true
            answer += String(arr[i])
            continue
        }
        
        if flag == true { // 이전 문자가 공백이면 대문자로 변환
            answer += String(arr[i]).uppercased()
            flag = false
        } else { // 아니면 소문자로 변환
            answer += String(arr[i]).lowercased()
        }
    }
    
    return answer
}


let s1 = "3people unFollowed me"
print(solution(s1))
print("3people Unfollowed Me")

let s2 = "for the last week"
print(solution(s2))
print("For The Last Week")
