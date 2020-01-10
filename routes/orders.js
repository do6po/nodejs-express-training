const r = require('app-root-path').require
const {Router} = require('express')
const Order = r('/models/order')
const router = Router()


router.get('/', async (request, response) => {
    response.render('orders', {
        title: 'Заказы',
    })
})

router.post('/', async (request, response) => {
    response.redirect('/orders')
})

module.exports = router