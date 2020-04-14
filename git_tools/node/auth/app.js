const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('ok')
})

app.listen(3001, () => {
  console.log('127.0.0.1:3001')
})
