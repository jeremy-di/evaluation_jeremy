const mongoose = require('mongoose');

const dbConnexion = () => {
    mongoose.connect(process.env.MONGO_SERVER)
        .then(() => {
            console.log("✔ : Connection to mongo established")
        })
        .catch(error => {
            console.log(error)
        })
}

module.exports = dbConnexion