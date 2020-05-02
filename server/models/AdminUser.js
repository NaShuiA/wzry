const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String,
    select: false,
    set(val) {
      return require("bcryptjs").hashSync(val, 5)
    }
  },
  email: {
    type: String
  },
  mobile: {
    type: Number
  }
})

module.exports = mongoose.model('AdminUser', schema)