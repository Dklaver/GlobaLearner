const express = require("express");
const router = express.Router();
const {verifyAccessToken} = require('../middleware/validateJWT')
const {GetUserId} = require ('../middleware/validateJWT')

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
        this.router.post("/create",verifyAccessToken,GetUserId, async(req, res) => {
            
            try{
                console.log("access verified");
                const {chatName, language} = req.body;
                const userId = req.userId;
                console.log('Received data:', { chatName, language, userId });
                this.chatManager.CreateChat(chatName, language, userId)
                res.status(200).json({succes: true})
            } catch (err) {
                res.status(500).json({succes: false});
            }
        });

        this.router.post("/insertUser", GetUserId, async(req, res) => {
            try{
                const userId = req.userId;
                const chatId = req.body.chatId;

                console.log("Req.body for ChatId: " + JSON.stringify(chatId))

                this.chatManager.insertUserInChat(chatId, userId);
                res.status(200).json({succes:true});
            }catch (err){
                console.log(err)
                res.status(500).json({ err })
            }
            
        })
    
    }
    
}
module.exports = ChatController;


