const express = require('express');
const cors = require('cors');
const dbConnexion = require('./database/db');
const apiRoute = require('./routes')
const { jsonResponseMiddleware } = require('./middlewares/json-response.middleware');
const { errorHandlerMiddleware } = require('./middlewares/error-handler.middleware');

const app = express();

dbConnexion()

app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}));

app.use(express.json())

app.use(jsonResponseMiddleware)

app.use('/api', apiRoute)

app.use(errorHandlerMiddleware)

app.listen(process.env.API_PORT, () => console.log(`✔ : API server is running on port : ${process.env.API_PORT}`));