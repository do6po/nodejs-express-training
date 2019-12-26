const {Router} = require('express')
const router = Router()
const Course = require('../models/course')


router.get('/', (request, response) => {
    response.render('add', {
        'title': 'Добавить курс'
    })
})

router.post('/', async (request, response) => {

    const course = new Course(
        request.body.title,
        request.body.price,
        request.body.img,
    )

    await course.save()

    response.redirect('/courses')
})

module.exports = router