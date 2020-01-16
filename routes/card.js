const {Router} = require('express')
const Course = require('../models/course')
const router = Router()
const auth = require('../middlewares/auth')

/**
 *
 * @param {Cart} cart
 */
function mapCartItems(cart) {
    return cart.items.map(c => ({
        ...c.courseId._doc,
        id: c.courseId.id,
        count: c.count
    }))
}

/**
 *
 * @param [Course] courses
 */
function computePrice(courses) {
    return courses.reduce((total, course) => {
        return total += course.price * course.count
    }, 0)
}

router.post('/add', auth, async (request, response) => {
    const course = await Course.findById(request.body.id)

    await request.user.addToCart(course)

    return response.redirect('/card')
})

router.get('/', async (request, response) => {
    const user = await request.user
        .populate('cart.items.courseId')
        .execPopulate()

    const courses = mapCartItems(user.cart)

    response.render('card', {
        title: 'Корзина',
        courses,
        price: computePrice(courses)
    })
})


router.delete('/remove/:id', auth, async (request, response) => {
    await request.user.removeFromCart(request.params.id)

    const user = await request.user.populate('cart.items.courseId').execPopulate()
    const courses = mapCartItems(user.cart)
    const cart = {
        courses, price: computePrice(courses)
    }

    response.status(200).json(cart)

})
module.exports = router