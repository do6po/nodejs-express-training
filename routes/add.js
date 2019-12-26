const {Router} = require('express')
const router = Router()

router.get('/', (request, response) => {
    response.render('add', {
        'title': 'Добавить курс'
    })
})

module.exports = router