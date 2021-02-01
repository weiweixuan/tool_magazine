// 实现koa2 中间件的剥洋葱模型

let fnList = Array.from({ length: 10 }, (_, index) => {
  return async (ctx, next) => {
    ctx.count++;
    console.log(ctx.count);
    await next();
    console.log(ctx.count, '最后打印');
  };
});

function compose(list) {
  return (ctx) => {
    function dispatch(i = 0) {
      try {
        if (list[i]) {
          Promise.resolve(list[i](ctx, dispatch.bind(null, i + 1)));
        }
      } catch (error) {
        Promise.reject(error);
      }
    }
    dispatch();
  };
}

let result = compose(fnList);
result({ count: 100 });
