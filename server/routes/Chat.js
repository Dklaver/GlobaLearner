const express = require("express");
const router = express.Router();

const { Chat } = require("../models")

router.get("/", (req, res) => {
    Chat.findAll().then((chats)=> {
        res.send(chats);
    }).catch((err)=> {
        console.log(err);
    });
})

router.post("/", (req, res) => {
    
})

module.exports = router;