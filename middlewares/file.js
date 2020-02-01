const multer = require('multer')
const ENV = require('../bootstrap/env')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, ENV.FILE_DIR)
    },
    filename(req, file, cb) {
        cb(null, new Date().toString() + '-' + file.originalname)
    }
})

const allowedTypes = [
    'image/png',
    'image/jpg',
    'image/jpeg',
]

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        return cb(null, true)
    }
    return cb(null, false)
}

module.exports = multer({
    storage,
    fileFilter
})