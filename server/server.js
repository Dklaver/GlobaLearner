const express = require("express");
const app = express();
const mysql = require("mysql2");
const router = express.Router();
const cors = require('cors');


const db = require("./GlobalearnerController/models");

const userRoute = require('./GlobalearnerController/routes/User');
const chatRoute = require('./GlobalearnerController/routes/Chat');



const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use(cors(corsOptions));

app.use('/users', userRoute);
app.use('/chat', chatRoute);


db.sequelize.sync().then((req) => {
    app.listen(5000, () => {
        console.log(`Server is listening to 5000`);
    })
})
