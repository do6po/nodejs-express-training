module.exports = function (request, response, next) {
    if (!request.session.user) {
        return response.redirect('/auth/login')
    }

    return next()
}