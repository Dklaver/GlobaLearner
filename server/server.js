const express = require("express");
const app = express();
const cors = require('cors');
const { Server } = require("socket.io");

//user
const UserDal = require('./GlobalearnerDAL/UserManagerDal');
const UserManager = require('./GlobalearnerBLL/Models/UserManager');
const UserController = require('./GlobalearnerController/routes/User');

//Chat
const ChatDal = require('./GlobalearnerDAL/ChatManagerDal');
const ChatManager = require('./GlobalearnerBLL/Models/ChatManager');
const ChatController = require('./GlobalearnerController/routes/Chat');

//Message
const MessageManagerDal = require('./GlobalearnerDAL/MessageManagerDal');
const MessageManager = require('./GlobalearnerBLL/Models/MessageManager');
const MessageController = require('./GlobalearnerController/routes/Message');

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

//Message
let messageDal = new MessageManagerDal();
let messageBL = new MessageManager(messageDal);
let messageController = new MessageController(messageBL);

app.use('/users', userController.router);
app.use('/chat', chatController.router);
app.use('/message', messageController.router);

module.exports = app;

db.sequelize.sync().then((req) => {
    app.use(express.json());
    const server = app.listen(5000, () => {
        console.log(`Server is listening to 5000`);
    })
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:3000',
            optionsSuccessStatus: 200,
            credentials: true,
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log('user connected: '+ socket.id)

        socket.on("join_chat", (data) =>{
            const chatId = data.chatId;
            console.log("chatRoom chatId: " +chatId)
            socket.join(chatId)
            console.log(`User ${socket.id} joined chat ${chatId}`);
        })

        socket.on("send_message", (data) => {

            const senderId = socket.id;

            console.log('senderId: '+senderId)
            const chatId = data.chatId;
            const message = data.message;
            const timestamp = data.timestamp;
            // const token = data.token;

            io.to(chatId).emit("recieve_message", {message, senderId, timestamp})
            console.log("chatId Websocket: " + chatId + " chatMessage Websocket: " + message)


        })

        socket.on("leave_chat", (data) => {
            const chatId = data.chatId;
            socket.leave(chatId);
            console.log(`User ${socket.id} left chat ${chatId}`);
        });
    })
})


