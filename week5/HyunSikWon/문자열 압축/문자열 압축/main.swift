//
//  main.swift
//  문자열 압축
//
//  Created by 원현식 on 2021/03/29.
//

import Foundation

func compress(_ n: Int, _ s: String) -> Int {
  let character = [] + s
  var arr = [String]()
  
  for i in stride(from: 0, to: character.count, by: n){
    var temp = ""
    // n단위로 문자열을 나눈다.
    for j in i..<(i+n) {
      guard j < character.count else { break }
      temp += String(character[j])
    }
    // 나눠진 문자열을 배열에 추가
    arr.append(temp)
  }
  
  
  var compressed = ""
  var i = 0
  while i < arr.count {
    let index = i
    var count = 0
    // 같은 모양의 문자열 개수를 카운팅
    for j in index..<arr.count {
      guard arr[index] == arr[j] else { break }
      i += 1
      count += 1
    }
        
    if count == 1 {
      compressed += arr[index]
    } else {
      compressed += "\(count)\(arr[index])"
    }
    
  }
  
  return compressed.count
}

func solution(_ s: String) -> Int {
  // s의 길이가 2이하인 경우
  if s.count <= 2 {
    return s.count
  }
  
  var answer = s.count
  // 단위별로 압축.
  for n in 1...(s.count/2) {
    let lenght = compress(n, s)
    answer = lenght < answer ? lenght : answer
  }
  
  return answer
}

let s = "aa"
print(solution(s))
