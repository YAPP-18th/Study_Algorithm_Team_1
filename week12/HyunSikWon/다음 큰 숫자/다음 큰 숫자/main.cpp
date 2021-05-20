//
//  main.cpp
//  다음 큰 숫자
//
//  Created by 원현식 on 2021/05/20.
//

#include <iostream>
#include <string>
#include <vector>
using namespace std;

// 1의 개수 구하기
int countOne(int n) {
  int i;
  for(i = 0; n != 0; i++) {
    n &= (n-1);
  }
  return i;
}

int solution(int n) {
  int cnt = countOne(n);
  while (1) {
    n++;
    if (countOne(n) == cnt) break;
  }
  return n;
}

int main(int argc, const char * argv[]) {
  
  cout << solution(10) << '\n';
  cout <<  10 << '\n';
  
  return 0;
}
