let str: string = 'hello,penny'
console.log(str)

function erdan(params: Array<number>): string {
  return params.join('')
}
erdan([1, 2, 3])

let fun = (x: number, y: number): number => {
  return x + y
}

let res: number = fun(1, 2)

let mySum: (x: number, y: number) => number = function(
  x: number,
  y: number
): number {
  return x + y
}

function reload(val: number | string): number | string {
  if ((<string>val).length > 0) {
    return (<string>val).length
  } else {
    return val
  }
}
