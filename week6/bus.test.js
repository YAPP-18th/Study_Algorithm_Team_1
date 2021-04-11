const solution = (bridgeLength, weight, truckWeights) => {
  const bridge = Array(bridgeLength).fill(0);
  let [time, total] = [0, 0];
  let curtTruck = 0;

  for (let i = 0; total || truckWeights.length; i++) {
    let shiftTruck = bridge.shift();
    curtTruck = truckWeights[0];

    if (shiftTruck) {
      total -= shiftTruck;
    }

    if (total + curtTruck <= weight) {
      total += curtTruck;
      bridge.push(truckWeights.shift());
    } else {
      bridge.push(0);
      i--;
    }
    time++;
  }
  return time;
};
