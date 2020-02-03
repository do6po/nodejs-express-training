const User = require('../models/user')

class ProfileController {

    async show(req, res) {

        return res.render('profile', {
            title: "Профиль",
            isProfile: true,
            user: req.user.toObject()
        })
    }

    async update(req, res) {
        try {
            const user = await User.findById(req.user._id)

            const toChange = {name: req.body.name}

            console.log(req.file)

            if (req.file) {
                toChange.avatarUrl = req.file.path
            }

            Object.assign(user, toChange)
            await user.save()

            return res.redirect('/profile')
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = ProfileController