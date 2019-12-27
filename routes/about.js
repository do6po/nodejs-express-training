const {Router} = require('express')
const router = Router()

router.get('/', (request, response) => {
    response.render('about', {
        'title': 'О нас'
    })
})

module.exports = router