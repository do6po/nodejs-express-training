const {Router} = require('express')
const router = Router()
const auth = require('../middlewares/auth')
const {courseValidator} = require('../validators/course')
const CourseController = require('../controllers/CourseController')

const course = new CourseController

router.get('/', async (req, res) => course.index(req, res))
router.get('/:id', async (req, res) => course.show(req, res))
router.get('/:id/edit', auth, async (req, res) => course.edit(req, res))
router.post('/:id/edit', courseValidator, auth, async (req, res) => course.update(req, res))
router.post('/:id/delete', async (req, res) => course.delete(req, res))

module.exports = router