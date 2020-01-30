const {Router} = require('express')
const router = Router()
const auth = require('../middlewares/auth')
const {courseValidator} = require('../validators/course')
const CourseController = require('../controllers/CourseController')

const course = new CourseController

router.get('/', auth, (req, res) => course.create(req, res))
router.post('/', courseValidator, auth, async (req, res) => course.store(req, res))

module.exports = router