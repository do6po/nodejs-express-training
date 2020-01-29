const User = require('../models/user')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')

class AuthController {

    /**
     * Render login page
     *
     * @param request
     * @param response
     * @returns {Promise<void|undefined>}
     */
    async signIn(request, response) {
        return response.render('auth/login', {
            title: 'Авторизация',
            isLogin: true,
            registerError: request.flash('registerError'),
            loginError: request.flash('loginError'),
        })
    }

    /**
     * login method
     *
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    async login(request, response) {

        try {
            const {email, password} = request.body

            const user = await User.findOne({email})

            if (!user) {
                request.flash('loginError', 'Ошибка входа. Такого пользователя не существует.')

                return response.redirect('/auth/login#login')
            }

            if (!await this._passwordCompare(password, user.password)) {
                request.flash('loginError', 'Неверный пароль')

                return response.redirect('/auth/login#login')
            }

            request.session.user = (({_id, name}) => ({_id, name}))(user)

            await request.session.save()

            return response.redirect('/')
        } catch (e) {
            console.log(e)
        }

        return response.redirect('/')
    }

    /**
     * Logout method
     *
     * @param request
     * @param response
     * @returns {Promise<void|*|Response>}
     */
    async logout(request, response) {
        await request.session.destroy()
        return response.redirect('/auth/login#login')
    }

    async register(request, response) {
        try {
            const {email, name, rpassword, confirm} = request.body
            const candidate = await User.findOne({email})

            const errors = validationResult(request)

            if (!errors.isEmpty()) {
                request.flash('registerError', errors.array()[0].msg)

                return response.status(422).redirect('/auth/login#register')
            }

            if (candidate) {
                request.flash('registerError', 'Email занят.')

                return response.redirect('/auth/login#register')
            }

            const user = new User({
                email,
                name,
                password: await this._passwordHash(rpassword),
                cart: {
                    items: []
                }
            })

            await user.save()

            return response.redirect('/auth/login#login')
        } catch (e) {
            console.log(e)
        }
    }

    /**
     *
     * @param {String} password
     * @private
     */
    _passwordHash(password) {
        return bcrypt.hash(password, 10)
    }

    _passwordCompare(password, hash) {
        return bcrypt.compare(password, hash)
    }
}

module.exports = AuthController