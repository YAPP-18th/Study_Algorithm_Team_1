function floyedWarshall(dist) {
  const len = dist.length;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      for (let k = 0; k < len; k++) {
        if (dist[j][k] > dist[j][i] + dist[i][k]) {
          dist[j][k] = dist[j][i] + dist[i][k];
        }
      }
    }
  }

  return dist;
}

function solution(n, s, a, b, fares) {
  const dist = Array.from(Array(n + 1), () => new Array(n + 1).fill(Infinity));

  for (let v = 1; v <= n; v++) {
    dist[v][v] = 0;
  }

  for (const [u, v, w] of fares) {
    dist[u][v] = w;
    dist[v][u] = w;
  }

  const fees = floyedWarshall(dist);

  let answer = Infinity;

  for (let i = 1; i <= n; i++) {
    answer = Math.min(fees[s][i] + fees[i][a] + fees[i][b], answer);
  }

  return answer;
}
