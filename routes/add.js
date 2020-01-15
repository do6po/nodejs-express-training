const {Router} = require('express')
const router = Router()
const Course = require('../models/course')
const auth = require('../middlewares/auth')

router.get('/', auth, (request, response) => {
    response.render('add', {
        'title': 'Добавить курс'
    })
})

router.post('/', auth, async (request, response) => {

    const course = new Course({
        title: request.body.title,
        price: request.body.price,
        img: request.body.img,
        userId: request.user
    })

    try {
        await course.save()
        return response.redirect('/courses')
    } catch (e) {
        console.log(e)
    }

    return response.redirect('/courses')
})

module.exports = router