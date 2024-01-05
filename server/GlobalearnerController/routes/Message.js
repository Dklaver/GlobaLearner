const express = require("express");
const {verifyAccessToken} = require('../middleware/validateJWT')
const {GetUserId} = require ('../middleware/validateJWT')

class MessageController {
    constructor(messageManager){
        this.messageManager = messageManager
        this.router = express.Router();

        this.router.post("/insertMessage", GetUserId, async (req, res) => {
            const userId = req.userId;
            const {lastMessage, chatId} = req.body;
            try{
                const newChat = await this.messageManager.insertMessage(lastMessage, userId, chatId)
                res.status(200).json({message: newChat})
            }catch (err){
                console.log(err)
                res.status(500).json({message: "something went wrong"})
            }
        })
    }
}

module.exports = MessageController;