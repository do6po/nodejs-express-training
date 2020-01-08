const {Router} = require('express')
const Course = require('../models/course')
const router = Router()

router.post('/add', async (request, response) => {
    const course = await  Course.findById(request.body.id)

    await request.user.addToCart(course)

    return response.status(200).json({
        status: true
    })
    // response.redirect('/card')
})

router.get('/', async (request, response) => {
    const card = await Card.fetch()
    response.render('card', {
        title: 'Корзина',
        courses: card.courses,
        price: card.price
    })
})


router.delete('/remove/:id', async (request, response) => {
    const card = await Card.remove(request.params.id)

    response.status(200).json(card)

})
module.exports = router