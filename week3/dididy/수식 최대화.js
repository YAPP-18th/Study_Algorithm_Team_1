function permutation(arr, selectNum) {
  let result = [];
  if (selectNum === 1) return arr.map((v) => [v]);

  arr.forEach((v, idx, arr) => {
    const fixer = v;
    const restArr = arr.filter((_, index) => index !== idx);
    const permuationArr = permutation(restArr, selectNum - 1);
    const combineFixer = permuationArr.map((v) => [fixer, ...v]);
    result.push(...combineFixer);
  });

  return result;
}

function solution(expression) {
  let answer = 0;
  const operationPerm = permutation(['*', '-', '+'], 3);

  for (const each of operationPerm) {
    const regexOperator = /[*+-]/g;
    const regexNum = /[0-9]+/g;

    const numberArr = expression.split(regexOperator);
    const operatorArr = expression.split(regexNum).filter((each) => each);

    for (let i = 0; i < 2; i++) {
      while (operatorArr.includes(each[i])) {
        const index = operatorArr.indexOf(each[i]);

        numberArr[index] = eval(
          numberArr[index] + operatorArr[index] + numberArr[index + 1]
        );

        numberArr.splice(index + 1, 1);
        operatorArr.splice(index, 1);
      }
    }

    let tempExpression = '';
    while (operatorArr.length) {
      tempExpression += numberArr[0] + operatorArr[0];
      numberArr.shift();
      operatorArr.shift();
    }

    answer = Math.max(Math.abs(eval(tempExpression + numberArr[0])), answer);
  }

  return answer;
}
