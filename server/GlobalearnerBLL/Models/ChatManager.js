
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
    try{
    const allUsersFromChat = await this.ChatManagerDal.getUsersByChatId(chatId);
    console.log("allUsers from chat: " + JSON.stringify(allUsersFromChat))
    console.log("users lenght: " + allUsersFromChat.length)
    if (allUsersFromChat.length >= 2){
        try{
            console.log("lobby is full, cant insert user")
            return({errorMsg: "lobby is full"})
        }catch (err){
           console.log(err)
        }
    }else{
        const insertedUser = await this.ChatManagerDal.insertUserInChat(chatId, userId)

        return insertedUser
    }
    }catch (err){
        console.log(err);
        return { errorMsg: "Error inserting user into chat." };
    }
    
   }

   async getAllChatsFromUser(userId){
     return this.ChatManagerDal.getAllChatsFromUser(userId)
   }
    
}