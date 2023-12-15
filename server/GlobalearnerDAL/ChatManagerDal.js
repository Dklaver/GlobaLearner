const { Sequelize, DataTypes } = require("sequelize");
const Chatmodel = require("./models/Chat");

module.exports = class ChatDal {

    constructor(){

        this.sequelize = new Sequelize({
            dialect: "mysql",
            host: "studmysql01.fhict.local",
            username: "dbi512957",
            password: "admin",
            database: "dbi512957"
        });

        this.Chat = Chatmodel(this.sequelize, DataTypes);
    }

    async GetAllChats(){
        try{
            const result = await this.Chat.findAll({
                attributes: ['id','name','language']     
        })

        const allChatNames = result.map((chatInstance) => chatInstance.toJSON());

        return allChatNames;
        }catch (err){
            console.log(err);
        }
    }
    async CreateChat(chatName, language){
        try{
            const newChat = await this.Chat.create({
                name: chatName,
                language: language,
            });
            const result = newChat.toJSON();
            return result;
        }catch (err){
            console.log(err)
        }
    }
}