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

        const user = await User.findOne({
            email: request.body.email
        })

        if (!user) {
            return response.redirect('/auth/login#login')
        }

        request.session.user = {
            _id: user._id,
            email: user.email,
        }

        request.session.save(err => {
            if (err) {
                throw err
            }

            return response.redirect('/')
        })
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