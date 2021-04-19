//
//  main.swift
//  광고 삽입
//
//  Created by 원현식 on 2021/04/16.
//

import Foundation

func timeToSeconds(_ time: String) -> Int {
  let s = time.split(separator : ":").map{Int(String($0))!}
  return s[0]*3600 + s[1] * 60 + s[2]
}

func secToTimeString(_ sec: Int) -> String {
  var n = sec
  let s = n%60
  n /= 60
  
  let m = n%60
  n /= 60
  
  let h = n
  
  var result = ""
  if s < 10 {
    result += ":0\(s)"
  } else {
    result += ":\(s)"
  }
  
  
  if m < 10 {
    result = ":0\(m)" + result
  } else {
    result = ":\(m)" + result
  }
  
  if h < 10 {
    result = "0\(h)" + result
  } else {
    result = "\(h)" + result
  }
  
  return result
}

func solution(_ play_time:String, _ adv_time:String, _ logs:[String]) -> String {
  var timeLine = Array(repeating: 0, count: 360000)
  
  for log in logs {
    let splited = log.split(separator: "-").map{ String($0)}
    let start = timeToSeconds(splited[0])
    let end = timeToSeconds(splited[1])
    
    timeLine[start] += 1
    timeLine[end] -= 1
  }
  
  let adTime = timeToSeconds(adv_time)
  let playTime = timeToSeconds(play_time)
  
  // 구간별 누적 시청자 수
  for i in 1..<playTime {
    timeLine[i] += timeLine[i-1]
  }
  
  // 0~adTime 까지의 누적 시청자 수
  var sum = timeLine[0..<adTime].reduce(0,+)
  var max = sum
  var maxSec = 0
  var startPointer = 0
  
  for currentTime in adTime..<playTime {
    sum -= timeLine[startPointer]
    sum += timeLine[currentTime]
    startPointer += 1
    
    if sum > max {
      max = sum
      maxSec = startPointer
    }
  }
  
  return secToTimeString(maxSec)
}

print(solution("02:03:55", "00:14:15", ["01:20:15-01:45:14",
                                        "00:25:50-00:48:29",
                                        "00:40:31-01:00:00",
                                        "01:37:44-02:02:30",
                                        "98:30:59-98:53:29"]))


