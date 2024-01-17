const { Sequelize, DataTypes } = require("sequelize");
const Chatmodel = require("./models/Chat");
const UserChatModel = require("./models/UserChat");

module.exports = class ChatDal {

    constructor(){

      this.sequelize = new Sequelize({
        dialect: "mysql",
        host: process.env.DB_HOST,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port:40000
        
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
            console.log("result: " + JSON.stringify(result))
            return {chat: result, userChat: jointResult};
        }catch (err){
            console.log(err)
        }
    }

    async getUsersByChatId(chatId) {
      try {
          const uid = await this.UserChat.findAll({
              where: {chatId: chatId},
              attributes: ['userId'],
              raw: true
          });
          console.log("usersByChatId "+ uid)
          
          const userIds = uid.map(result => result.userId);

          if (userIds.length === 0) {
              
              return [];
          }

          return userIds;
      } catch (err) {
          console.error(err);
          throw err;
      }
  }

    async insertUserInChat(chatId, userId) {
        try {
          console.log("chatId: " + chatId);
          const checkUser = await this.UserChat.findAll({
            where: {
              userId: userId,
              chatId: chatId,
            },
          });
      
          if (!checkUser.length) {
            try {
              console.log("checkUser.length: " + checkUser.length)
              const insertedUser = await this.UserChat.create({
                userId: userId,
                chatId: chatId,
              });
      
              // Additional logic if needed after user insertion
            } catch (err) {
              console.log(err);
              throw new Error("Failed to insert user into chat.");
            }
          } else {
            console.log("User already exist");
          }
        } catch (err) {
          console.log(err);
          throw new Error("ERROR checking for existing user in chat")
        }
      }

      async getAllChatsFromUser(userId) {
        try{
          const result = await this.UserChat.findAll({
            where: {
              userId: userId,
            },
            attributes: ['chatId']
          })
          console.log("All chat id's from user: " + JSON.stringify(result))

          const chatIds = result.map(item => item.chatId);

          const usersChats = await this.Chat.findAll({
            where: {
              id: chatIds
            },
            attributes: ['id','name','language']
          })

          const allChatNames = usersChats.map((chatInstance) => chatInstance.toJSON());

          console.log("all chats from user: " + JSON.stringify(allChatNames))

          return allChatNames
        }catch (err){
          console.log(err)
        }
      }

      async getChatsFromLanguage(language) {
        try{
          const chats = await this.Chat.findAll({
            where: {
              language: language
            },
            attributes: ['id','name','language']

          })
          const languageChats = chats.map((c) => c.toJSON());

          return languageChats
        }catch (err){
          console.log(err)
        }
      }

      
}