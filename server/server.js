const express = require("express");
const app = express();
const mysql = require("mysql2");

const db = require("./models");

const userRoute = require('./routes/User');
const chatRoute = require('./routes/Chat');

app.use('/users', userRoute);
app.use('/chat', chatRoute);


db.sequelize.sync().then((req) => {
    app.listen(5000, () => {
        console.log(`Server is listening to 5000`);
    })
})
