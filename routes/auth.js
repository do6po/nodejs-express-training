const {Router} = require('express')
const router = Router()
const AuthController = require('../controllers/AuthController')

const auth = new AuthController()

router.get('/login', (request, response) => auth.signIn(request, response))
router.post('/login', (request, response) => auth.login(request, response))
router.get('/logout', (request, response) => auth.logout(request, response))
router.post('/register', (request, response) => auth.register(request, response))

module.exports = router