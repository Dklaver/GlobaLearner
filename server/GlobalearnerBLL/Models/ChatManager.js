
module.exports = class ChatManager {

    constructor(ChatManagerDal){
        this.ChatManagerDal = ChatManagerDal
    }
    async GetAllChats(){
        return this.ChatManagerDal.GetAllChats();
    }
    async CreateChat(chatName, language){
        return this.ChatManagerDal.CreateChat(chatName, language);
    }
}