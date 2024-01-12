const { Sequelize, DataTypes } = require("sequelize");
const MessageModel = require("./models/Message");

module.exports = class MessageManagerDal{
    constructor(){
        this.sequelize = new Sequelize({
            dialect: "mysql",
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        this.Message = MessageModel(this.sequelize, DataTypes);
    }

    async insertMessage(message, userId, chatId, timestamp){
        try{
            console.log("recieved message Data: " + JSON.stringify({message, userId, chatId, timestamp}))

            const newMessage = await this.Message.create({
                message: message,
                userId: userId,
                chatId: chatId,
                timestamp: timestamp,
            })
            return ({message: "saved message: " + newMessage})
        }catch (err){
            console.log(err)
            return ({message: "could not save message: " + err})
        }
    }

    async getAllMessagesFromChatId(chatId){
        try{
            console.log("loading every message from chat id: " + chatId)
            
            const AllMessages = await this.Message.findAll({
                where: {
                    chatId: chatId
                },
                attributes: ["message", "userId", "timestamp"]
            })
            const cleanMessage = JSON.stringify(AllMessages);

            return cleanMessage
        }catch (err){
            return ({message: "messages failed to load" + err})
        }
    }
}