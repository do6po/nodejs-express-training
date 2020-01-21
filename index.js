const express = require('express')
const env = require(`dotenv`)
const path = require('path')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const session = require('express-session')
const csrf = require('csurf')
const flash = require('connect-flash')
const MongoStore = require('connect-mongodb-session')(session)
const homeRoutes = require('./routes/home')
const addRoutes = require('./routes/add')
const ordersRoutes = require('./routes/orders')
const coursesRoutes = require('./routes/courses')
const aboutRoutes = require('./routes/about')
const cardRoutes = require('./routes/card')
const authRoutes = require('./routes/auth')

const varMiddleware = require('./middlewares/variables')
const userMiddleware = require('./middlewares/user')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

env.config()

const ENV = process.env

const mongoConnectUrl = `mongodb://${ENV.MONGO_USER}:${ENV.MONGO_PASSWORD}@${ENV.MONGO_ADDRESS}:${ENV.MONGO_PORT}/${ENV.MONGO_DATABASE}`;

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
    secret: ENV.KEY,
    resave: false,
    saveUninitialized: false,
    store
}))
app.use(csrf(null))
app.use(flash())

app.use(varMiddleware)
app.use(userMiddleware)

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
        app.listen(ENV.PORT, () => {
            console.log(`Server is  running on port ${ENV.PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })