//
//  main.swift
//  캐시
//
//  Created by 원현식 on 2021/03/30.
//

import Foundation

func solution(_ cacheSize: Int, _ cities: [String]) -> Int {
  if cacheSize == 0 { return cities.count*5 }
  
  var cache = [String]()
  var time = 0
  for city in cities {
    let current = city.lowercased()
    if cache.contains(current) { // hit
      time += 1
      for index in 0..<cache.count { //  cache 재조정(LRU)
        if cache[index] == current {
          cache.remove(at: index)
          cache.append(current)
          break
        }
      }
    } else { // miss
      time += 5
      if cache.count < cacheSize {
        cache.append(current)
      } else {
        cache.remove(at: 0) // LRU
        cache.append(current)
      }
    }
  }
  return time
}

let cacheSize = 1
let cities = ["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "Jeju", "Pangyo", "Seoul", "NewYork", "LA"]
print(solution(cacheSize, cities))


