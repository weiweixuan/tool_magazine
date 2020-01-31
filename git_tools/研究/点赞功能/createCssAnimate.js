const fs = require('fs')
let cssFlag = ''
for (let i = 0; i < 1000; i++) {
  let X = Math.floor(Math.random() * 400)
  let Y = -Math.floor(Math.random() * 450 + 50)
  X = Math.random() > 0.5 ? X : -X
  cssFlag += `
    @keyframes box${i} {
      0% {
        transform: translate(-50%, -100%) scale(0);
        opacity: 1;
      }
      50%{
        opacity: 1;
      }
      100% {
        transform: translateY(${Y}px) scale(1);
        opacity:0.5;
      }
    }
    @keyframes img${i} {
      0% {
        transform: translate(-50%,-50%);
      }
      100% {
        transform: translateX(${X}px);
      }
    }
  `
}
fs.writeFileSync('./animate.css', cssFlag)
