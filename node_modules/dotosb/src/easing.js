const step = (x) => x >= 1 ? 1 : x;
const linear = (x) => x;
const quadIn = (x) => x * x;
const quadOut = (x) => reverse(quadIn, x);
const quadInOut = (x) => toInOut(quadIn, x);
const cubicIn = (x) => x * x * x;
const cubicOut = (x) => reverse(cubicIn, x);
const cubicInOut = (x) => toInOut(cubicIn, x);
const quartIn = (x) => x * x * x * x;
const quartOut = (x) => reverse(quartIn, x);
const quartInOut = (x) => toInOut(quartIn, x);
const quintIn = (x) => x * x * x * x * x;
const quintOut = (x) => reverse(quintIn, x);
const quintInOut = (x) => toInOut(quintIn, x); 
const sineIn = (x) => 1 - Math.cos((x * Math.PI) / 2);
const sineOut = (x) => reverse(sineIn, x);
const sineInOut = (x) => toInOut(sineIn, x);
const expoIn = (x) => Math.pow(2, 10 * (x - 1));
const expoOut = (x) => reverse(expoIn, x);
const expoInOut = (x) => toInOut(expoIn, x);
const circIn = (x) => 1 - Math.sqrt(1 - x * x);
const circOut = (x) => reverse(circIn, x);
const circInOut = (x) => toInOut(circIn, x);
const backIn = (x) => x * x * ((1.70158 + 1) * x - 1.70158);
const backOut = (x) => reverse(backIn, x);
const backInOut = (x) =>
  toInOut((y) => y * y * ((1.70158 * 1.525 + 1) * y - 1.70158 * 1.525), x);
const bounceIn = (x) => reverse(bounceOut, x);
const bounceOut = (x) =>
  x < 1 / 2.75
    ? 7.5625 * x * x
    : x < 2 / 2.75
    ? 7.5625 * (x -= 1.5 / 2.75) * x + 0.75
    : x < 2.5 / 2.75
    ? 7.5625 * (x -= 2.25 / 2.75) * x + 0.9375
    : 7.5625 * (x -= 2.625 / 2.75) * x + 0.984375;
const bounceInOut = (x) => toInOut(bounceIn, x);
const elasticIn = (x) => reverse(elasticOut, x);
const elasticOut = (x) =>
  Math.pow(2, -10 * x) * Math.sin(((x - 0.075) * (2 * Math.PI)) / 0.3) + 1;
const elasticInOut = (x) => toInOut(elasticIn, x);

const functions = [
  linear,
  quadIn,
  quadOut,
  quadInOut,
  cubicIn,
  cubicOut,
  cubicInOut,
  quartIn,
  quartOut,
  quartInOut,
  quintIn,
  quintOut,
  quintInOut,
  sineIn,
  sineOut,
  sineInOut,
  expoIn,
  expoOut,
  expoInOut,
  circIn,
  circOut,
  circInOut,
  backIn,
  backOut,
  backInOut,
  bounceIn,
  bounceOut,
  bounceInOut,
  elasticIn,
  elasticOut,
  elasticInOut,
];

function ease(easing, value) {
  return functions[easing].call(this, value);
}

function reverse(func, value) {
  return 1 - func.call(1 - value);
}

function toInOut(func, value) {
  return 0.5 * (value < 0.5 ? func(2 * value) : 2 - func(2 - 2 * value));
}

module.exports = { ease };