module.exports = class MessageManager{
    constructor(MessageManagerDal){
        this.MessageManagerDal = MessageManagerDal;
    }

    async insertMessage(message, userId, chatId, timestamp){
        return this.MessageManagerDal.insertMessage(message, userId, chatId, timestamp)
    }

    async getAllMessagesFromChatId(chatId){
        return this.MessageManagerDal.getAllMessagesFromChatId(chatId)
    }
}