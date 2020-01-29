const {body} = require('express-validator')
const User = require('../models/user')

exports.registerValidator = [
    body('email', 'Введите корректный email.')
        .isEmail()
        .custom(async (value) => {
            try {
                if (await User.findOne({email: value})) {
                    return Promise.reject('Такой email уже занят')
                }
            } catch (e) {
                console.log(e)
            }
        }),

    body('rpassword', 'Пароль должен быть минимум 6 символов.')
        .isLength({min: 6, max: 56}),

    body('confirm')
        .custom((value, {req}) => value === req.body.rpassword)
        .withMessage('Пароли должны совпадать.'),

    body('name', 'Имя должно быть минимум 3 символа.')
        .isLength({min: 3})
]