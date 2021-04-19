//
//  main.swift
//  파일명 정렬
//
//  Created by 원현식 on 2021/04/19.
//

import Foundation

// HEAD, NUMBER, TAIL 나누기
func divide(_ file: String) -> [String] {
  let fileChar = [] + file
  var divided = [String]()
  var index = 0

  // HEAD
  var temp = ""
  while index < fileChar.count {
    guard Int(String(fileChar[index])) == nil else {
      break
    }
    temp += String(fileChar[index])
    index += 1
  }
  divided.append(temp)
  
  // NUMBER
  temp = ""
  while index < fileChar.count {
    guard Int(String(fileChar[index])) != nil else {
      break
    }
    temp += String(fileChar[index])
    index += 1
  }
  divided.append(temp)

  // TAIL
  temp = ""
  while index < file.count {
    temp += String(fileChar[index])
    index += 1
  }
  divided.append(temp)

  return divided
}


func solution(_ files:[String]) -> [String] {
  var fileArr = Array(repeating: Array(repeating: "", count: 3), count: files.count)
  
  for i in 0..<files.count {
    let divided = divide(files[i])
    fileArr[i] = divided
  }
  
  fileArr.sort { (a, b) -> Bool in
    if a[0].lowercased() != b[0].lowercased() {
      return a[0].lowercased() < b[0].lowercased()
    }
    
    if Int(a[1])! != Int(b[1])! {
      return Int(a[1])! < Int(b[1])!
    }

    return false
  }
  
  var result = [String]()
  fileArr.forEach { (file) in
    let f = file.reduce("", +)
    result.append(f)
  }
  
  return result
}

print(solution(["img12.png", "img10.png", "img02.png", "img1.png", "IMG01.GIF", "img2.JPG"]))
print(["img1.png", "IMG01.GIF", "img02.png", "img2.JPG", "img10.png", "img12.png"])

print(solution(["F-5 Freedom Fighter", "B-50 Superfortress", "A-10 Thunderbolt II", "F-14 Tomcat"]))
print(["A-10 Thunderbolt II", "B-50 Superfortress", "F-5 Freedom Fighter", "F-14 Tomcat"])
