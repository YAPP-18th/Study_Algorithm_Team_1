//
//  main.swift
//  셔틀버스
//
//  Created by 원현식 on 2021/03/24.
//

/*
하루동안의 셔틀 기록을 모두 구했습니다.
1. 먼저 운행하는 모든 셔틀 도착시간을 구한뒤,
2. 셔틀 수용인원과 크루 도착시간에 따라 해당 셔틀을 탄 크루들의 도착시간을 배열에 기록했습니다.
 2-1. 기다리는 크루가 없으면 빈 배열.
3. 주인공 콘은 막차에 턱걸이로 타면 되기 때문에 막차를 기준으로
 3-1. 막차에 자리가 있으면, 막차가 도착한 시간에만 가면된다.
 3-2. 막차에 자리가 없으면, 막차에 탄 사람들 중 가장 늦게 도착한 사람보다 1분 일찍오면 된다.
 
 전체 버스 운영 기록의 예시, 2번 테스트 케이스 기준.
 버스 도착시간은 각각 9:00, 9:10
 전체 기록: [["08:00"], ["09:09", "09:10"]]
 
 현재 코드는 반례에대한 처리를 했지만, 처리하지 않아도 정답처리가 되었습니다.
 반례 테스트 케이스, 10, 60, 45, ["9:00"] -> 답: 18:00
*/

import Foundation

extension String {
  // 문자열로 주어진 시간에서 t분 만큼 빼는 경우
  func subtractInterval(_ t: Int) -> String {
    let time = self.split(separator: ":").map{String($0)}
    var hour = Int(time[0])!
    var min = Int(time[1])!
    
    if min - t < 0 {
      hour -= 1
      min = 60 + (min-t)
    } else {
      min -= t
    }
    
    let hStr = hour < 10 ? "0\(hour)" : String(hour)
    let mStr = min < 10 ? "0\(min)" : String(min)
    
    return "\(hStr):\(mStr)"
  }
  // 문자열로 주어진 시간에서 t분 만큼 더하는 경우
  func addInterval(_ t: Int) -> String {
    let time = self.split(separator: ":").map{String($0)}
    var hour = Int(time[0])!
    var min = Int(time[1])!
    
    if min + t >= 60 {
      hour += 1
      min = (min+t)-60
    } else {
      min += t
    }
    
    let hStr = hour < 10 ? "0\(hour)" : String(hour)
    let mStr = min < 10 ? "0\(min)" : String(min)
    
    return "\(hStr):\(mStr)"
  }
  
  // 문자열로 주어진 시간을 값의 비교를 위해 정수형으로 변환
  func stringTimetoInt() -> Int {
    let time = self.split(separator: ":").map{String($0)}
    let str = time[0]+time[1]
    
    return Int(str)!
  }
}

// 전체 셔틀 도착시간
func makeShuttleBusTimeTable(_ t: Int, _ n: Int) -> [String] {
  var shuttleBusTimetable = ["09:00"]
  var shuttle = "09:00"
  for _ in 1..<n {
    shuttle = shuttle.addInterval(t)
    shuttleBusTimetable.append(shuttle)
  }
  return shuttleBusTimetable
}

func solution(_ n:Int, _ t:Int, _ m:Int, _ timetable:[String]) -> String {
  // 먼저 하루동안의 셔틀 도착 시간을 구하자.
  let shuttleBusTimetable = makeShuttleBusTimeTable(t, n)
  
  // 크루의 도착시간을 시간순으로 정렬
  let sortedTimetable = timetable.sorted{$0.stringTimetoInt() < $1.stringTimetoInt() }


  var crew = 0 // n번째 크루를 가리키는 인덱스
  var allShuttleLog = [[String]]()
  var shuttleBus = [String]()
  // 셔틀 도착시간
  for shuttlTime in shuttleBusTimetable {
    // 현재 셔틀에 탈 수 있는 크루를 고르자. 셔틀 도착시간보다 일찍온 사람은 셔틀이 꽉 차있지 않다면 셔틀을 탈 수 있다.
    while crew < sortedTimetable.count
            && shuttleBus.count < m
            && (sortedTimetable[crew].stringTimetoInt() <= shuttlTime.stringTimetoInt() ) {
      
      shuttleBus.append(sortedTimetable[crew])
      crew += 1
    }
    
    // 모든 멤버가 탔다면 종료
    if crew >= sortedTimetable.count {
      allShuttleLog.append(shuttleBus)
      
      // 전체 셔틀 기록을 위해
      for _ in 0..<(n-allShuttleLog.count) {
        allShuttleLog.append([])
      }
      
      break
    }
    // 셔틀이 꽉 찼거나, 셔틀을 기다리는 사람이 없는 경우 셔틀은 출발(removeAll)
    if shuttleBus.count == m || sortedTimetable[crew].stringTimetoInt() > shuttlTime.stringTimetoInt() {
      allShuttleLog.append(shuttleBus)
      shuttleBus.removeAll()
    }
    

    
  }
  print(allShuttleLog)
  var answer = "09:00"
  // 막차에 타면 된다.
  // 막차가 꽉 찼다면 -> 해당 차에서 가장 늦게 온 사람보다 1분 일찍오면 된다
  if allShuttleLog[n-1].count == m {
    let max = allShuttleLog[n-1].last!
    answer = max.subtractInterval(1)
    
  } else {
    answer = shuttleBusTimetable[n-1]
  }
  // 막차에 자리가 있다면 -> 해당 차가 도착한 시간에 맞춰오면 된다.
 
  
  return answer
}
