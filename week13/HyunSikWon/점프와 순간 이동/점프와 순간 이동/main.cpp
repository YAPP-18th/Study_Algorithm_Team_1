//
//  main.cpp
//  점프와 순간 이동
//
//  Created by 원현식 on 2021/05/26.
//

#include <iostream>
using namespace std;

int solution(int n){
  int answer = 0;

  while(n > 0){
    if (n % 2 == 0){
      n /= 2;
    } else {
      n--; answer += 1;
      n /= 2;
    }
  }
  
  return answer;
}
int main(int argc, const char * argv[]) {
  cout << solution(6) << '\n';
  cout << 5 << '\n';
  
  return 0;
}
