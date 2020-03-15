"use strict";
function reverse(val) {
    if (typeof val === "string") {
        return val
            .split("")
            .reverse()
            .join("");
    }
    else {
        return String(val)
            .split("")
            .reverse()
            .join("");
    }
}
var res = reverse(456);
console.log(res, "res");
function getLength(something) {
    if (something.length) {
        return something.length;
    }
    else {
        return something.toString().length;
    }
}
var res1 = getLength("abc");
var res2 = getLength(123);
console.log(res1, res2);
