const { Router } = require("express")
const { searchLesson } = require("../../controllers/search.controllers")


const router = Router()

router.get('/', searchLesson)

module.exports = router