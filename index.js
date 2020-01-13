const express = require('express')
const env = require(`dotenv`)
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const ordersRoutes = require('./routes/orders')
const coursesRoutes = require('./routes/courses')
const aboutRoutes = require('./routes/about')
const cardRoutes = require('./routes/card')
const authRoutes = require('./routes/auth')

const User = require('./models/user')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

env.config()

//Регистрация движка в приложении
app.engine('hbs', hbs.engine)
//Использование шаблонизатора
app.set('view engine', 'hbs')
//Настройка каталога шаблонов
app.set('views', 'views')

app.use(async (request, response, next) => {
    try {
        request.user = await User.findOne({
            email: "box@example.com"
        })
        next()
    } catch (e) {
        console.log(e)
    }

})

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({extended: true}))
app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/about', aboutRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3000

const MONGO_ADDRESS = process.env.MONGO_ADDRESS
const MONGO_PORT = process.env.MONGO_PORT
const MONGO_USER = process.env.MONGO_USER
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_DATABASE = process.env.MONGO_DATABASE

const mongoConnectUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_ADDRESS}:${MONGO_PORT}/${MONGO_DATABASE}`;

mongoose.connect(mongoConnectUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(async () => {

        const candidate = await User.findOne()

        if (!candidate) {
            const user = new User({
                email: 'box@example.com',
                name: 'username',
                cart: {items: []}
            })

            await user.save()
        }

        app.listen(PORT, () => {
            console.log(`Server is  running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })