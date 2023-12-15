const express = require("express");
const router = express.Router();
const {verifyAccessToken} = require('../middleware/validateJWT')

class ChatController{

    constructor(chatManager){
        this.router = express.Router();
        this.chatManager = chatManager

        this.router.get("/",verifyAccessToken, async(req, res) => {
            try{
                console.log("access verified");
                let allChats = await this.chatManager.GetAllChats();
                res.status(200).json({allChats, succes: true});

            } catch (err) {
                res.status(500).json({succes: false});
            }
        });
        this.router.post("/create",verifyAccessToken, async(req, res) => {
            try{
                console.log("access verified");
                const {chatName, language} = req.body;
                console.log('Received data:', { chatName, language });
                this.chatManager.CreateChat(chatName, language)
                res.status(200).json({succes: true})
            } catch (err) {
                res.status(500).json({succes: false});
            }
        });
    
    }
    
}
module.exports = ChatController;


