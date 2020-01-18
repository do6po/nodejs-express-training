const User = require('../models/user')
const bcrypt = require('bcryptjs')

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
            isLogin: true
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
                return response.redirect('/auth/login#login')
            }

            if (!await this._passwordCompare(password, user.password)) {
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
            const {remail, name, rpassword, confirm} = request.body
            const candidate = await User.findOne({
                email: remail
            })

            if (candidate) {
                return response.redirect('/auth/login#register')
            }

            const user = new User({
                email: remail,
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