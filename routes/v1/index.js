const { Router } = require("express");
const lessonRoute = require('./lesson.route')
const searhRoute = require('./search.route')


const router = Router()
router.use('/lesson', lessonRoute)
router.use('/search', searhRoute)

module.exports = router