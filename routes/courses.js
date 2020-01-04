const {Router} = require('express')
const Course = require('../models/course')
const router = Router()

router.get('/', async (request, response) => {

    const courses = await Course.find().populate('userId', 'email name')

    response.render('courses', {
        'title': 'Список курсов',
        courses
    })
})

router.get('/:id', async (request, response) => {
    const course = await Course.findById(request.params.id)

    response.render('course', {
        layout: 'empty',
        title: `Курс ${course.title}`,
        course
    })
})

router.get('/:id/edit', async (request, response) => {
    // if (!request.query.allow) {
    //     return response.redirect('/')
    // }

    const course = await Course.findById(request.params.id)

    response.render('course-edit', {
        title: `Редактировать ${course.title}`,
        course
    })
})

router.post('/:id/edit', async (request, response) => {
    const course = await Course.findByIdAndUpdate(request.params.id, request.body)

    response.redirect(`/courses/${course._id}/edit`)
})


router.post('/:id/delete', async (request, response) => {
    try {
        await Course.deleteOne({
            _id: request.params.id
        })
        response.redirect('/courses')
    } catch (e) {
        console.log(e)
    }

})

module.exports = router