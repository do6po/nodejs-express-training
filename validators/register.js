const {body} = require('express-validator')

exports.registerValidator = [
    body('email', 'Введите корректный email.')
        .isEmail(),

    body('rpassword', 'Пароль должен быть минимум 6 символов.')
        .isLength({min: 6, max: 56}),

    body('confirm')
        .custom((value, {req}) => value === req.body.rpassword)
        .withMessage('Пароли должны совпадать.'),

    body('name', 'Имя должно быть минимум 3 символа.')
        .isLength({min: 3})
]