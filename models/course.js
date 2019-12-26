const uuid = require('uuid/v4')
const fs = require('fs')
const path = require('path')

class Course {

    id;
    title;
    price;
    img;

    constructor(title, price, img) {
        this.price = price;
        this.img = img;
        this.title = title;
        this.id = uuid()
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
        courses.push(this.toJSON())

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
}

module.exports = Course