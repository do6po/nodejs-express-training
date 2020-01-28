const {body} = require('express-validator')

exports.registerValidators = [
    body('email', 'Введите корректный email.').isEmail(),
    body('password', 'Пароль должен быть минимум 6 символов.').isLength({min: 6, max: 56}),
    body('confirm').custom((value, {request}) => {
        if (value !== request.body.password) {
            throw new Error('Пароли должны совпадать.')
        }

        return true
    }),
    body('name', 'Имя должно быть минимум 3 символа.').isLength({min: 3})

]