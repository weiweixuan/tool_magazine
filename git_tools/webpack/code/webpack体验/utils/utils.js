import $ from "jquery";

const sum = function sum(a, b) {
  // eslint-disable-next-line no-console
  console.log($, "Jquery");
  return a + b;
};

export function reduce(a, b) {
  return a - b;
}
export function cheng(a, b) {
  return a * b;
}

export default sum;
