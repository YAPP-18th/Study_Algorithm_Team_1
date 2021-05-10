//
//  main.swift
//  n개의 최소공배수
//
//  Created by 원현식 on 2021/05/06.
//

import Foundation

// 최대공약수
func gcd(_ a: Int, _ b: Int) -> Int {
  let r = a%b
  if r == 0 {
    return b
  } else {
    return gcd(b, r)
  }
}

func leastCommonMultiple(_ a: Int, _ b: Int) -> Int {
  return (a*b)/gcd(a, b)
}

func solution(_ arr:[Int]) -> Int {
  return arr.reduce(1) { leastCommonMultiple($0, $1) }
}
