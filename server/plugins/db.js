module.exports = app => {
  // 引入mongoose
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/wzry', {
    useNewUrlParser: true
  })

  require('require-all')(__dirname + '/../models')
}