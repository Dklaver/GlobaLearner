const { Sequelize, DataTypes } = require("sequelize");
const Chatmodel = require("./models/Chat");
const UserChatModel = require("./models/UserChat");

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
        this.UserChat = UserChatModel(this.sequelize, DataTypes);
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
    async CreateChat(chatName, language, userId){
        try{
            const newChat = await this.Chat.create({
                name: chatName,
                language: language,
            });
            const result = newChat.toJSON();
            let jointResult
            try{
                const newChatId = result.id
                console.log('new chat id: ' + newChatId)

                const jointTable = await this.UserChat.create({
                    userId: userId,
                    chatId: newChatId
                })
                console.log("jointTable: " + jointTable)
                jointResult = jointTable.toJSON();
            }catch (err){
                console.log(err)
            }
            return {chat: result, userChat: jointResult};
        }catch (err){
            console.log(err)
        }
    }
}