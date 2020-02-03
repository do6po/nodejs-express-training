const {Router} = require('express')
const auth = require('../middlewares/auth')
const router = Router()
const ProfileController = require('../controllers/ProfileController')

const profile = new ProfileController()

router.get('/', auth, async (req, res) => profile.show(req, res))
router.post('/', auth, async (req, res) => profile.update(req, res))

module.exports = router