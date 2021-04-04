//
//  main.swift
//  순위 검색
//
//  Created by 원현식 on 2021/03/08.
//

/*
 
 1. 지원자가 검색될 수 있는 모든 쿼리 형태를 만든다.
 2. 1을통해 딕셔너리에 [언어+직군+경력+음식: [점수]] 형태로 넣어주고
 3. query 배열을 순회하면서 위와 같은 형태로 튜플을 만듬. (언어+직군+경력+음식, 점수)
 4. 새로 만든 쿼리(튜플)을 통해서 해당 쿼리로 검색되는 점수 배열을 얻어서.
 5. 이분탐색을 통해 기준 점수 이상의 지원자 수를 구함.
 
 
 */

import Foundation

func solution(_ info:[String], _ query:[String]) -> [Int] {
    var answer = [Int]()
    var applicants = [[String]]()
    var dic = [String: [Int]]()
    
    for i in info {
        applicants.append(i.components(separatedBy: " "))
    }

    // 해당 조건의 지원자가 조회될 수 있는 모든 쿼리문을 만든다.
    for applicant in applicants {
        for i in 0..<Int(pow(2.0, 4.0)) {
            var temp = ""
            for j in 0..<4 {
                if (i & (1 << j) != 0) {
                    temp += applicant[j]
                } else {
                    temp += "-"
                }
            }
            
            if dic[temp] == nil {
                dic[temp] = [Int(applicant[4])!]
            } else {
                dic[temp]!.append(Int(applicant[4])!)
            }
        }
    }
    
    // 점수 정렬
    for a in dic {
        let sorted = a.value.sorted()
        dic[a.key] = sorted
    }
    
    // 튜플 형태로 쿼리문을 점수와 문자열로 나눈다.
    // 딕셔너리의 key와 같은 형태로 만든다.
    var newQuery = [(str: String, score: Int)]()
    for q in query {
        var key = ""
        var temp = ""
        for char in q {
            guard char != " " else {
                if temp != "and" {
                    key += temp
                }
                temp = ""
                continue
            }
            temp += String(char)
        }
        newQuery.append((key, Int(temp)!))
    }
    
    for query in newQuery {
        // 해당 쿼리로 조회되는 지원자들의 점수 배열 이분 탐색
        if let scores = dic[query.str] {
            var start = 0
            var end = scores.count
            
            while start < end {
                let mid = (start + end) / 2
                if scores[mid] >= query.score {
                    end = mid
                } else {
                    start = mid + 1
                    
                }
            }
            answer.append(scores.count - start)
            
        } else {
            answer.append(0)
        }
        
    }
    
    return answer
}


// 입출력 예
let info = ["java backend junior pizza 150",
            "python frontend senior chicken 210",
            "python frontend senior chicken 150",
            "cpp backend senior pizza 260",
            "java backend junior chicken 80",
            "python backend senior chicken 50"]

let query = ["java and backend and junior and pizza 100",
             "python and frontend and senior and chicken 200",
             "cpp and - and senior and pizza 250",
             "- and backend and senior and - 150",
             "- and - and - and chicken 100",
             "- and - and - and - 150"]

print(solution(info, query))
print([1, 1, 1, 1, 2, 4])


