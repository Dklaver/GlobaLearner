const express = require("express");
const {verifyAccessToken} = require('../middleware/validateJWT')
const {GetUserId} = require ('../middleware/validateJWT')

class MessageController {
    constructor(messageManager){
        this.messageManager = messageManager
        this.router = express.Router();

        this.router.post("/insertMessage", GetUserId, async (req, res) => {
            const userId = req.userId;
            const {messageData} = req.body;
            const chatId = messageData.chatId;
            const lastMessage = messageData.message
            const timestamp = messageData.timestamp
            try{
                console.log("messageData: " + JSON.stringify(messageData))
                const newChat = await this.messageManager.insertMessage(lastMessage, userId, chatId, timestamp)
                res.status(200).json({message: newChat})
            }catch (err){
                console.log(err)
                res.status(500).json({message: "something went wrong"})
            }
        })

        this.router.get("/getFromChat", async (req, res) => {
            
            try{
                const chatId = req.query.chatId;
                console.log("getting all chats from chat id: " + chatId)
                const response = await this.messageManager.getAllMessagesFromChatId(chatId)

                res.status(200).json({response})
            }catch (err){
                res.status(500).json({message: "something  went wrong loading all messages" + err})
            }
        })
    }
}

module.exports = MessageController;