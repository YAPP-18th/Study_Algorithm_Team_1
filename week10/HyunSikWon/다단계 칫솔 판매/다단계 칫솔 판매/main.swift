//
//  main.swift
//  다단계 칫솔 판매
//
//  Created by 원현식 on 2021/05/06.
//

import Foundation

func solution(_ enroll:[String],
              _ referral:[String],
              _ seller:[String],
              _ amount:[Int]) -> [Int] {
  
  var answer: [String: Int] = [:]
  var relations: [String: String] = [:]
  
  relations["center"] = "-"
  for i in 0..<enroll.count {
    answer[enroll[i]] = 0
    if referral[i] == "-"  {
      relations[enroll[i]] = "center"
    } else {
      relations[enroll[i]] = referral[i]
    }
  }
  
  for i in 0..<seller.count {
    var seller = seller[i]
    var amount = amount[i]*100
    
    // center는 구할 필요 없음.
    while relations[seller] != "-" {
      let refer = relations[seller]! // 추천인
      if amount < 10 {
        answer[seller]! += amount
        break
      } else {
        let yours = Int((Double(amount)*0.1))
        answer[seller]! += amount - yours // 내 몫
        amount = yours
      }
      seller = refer
    }
    
  }
  
  var result = [Int]()
  for seller in enroll { result.append(answer[seller]!) }
  
  return result
}
