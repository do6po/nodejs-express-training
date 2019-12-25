const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

//Регистрация движка в приложении
app.engine('hbs', hbs.engine)
//Использование шаблонизатора
app.set('view engine', 'hbs')
//Настройка каталога шаблонов
app.set('views', 'views')

app.use(express.static('public'))

app.get('/', (request, response) => {
    response.render('index', {
        'title': 'Главная страница'
    })
})

app.get('/add', (request, response) => {
    response.render('add', {
        'title': 'Добавить курс'
    })
})

app.get('/courses', (request, response) => {
    response.render('courses', {
        'title': 'Список курсов'
    })
})

app.get('/about', (request, response) => {
    response.render('about', {
        'title': 'О нас'
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is  running on port ${PORT}`)
})