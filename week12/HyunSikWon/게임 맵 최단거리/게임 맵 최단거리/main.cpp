//
//  main.cpp
//  게임 맵 최단거리
//
//  Created by 원현식 on 2021/05/18.
//

#include <iostream>
#include<vector>
#include<queue>
using namespace std;

struct Node {
  int y;
  int x;
  int dist;
};

int solution(vector<vector<int> > maps)
{
  int answer = -1;
  const int n = maps.size();
  const int m = maps[0].size();
  int dx[4] = { -1, 0, 1, 0 };
  int dy[4] = { 0, 1, 0, -1 };
  
  vector<vector<bool>> visited(n, vector<bool>(m));
  queue<Node> q;
  
  q.push({0, 0, 1});
  visited[0][0] = true;
  
  while (!q.empty()) {
    Node pos = q.front();
    q.pop();
    
    // 현재 노드
    int currentX = pos.x;
    int currentY = pos.y;
    int currentDistance = pos.dist;
    
    if (currentY == n-1 && currentX == m-1) {
      answer = currentDistance;
      return answer;
    }
    
    for (int i = 0; i < 4; ++i) {
      int x = currentX + dx[i];
      int y = currentY + dy[i];
      
      // 조건(벽, 범위, 방문)
      if (y < 0 || y >= n || x < 0 || x >= m) continue;
      if (maps[y][x] == 0) continue;
      if (visited[y][x]) continue;
      
      q.push({y, x, currentDistance + 1});
      visited[y][x] = true;
    }
  }
  
  return answer;
}

int main(void) {
  vector<vector<int>> maps = {{1, 0, 1, 1, 1}, {1, 0, 1, 0, 1}, {1, 0, 1, 1, 1}, {1, 1, 1, 0, 1}, {0, 0, 0, 0, 1}};
  cout << solution(maps) << '\n';
  cout << 11 << '\n';
}
