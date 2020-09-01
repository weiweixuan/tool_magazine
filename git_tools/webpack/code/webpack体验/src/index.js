import sum, { reduce } from "../utils/utils";
import "./index.css";
import "./index.less"; // 字体图标

import "../iconfont/iconfont.css";

const res = sum(1, 2);

const result = reduce(2, 1);
// eslint-disable-next-line no-console
console.log(result, "result");
// eslint-disable-next-line no-console
console.log(res, "res");
