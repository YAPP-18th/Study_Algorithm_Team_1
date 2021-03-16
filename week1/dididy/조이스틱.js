function controlVertical(name) {
  return name.split('').map((each) => {
    let pos = parseInt(each.charCodeAt()) - 65;
    if (pos > 13) {
      pos = 26 - pos;
    }

    return pos;
  });
}

function controlLeft(posArr, checkCount) {
  for (let i = 1; i < posArr.length; i++) {
    if (posArr[i] != 0) {
      break;
    }

    checkCount--;
  }

  return checkCount;
}

function controlRight(posArr, checkCount) {
  for (let i = posArr.length - 1; i > 0; i--) {
    if (posArr[i] != 0) {
      break;
    }

    checkCount--;
  }

  return checkCount;
}

function controlBoth(posArr, checkCount) {
  let index = 0;
  let curCount = 0;
  let count = 0;

  for (let i = 1; i < posArr.length; i++) {
    if (posArr[i] != 0) {
      count = 0;
      continue;
    }

    count++;

    if (curCount < count) {
      index = i;
      curCount = count;
    }
  }

  checkCount += index - curCount * 2;

  return checkCount;
}

function solution(name) {
  const posArr = controlVertical(name);

  const checkCount = posArr.reduce((a, b) => a + b) + posArr.length - 1;

  const moveLeft = controlLeft(posArr, checkCount);
  const moveRight = controlRight(posArr, checkCount);
  const moveBoth = controlBoth(posArr, checkCount);

  return Math.min(moveLeft, moveRight, moveBoth);
}

/*

## How
문제 자체는 주어진 문자열을 완성하도록 최소로 이동하는 횟수를 구하는 문제였다.

각 자리수의 알파벳을 고르는 부분을 각 자리별로 구하고 오른쪽, 왼쪽으로 이동하는 부분을 구하여 더하면 총 이동 횟수가 된다.

문제에서 제대로 주어지지 않은 부분이 있는데 오른쪽, 왼쪽으로 이동하는 경우와 더불어 한 가지 경우가 더 존재한다. 맨 오른쪽으로 계속 가서 처음으로 되돌아오는 것은 불가능하지만 맨 처음에서 맨 오른쪽으로 이동하는 것은 가능하다.

즉, 세 가지 경우 중 가장 작은 이동 횟수를 구하여 알파벳을 고를 때의 총 이동 횟수에 이를 더하면 된다.

## Retrospective


*/
