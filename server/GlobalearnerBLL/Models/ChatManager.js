
module.exports = class ChatManager {

    constructor(ChatManagerDal){
        this.ChatManagerDal = ChatManagerDal
    }
    async GetAllChats(){
        return this.ChatManagerDal.GetAllChats();
    }
    async CreateChat(chatName, language, userId){
        return this.ChatManagerDal.CreateChat(chatName, language, userId);
    }
   async insertUserInChat(chatId, userId){
    return this.ChatManagerDal.insertUserInChat(chatId, userId)
   }
    
}