const express = require('express')
const app = express();
app.get('/api/info', (req,res) => {
  res.json({
    name: "首页",
    age: 5,
    msg: "欢迎"
  })
})
app.listen("8082")