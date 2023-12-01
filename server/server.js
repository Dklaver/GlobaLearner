const express = require("express");
const app = express();
const cors = require('cors');
const UserDal = require('./GlobalearnerDAL/UserManagerDal');
const UserManager = require('./GlobalearnerBLL/Models/UserManager');
const UserController = require('./GlobalearnerController/routes/User');

const db = require("./GlobalearnerDAL/models");

const chatRoute = require('./GlobalearnerController/routes/Chat');

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use(cors(corsOptions));
let userDal = new UserDal();
let userBL = new UserManager(userDal);
let userController = new UserController(userBL);

app.use('/users', userController.router);
app.use('/chat', chatRoute);

module.exports = app;

db.sequelize.sync().then((req) => {
    app.use(express.json());
    app.listen(5000, () => {
        console.log(`Server is listening to 5000`);
    })
})
