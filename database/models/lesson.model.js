const { Schema, default: mongoose } = require("mongoose");

const lessonSchema = new Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    chaptersNumber : {
        type : Number,
        required : true
    },
    active : {
        type : Boolean,
        default : true,
        required : true
    },
}, {
    timestamps : true
})

const Lesson = mongoose.model('lesson', lessonSchema)

module.exports = Lesson