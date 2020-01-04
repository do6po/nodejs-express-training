const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    require: true,
                    default: 0
                },
                courseId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Course',
                    require: true,
                }
            },
        ]
    }
})

module.exports = mongoose.model('User', userSchema)