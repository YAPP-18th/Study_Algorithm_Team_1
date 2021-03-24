//
//  main.swift
//  영어 끝말잇기
//
//  Created by 원현식 on 2021/03/24.
//

import Foundation

func solution(_ n: Int, _ words: [String]) -> [Int] {
  var answer = [0, 0] // 최종 결과 배열.
  var cycle = 1 // 사이클 계산
  var usedWords = [String(words.first!.first!)] // 사용된 단어들
  var currentNumber = 0  // 현재 사람
  
  
  for word in words {
    guard !usedWords.contains(word) && (usedWords.last!.last! == word.first!) else {
      // 이미 나왔던 단어이거나, 끝말잇기가 아닌 경우.
      answer = [currentNumber+1, cycle]
      break
      
    }
    usedWords.append(word)
    if (currentNumber+1) % n == 0 {
      // 첫번째 사람 차례에 사이클+1
      cycle += 1
    }
    currentNumber = (currentNumber+1) % n
  }
  
  return answer
}

