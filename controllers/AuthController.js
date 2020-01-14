class AuthController {
    async signIn(request, response) {
        return response.render('auth/login', {
            title: 'Авторизация',
            isLogin: true
        })
    }

    async login(request, response) {
        request.session.isAuthenticated = true

        return response.redirect('/')
    }

    async logout(request, response) {
        await request.session.destroy()
        return response.redirect('/auth/login#login')
    }
}

module.exports = AuthController