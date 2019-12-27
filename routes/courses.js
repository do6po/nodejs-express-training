const {Router} = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', async (request, response) => {

    const courses = await Course.getAll()

    response.render('courses', {
        'title': 'Список курсов',
        courses
    })
})

module.exports = router