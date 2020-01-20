module.exports = function (request, response, next) {
    response.locals.isAuth = !!request.session.user
    response.locals.csrf = request.csrfToken()

    next()
}