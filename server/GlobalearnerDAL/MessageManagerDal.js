const { Sequelize, DataTypes } = require("sequelize");
const MessageModel = require("./models/Message");

module.exports = class MessageManagerDal{
    constructor(){
        this.sequelize = new Sequelize({
            dialect: "mysql",
            host: "studmysql01.fhict.local",
            username: "dbi512957",
            password: "admin",
            database: "dbi512957"
        });

        this.Message = MessageModel(this.sequelize, DataTypes);
    }

    async insertMessage(message, userId, chatId){
        try{
            console.log("recieved message Data: " + JSON.stringify({message, userId, chatId}))

            const newMessage = await this.Message.create({
                message: message,
                userId: userId,
                chatId: chatId
            })
            return ({message: "saved message: " + newMessage})
        }catch (err){
            console.log(err)
            return ({message: "could not save message: " + err})
        }
    }
}