class ProfileController {
    async show(req, res) {

        return res.render('profile', {
            title: "Профиль",
            isProfile: true,
            user: req.user.toObject()
        })
    }

    async update(req, res) {

    }
}

module.exports = ProfileController