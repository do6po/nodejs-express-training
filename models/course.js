const mongoose = require('mongoose')

/**
 * @property _id
 */
const course = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    img: String,

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

course.method('toClient', function() {
    const course = this.toObject()

    course.id = course._id

    return course
})

module.exports = mongoose.model('Course', course)