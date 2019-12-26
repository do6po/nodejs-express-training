const {Router} = require('express')
const router = Router()

router.get('/', (request, response) => {
    response.render('courses', {
        'title': 'Список курсов'
    })
})

module.exports = router