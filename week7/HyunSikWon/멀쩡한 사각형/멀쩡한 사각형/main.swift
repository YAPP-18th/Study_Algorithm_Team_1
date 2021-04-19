//
//  main.swift
//  멀쩡한 사각형
//
//  Created by 원현식 on 2021/04/14.
//

import Foundation

func gcd(_ a: Int, _ b: Int) -> Int64 {
  if a == 0 { return Int64(b)}
  return gcd(b%a, a)
}

func solution(_ W: Int, _ H: Int) -> Int64 {
  // 전체 사각형 - 잘린 사각형
  return Int64(W*H) - (Int64(W+H) - gcd(W, H))
}

print(solution(8, 12))
print(80)
