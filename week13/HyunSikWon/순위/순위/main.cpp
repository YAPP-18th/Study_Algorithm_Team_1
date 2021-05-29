//
//  main.cpp
//  순위
//
//  Created by 원현식 on 2021/05/27.
//

#include <iostream>
#include <string>
#include <map>
#include <vector>

using namespace std;

int solution(int n, vector<vector<int>> results) {
  int answer = 0;
  int board[101][101] = {0, };
  
  for (vector<int> v: results) {
    int winner = v[0];
    int loser = v[1];
    
    board[winner][loser] = 1;
    board[loser][winner] = -1;
  }
  
  for (int k = 1; k <= n; k++) {
    for (int i = 1; i <= n; i++) {
      for (int j = 1; j <= n; j++) {
        if (i == j) continue;
        
        // 실력이 i > k > j 인 경우
        if (board[i][k] == 1 && board[k][j] == 1) {
          board[i][j] = 1;
          
        // 실력이 j > k > i 인 경우
        } else if (board[i][k] == -1 && board[k][j] == -1) {
          board[i][j] = -1;
        }
      }
    }
  }
 
  for (int i = 1; i <= n; i++) {
    int cnt = 0;
    for (int j = 1; j <= n; j++) {
      if(board[i][j] != 0) cnt++;
    }
    // 모든 선수와 경기를 끝내서 결과가 나온 경우
    if (cnt == n-1) answer++;
  }
  
  return answer;
}

int main(int argc, const char * argv[]) {
  // insert code here...
  cout << solution(5, {{4, 3}, {4, 2}, {3, 2}, {1, 2}, {2, 5}}) << '\n';
  cout << 2 << '\n';
  return 0;
}
