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

router.get('/:id', async (request, response) => {
    const course = await Course.getById(request.params.id)

    response.render('course', {
        layout: 'empty',
        title: `Курс ${course.title}`,
        course
    })
})

module.exports = router