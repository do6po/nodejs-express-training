const r = require('app-root-path').require
const mongoose = require('mongoose')
const Course = r('/models/course')


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    avatarUrl: String,
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

/**
 *
 * @param {Course} course
 * @returns {void|Promise|*}
 */
userSchema.methods.addToCart = function (course) {
    const items = [...this.cart.items]
    const index = items.findIndex(c => {
        return c.courseId.toString() === course._id.toString()
    })

    if (index >= 0) {
        items[index].count++
    } else {
        items.push({
            courseId: course._id,
            count: 1
        })
    }

    this.cart = {items}

    return this.save()
}

/**
 *
 * @param {String} id
 */
userSchema.methods.removeFromCart = function (id) {
    let items = [...this.cart.items]
    const index = items.findIndex(c => {
        return c.courseId.toString() === id.toString()
    })

    if (items[index].count === 1) {
        items = items.filter(c => c.courseId.toString() !== id.toString())
    } else {
        items[index].count--
    }

    this.cart = {items}

    return this.save()
}

userSchema.methods.clearCart = function () {
    this.cart = {items: []}

    return this.save()
}

module.exports = mongoose.model('User', userSchema)