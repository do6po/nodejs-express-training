const {Router} = require('express')
const Card = require('../models/card')
const Course = require('../models/course')
const router = Router()

router.post('/add', async (request, response) => {
    const course = await  Course.getById(request.body.id)
    await Card.add(course)

    response.redirect('/card')
})

router.get('/', async (request, response) => {
    const card = await Card.fetch()
    response.render('card', {
        title: 'Корзина',
        card
    })
})

module.exports = router