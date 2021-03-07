//
//  main.swift
//  메뉴 리뉴얼
//
//  Created by 원현식 on 2021/03/01.
//

import Foundation

func solution(_ orders:[String], _ course:[Int]) -> [String] {
    var menuCount = [String: Int]() // 해당 메뉴 구성이 몇번 주문되었는지 기록
    
    // 모든 메뉴 구성의 경우의 수를 구한다
    for order in orders {
        let temp = [] + order
        
        // 비트 연산을 통해 경우의 수 구함
        for i in 2..<Int(pow(2.0, Double(temp.count))) {
            var arr = [String.Element]()
            for j in 0..<temp.count {
                if i & (1 << j) != 0 {
                    arr.append(temp[j])
                }
            }
                        
            var menu = ""
            arr.sorted().forEach { (char) in
                menu += String(char)
            }
            
            if menuCount[menu] == nil {
                menuCount[menu] = 1
            } else {
                menuCount[menu]! += 1
            }
        }
    }
    
    // 위에서 구한 것들 중 두명 이상이 주문했고, 단품 메뉴의 갯수가 course에 포함되는 메뉴 구성을 고른다.
    let filteredAndSortedMenuDictionary = menuCount
        .filter{ $0.value >= 2 && course.contains($0.key.count)}
        .sorted { (menu1, menu2) -> Bool in
        if menu1.key.count == menu2.key.count {
            return menu1.value > menu2.value
        } else {
            return menu1.key.count > menu2.key.count
        }
    }
    
    
    // 마무리 작업. 포함된 메뉴의 갯수가 같은 코스 중, 가장 많이 주문된 코스를 골라 최종 결과 배열에 삽입. 갯수가 같으면 모두 넣는다.
    var result = [String]()
    var formerMenu = ""
    var maxCount = 0
    filteredAndSortedMenuDictionary.forEach { (menu) in
        if result.isEmpty {
            result.append(menu.key)
            formerMenu = menu.key
            maxCount = menu.value
        } else {
            if formerMenu.count == menu.key.count {
                if maxCount == menu.value {
                    result.append(menu.key)
                }
                
            } else {
                result.append(menu.key)
                formerMenu = menu.key
                maxCount = menu.value
            }
            
            
        }
        
    }

    
    // 출력 조건: 오름차순 정렬
    return result.sorted()
}

// 입출력 예
// 1
let orders1 = ["ABCFG", "AC", "CDE", "ACDE", "BCFG", "ACDEH"]
let course1 = [2, 3, 4]

print("------1------")
print(solution(orders1, course1))
print(["AC", "ACDE", "BCFG", "CDE"])

// 2
print("\n------2------")
let orders2 = ["ABCDE", "AB", "CD", "ADE", "XYZ", "XYZ", "ACD"]
let course2 = [2, 3, 5]

print(solution(orders2, course2))
print(["ACD", "AD", "ADE", "CD", "XYZ"])

