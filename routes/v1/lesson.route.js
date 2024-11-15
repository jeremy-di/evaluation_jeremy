const { Router } = require("express")
const { createLesson, getLessons, getOneLesson, deleteOneLesson } = require("../../controllers/lesson.controllers")


const router = Router()

router.post('/new', createLesson)
router.get('/all', getLessons)
router.get('/:id', getOneLesson)
router.delete('/:id', deleteOneLesson)

module.exports = router