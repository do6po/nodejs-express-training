const {body} = require('express-validator')

exports.courseValidator = [
    body('title')
        .isLength({min: 3}).withMessage('Минимальная длинна 3 символа')
        .trim(),

    body('price')
        .isNumeric().withMessage('Введите корректную цену.'),

    body('img')
        .isURL().withMessage('Введите корректный url'),
]