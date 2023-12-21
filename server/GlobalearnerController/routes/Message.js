const express = require("express");
const {verifyAccessToken} = require('../middleware/validateJWT')
const {GetUserId} = require ('../middleware/validateJWT')

class MessageController {
    constructor(messageManager){
        this.messageManager = messageManager
        this.router = express.Router();
    }
}

module.exports = MessageController;