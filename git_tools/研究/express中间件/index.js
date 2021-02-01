/*
      实现
      let app = express();
      app.use()
      app.get()
      app.post();
      app.listen();
    */

const express = require('./express');

let app = express();
app.use('/api/user', (req, res, next) => {
  next();
});
app.use(
  '/api/blog',
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    next();
  },
);
app.get('/api/blog/list', (req, res, next) => {
  console.log('访问了blog/list');
  res.json({ code: 200, data: '访问成功！' });
  next();
});
app.get('/api/blog/detail', (req, res, next) => {
  next();
});
app.post('/api/user/login', (req, res, next) => {
  next();
});

app.listen(8000, () => {
  console.log('port in 8000!');
});
