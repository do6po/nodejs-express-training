const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const session = require('express-session')
const csrf = require('csurf')
const flash = require('connect-flash')
const MongoStore = require('connect-mongodb-session')(session)
const helmet = require('helmet')
const compression = require('compression')

const routes = require('./routes/main')

const varMiddleware = require('./middlewares/variables')
const userMiddleware = require('./middlewares/user')
const errorMiddleware = require('./middlewares/error')
const fileMiddleware = require('./middlewares/file')

const app = require('./bootstrap/app')
const ENV = require('./bootstrap/env')

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

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

app.use(session({
    secret: ENV.KEY,
    resave: false,
    saveUninitialized: false,
    store
}))

app.use(fileMiddleware.single('avatar'))
app.use(csrf(null))
app.use(flash())
app.use(helmet()) //Настройка Хедеров
app.use(compression()) //Сжимание потока

app.use(varMiddleware)
app.use(userMiddleware)

for (const key in routes) {
    app.use(key, routes[key])
}

app.use(errorMiddleware)

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