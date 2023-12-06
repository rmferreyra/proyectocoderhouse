const { Router } = require('express')
const ProductRouter = require('./api/products.router')
const CartRouter = require('./api/carts.router')
const HomeRouter = require('./home.router')
const UserRouter = require('./api/user.router')
const LoginRouter = require('./login.router')
const ChatRouter = require('./chat.router')
const AdminRouter = require('./admin.router')
const TestRouter = require('./api/test.router')
const LoggerTest = require('./api/loggerTest.router')
const PremiumRouter = require('./premium.router')

const router = Router()

router.use('/products', ProductRouter)

router.use('/carts', CartRouter)

router.use('/users', UserRouter)

router.use('/test', TestRouter)
router.use('/loggerTest', LoggerTest)

const home = Router()

home.use('/', HomeRouter)

home.use('/', LoginRouter)

home.use('/chatmessage', ChatRouter)

home.use('/admin', AdminRouter)

home.use('/premium', PremiumRouter)

module.exports = {
    api: router,
    home
}