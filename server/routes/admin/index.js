module.exports = app =>{
  const express = require('express')
  const router = express.Router()
  const assert = require('http-assert')
  const jwt = require('jsonwebtoken')
  const resourceMiddleware = require('../../middleware/resource')
  const authMiddleware = require('../../middleware/auth')

  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  router.get('/',async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find(req.body).setOptions(queryOptions).limit(100)
    res.send(items)
  })

  // 删除资源
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id)
    res.send({
      success: true
    })
  })
   // 更新资源
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

   // 资源详情
   router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })
  const multer = require('multer')
  const upload = multer({
    dest: __dirname + '/../../uploads',
  })
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 查找用户名
    const AsminUser = require('../../models/AdminUser')
    const user = await AsminUser.findOne({username}).select('+password')

    assert(user, 422, '用户不存在')
    // 匹配密码
    const isValid = require('bcryptjs').compareSync(password, user.password)

    assert(isValid, 422, '密码错误')
    // 返回token
    var token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })
  app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)
  // app.use(async (req, res,next) => {
  //   res.status(err.statusCode || 500 ).send({
  //     message: err.message
  //   })
  // })
}