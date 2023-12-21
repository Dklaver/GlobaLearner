const express = require("express");
const app = express();
const cors = require('cors');
const { Server } = require("socket.io")

//user
const UserDal = require('./GlobalearnerDAL/UserManagerDal');
const UserManager = require('./GlobalearnerBLL/Models/UserManager');
const UserController = require('./GlobalearnerController/routes/User');

//Chat
const ChatDal = require('./GlobalearnerDAL/ChatManagerDal');
const ChatManager = require('./GlobalearnerBLL/Models/ChatManager');
const ChatController = require('./GlobalearnerController/routes/Chat');

const db = require("./GlobalearnerDAL/models");

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
};
app.use(cors(corsOptions));
//user
let userDal = new UserDal();
let userBL = new UserManager(userDal);
let userController = new UserController(userBL);

//chat
let chatDal = new ChatDal();
let chatBL = new ChatManager(chatDal)
let chatController = new ChatController(chatBL)

app.use('/users', userController.router);
app.use('/chat', chatController.router);

module.exports = app;

db.sequelize.sync().then((req) => {
    app.use(express.json());
    const server = app.listen(5000, () => {
        console.log(`Server is listening to 5000`);
    })
})
