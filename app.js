require('dotenv').config();
const express = require('express');
const error = require('./middlewares/error');
const { sendJson } = require('./middlewares/generateResponse');
require('./config/dbConnections');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.response.sendJson = sendJson;

app.use('/', require('./routes/index.routes'));

app.use(error.converter);

app.listen(process.env.PORT || 3000, () =>{
    console.log("SERVER IS LISTENING ON http://localhost:3000");
});