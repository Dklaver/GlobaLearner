module.exports = class MessageManager{
    constructor(MessageManagerDal){
        this.MessageManagerDal = MessageManagerDal;
    }

    async insertMessage(message, userId, chatId){
        return this.MessageManagerDal.insertMessage(message, userId, chatId)
    }
}