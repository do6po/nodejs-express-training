const express = require('express')
const env = require(`dotenv`)
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const ordersRoutes = require('./routes/orders')
const coursesRoutes = require('./routes/courses')
const aboutRoutes = require('./routes/about')
const cardRoutes = require('./routes/card')
const authRoutes = require('./routes/auth')

const varMiddleware = require('./middlewares/variables')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

env.config()

const PORT = process.env.PORT || 3000

const MONGO_ADDRESS = process.env.MONGO_ADDRESS
const MONGO_PORT = process.env.MONGO_PORT
const MONGO_USER = process.env.MONGO_USER
const MONGO_PASSWORD = process.env.MONGO_PASSWORD
const MONGO_DATABASE = process.env.MONGO_DATABASE

const mongoConnectUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_ADDRESS}:${MONGO_PORT}/${MONGO_DATABASE}`;

const store = new MongoStore({
    collection: 'sessions',
    uri: mongoConnectUrl
})

//Регистрация движка в приложении
app.engine('hbs', hbs.engine)
//Использование шаблонизатора
app.set('view engine', 'hbs')
//Настройка каталога шаблонов
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'some secret string',
    resave: false,
    saveUninitialized: false,
    store
}))

app.use(varMiddleware)

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/about', aboutRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)



mongoose.connect(mongoConnectUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(async () => {
        app.listen(PORT, () => {
            console.log(`Server is  running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })