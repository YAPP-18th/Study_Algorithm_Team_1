function solution(number, k) {
  const stack = [];

  const numbers = number.split('').map((each) => each * 1);

  numbers.forEach((each) => {
    while (k > 0 && stack.slice(-1)[0] < each) {
      stack.pop();
      k--;
    }
    stack.push(each);
  });

  // number = "54321", k = 4의 형태로 입력이 주어진 경우
  return stack.slice(0, stack.length - k).join('');;
}
