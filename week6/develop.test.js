// 문제가 개편되었습니다. 이로 인해 함수 구성이나 테스트케이스가 변경되어, 과거의 코드는 동작하지 않을 수 있습니다.
// 새로운 함수 구성을 적용하려면 [코드 초기화] 버튼을 누르세요. 단, [코드 초기화] 버튼을 누르면 작성 중인 코드는 사라집니다.
const solution = (progresses, speeds) => {
  return getNumberOfReleaseDates(getRemainProgresses(progresses, speeds));
};

const getRemainProgresses = (progresses, speeds) => {
  return progresses.map((progress, index) => {
    return Math.ceil((100 - progress) / speeds[index]);
  });
};

const getNumberOfReleaseDates = (remainProgresses) => {
  let max = remainProgresses[0];
  return Object.values(
    remainProgresses.reduce((obj, current) => {
      max < current ? (max = current) : max;
      obj[max] = ++obj[max] || 1;
      return obj;
    }, {})
  );
};
