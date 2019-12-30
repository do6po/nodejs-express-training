const uuid = require('uuid/v4')
const fs = require('fs')
const path = require('path')

class Course {

    id;
    title;
    price;
    img;

    constructor(attributes) {
        this.id = uuid()

        this.fill(attributes)
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            price: this.price,
            img: this.img,
        }
    }

    async save() {
        const courses = await Course.getAll()

        const index = courses.findIndex(c => c.id === this.id)
        console.log(index)

        if (index !== undefined) {
            courses[index] = this.toJSON()
        } else {
            courses.push(this.toJSON())
        }

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    fill(attributes) {
        for (const attribute in attributes) {

            if (attribute in this) {
                this[attribute] = attributes[attribute]
            }
        }

        return this
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, content) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content))
                    }

                }
            )
        })
    }

    static async getById(id) {
        const courses = await Course.getAll()

        const course = courses.find(c => c.id === id)

        return course ? new Course(course) : null
    }
}

module.exports = Course