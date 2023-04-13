function isCloserToStart(arg1: number, arg2: number, start: number, stop: number) {
  const isStartLessThanStop = start < stop;
  return arg1 < arg2 ? isStartLessThanStop : !isStartLessThanStop;
}

function lerp(start: number, stop: number, amount: number) {
  return (1.0 - amount) * start + amount * stop;
}

function map(startOut: number, stopOut: number, amount: number, startIn: number, stopIn: number) {
  if (isCloserToStart(amount, startIn, startIn, stopIn)) return startOut;
  if (isCloserToStart(stopIn, amount, startIn, stopIn)) return stopOut;
  const percentage = (amount - startIn) / (stopIn - startIn);
  return (1.0 - percentage) * startOut + percentage * stopOut;
}

/**
 * 将处于inIntervals的input线性映射到outIntervals中
 * @param outIntervals 分段值域，分段数（元素个数 - 1）需要为inIntervals分段数的整数倍
 * @param input 不知道咋叫
 * @param inIntervals 分段定义域，递增
 */
function mapPiecewise(outIntervals: number[], input: number, inIntervals: number[]) {
  // assert ...
  // 数组长度 >= 2
  // out段数是in的整数倍
  // in是从小到大排列

  if (input <= inIntervals[0]) return outIntervals[0];
  if (input >= inIntervals[inIntervals.length - 1]) return outIntervals[outIntervals.length - 1];

  let newInIntervals = inIntervals;

  // 统一分段数
  if (inIntervals.length < outIntervals.length) {
    newInIntervals = new Array(outIntervals.length);
    for (let indexOfOut = 0; indexOfOut < outIntervals.length; indexOfOut++) {
      let indexOfIn = indexOfOut * ((inIntervals.length - 1) / (outIntervals.length - 1));
      newInIntervals[indexOfOut] = indexOfIn % 1 === 0
        ? inIntervals[indexOfIn]
        : lerp(
          inIntervals[Math.floor(indexOfIn)],
          inIntervals[Math.ceil(indexOfIn)],
          indexOfIn - Math.floor(indexOfIn),
        );
    }
  }

  // 分段映射
  for (let i = 0; i < outIntervals.length - 1; i++) {
    // 找到input所在定义域（可否用库函数优化？）
    if (input > inIntervals[i + 1]) continue;
    return map(outIntervals[i], outIntervals[i + 1], input, inIntervals[i], inIntervals[i + 1]);
  }
}

function lightness(val: number) {
  return mapPiecewise([0.72, 0.76, 0.72, 0.54, 0.52], val, [0, 100]);
}

function chroma(_: number) {
  return 0.2;
}

function hue(val: number) {
  return mapPiecewise([150, -20], val, [0, 100]);
}

export default function aqiColor(val: number) {
  return `oklch(${lightness(val)} ${chroma(val)} ${hue(val)})`;
}
