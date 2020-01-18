const User = require('../models/user')

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
            const user = await User.findOne({
                email: request.body.email
            })

            if (!user || user.password !== request.body.password) {
                return response.redirect('/auth/login#login')
            }

            request.session.user = (({_id, name}) => ({_id, name}))(user)

            request.session.save(err => {
                if (err) {
                    throw err
                }

                return response.redirect('/')
            })
        } catch (e) {
            console.log(e)
        }

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
                password: rpassword,
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
}

module.exports = AuthController