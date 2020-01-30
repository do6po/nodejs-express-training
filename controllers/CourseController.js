const Course = require('../models/course')
const {validationResult} = require('express-validator')

class CourseController {

    async index(req, res) {
        const courses = await Course.find().populate('userId', 'email name')

        return res.render('courses', {
            'title': 'Список курсов',
            courses
        })
    }

    async show(req, res) {
        const course = await Course.findById(req.params.id)

        return res.render('course', {
            layout: 'empty',
            title: `Курс ${course.title}`,
            course
        })
    }

    async create(req, res) {
        const errors = validationResult(req).array()
        console.log(errors)
        return res.render('add', {
            title: 'Добавить курс',
            form: req.body,
            error: errors.length
                ? errors.shift()
                : ''
        })
    }

    async store(req, res) {
        if (!validationResult(req).isEmpty()) {
            return this.create(req, res.status(422))
        }

        const course = new Course({
            title: req.body.title,
            price: req.body.price,
            img: req.body.img,
            userId: req.user
        })

        try {
            await course.save()
            return res.redirect('/courses')
        } catch (e) {
            console.log(e)
        }

        return res.redirect('/courses')
    }

    async edit(req, res) {
        const course = await Course.findById(req.params.id)

        return res.render('course-edit', {
            title: `Редактировать ${course.title}`,
            course
        })
    }

    async update(req, res) {
        if (!validationResult(req).isEmpty()) {
            return this.edit(req, res.status(422))
        }

        const course = await Course.findByIdAndUpdate(req.params.id, req.body)

        return res.redirect(`/courses/${course._id}/edit`)
    }

    async delete(req, res) {
        try {
            await Course.deleteOne({
                _id: req.params.id
            })
            return res.redirect('/courses')
        } catch (e) {
            console.log(e)
        }

        return res.redirect('/courses')
    }
}

module.exports = CourseController