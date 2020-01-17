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

        request.user = await User.findOne({
            email: "box@example.com"
        })

        request.session.isAuthenticated = true

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
            const {email, name, password, confirm} = request.body
            const candidate = await User.findOne({email})

            if (candidate) {
                return response.redirect('/auth/login#register')
            }

            const user = new User({
                email,
                name,
                password,
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