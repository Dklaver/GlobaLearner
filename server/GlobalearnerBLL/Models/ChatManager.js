
module.exports = class ChatManager {

    constructor(ChatManagerDal){
        this.ChatManagerDal = ChatManagerDal
    }
    async GetAllChats(){
        return this.ChatManagerDal.GetAllChats();
    }
    async CreateChat(chatName, language, userId){
        const result = await this.ChatManagerDal.CreateChat(chatName, language, userId);
        
        return result;
    }
   async insertUserInChat(chatId, userId){
    return this.ChatManagerDal.insertUserInChat(chatId, userId)
   }

   async getAllChatsFromUser(userId){
     return this.ChatManagerDal.getAllChatsFromUser(userId)
   }
    
}