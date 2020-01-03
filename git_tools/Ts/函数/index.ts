function reverse(val: string): string;
function reverse(val: number): number;
function reverse(val: string | number): number | string {
  if (typeof val === "string") {
    return val
      .split("")
      .reverse()
      .join("");
  } else {
    return String(val)
      .split("")
      .reverse()
      .join("");
  }
}
let res = reverse(456);
console.log(res, "res");

function getLength(something: string | number): number {
  if ((something as string).length) {
    return (something as string).length;
  } else {
    return something.toString().length;
  }
}
let res1 = getLength("abc");
let res2 = getLength(123);
console.log(res1, res2);
