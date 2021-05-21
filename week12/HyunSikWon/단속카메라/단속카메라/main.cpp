//
//  main.cpp
//  단속카메라
//
//  Created by 원현식 on 2021/05/21.
//

#include <iostream>
#include <algorithm>
#include <string>
#include <vector>

using namespace std;
bool compare(vector<int> a, vector<int> b) {
  return a[1] < b[1];
}

int solution(vector<vector<int>> routes) {
  int answer = 0;
  // 고속도로에서 빠져나가는 순서로 정렬
  sort(routes.begin(), routes.end(), compare);
  bool visible[10001] = {false};
  
  for (int i = 0; i < routes.size(); i++) {
    // 이미 카메라에 잡히는 경우
    if(visible[i]) continue;
    visible[i] = true;
    
    // 현재 고속도로에 있는 차의 수
    for (int j = i; j < routes.size(); j++) {
      if (routes[j][0] <= routes[i][1]) visible[j] = true;
    }

    answer++;
  }
  
  return answer;
}

int main(int argc, const char * argv[]) {
  cout << solution({{-20,15}, {-14,-5}, {-18,-13}, {-5,-3}}) << '\n';
  cout << 2 << '\n';
  return 0;
}
