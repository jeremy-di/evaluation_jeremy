const Lesson = require("../database/models/lesson.model")
const { jsonError, jsonSuccess } = require("../middlewares/json-response.middleware")

module.exports.createLesson = async (req, res, next) => {
    try {
        const body = req.body
        console.log(body)

        const existingLesson = await Lesson.findOne({title: body.title})

        if ( existingLesson ) {
            return res.jsonError(`A lesson is existing with the title : ${body.title}`, 409)
        }

        const newLesson = new Lesson({
            ...body
        })

        await newLesson.save()
        return res.jsonSuccess(newLesson, 200)
    } catch (error) {
        next(error)
    }
}

module.exports.getLessons = async (req, res, next) => {
    try {
        const lessons = await Lesson.find()
        res.jsonSuccess(lessons, 200)
    } catch (error) {
        next(error)
    }
}

module.exports.getOneLesson = async (req, res, next) => {
    try {
        const lesson = await Lesson.findById(req.params.id)

        if ( !lesson ) {
            return res.jsonError(`Lesson with the id : ${req.params.id} is not found`, 404)
        }

        return res.jsonSuccess(lesson, 200)
    } catch (error) {
        next(error)
    }
}

module.exports.deleteOneLesson = async (req, res, next) => {
    const lesson = await Lesson.findByIdAndDelete(req.params.id)

    if ( !lesson ) {
        return res.jsonError(`Lesson with the id : ${req.params.id} doesn't not exist`, 404)
    }

    return res.jsonSuccess(lesson, 200)
}