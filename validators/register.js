const {body} = require('express-validator')
const User = require('../models/user')

exports.registerValidator = [
    body('email')
        .isEmail()
        .withMessage('Введите корректный email.')
        .custom(async (value) => {
            try {
                if (await User.findOne({email: value})) {
                    return Promise.reject('Такой email уже занят')
                }
            } catch (e) {
                console.log(e)
            }
        })
        .normalizeEmail(),

    body('rpassword', )
        .isLength({min: 6, max: 56}).withMessage('Пароль должен быть минимум 6 символов.')
        .trim(),

    body('confirm')
        .custom((value, {req}) => value === req.body.rpassword)
        .withMessage('Пароли должны совпадать.')
        .trim(),

    body('name')
        .isLength({min: 3}).withMessage('Имя должно быть минимум 3 символа.')
        .trim()
]