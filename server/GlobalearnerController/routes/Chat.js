const express = require("express");
const router = express.Router();
const {verifyAccessToken} = require('../middleware/validateJWT')

const { Chat } = require("../../GlobalearnerDAL/models")

router.get("/",verifyAccessToken, (req, res) => {
    try{
        res.status(201).json({succes: true});
        console.log("access verified");
    } catch (err) {
        res.status(500).json({succes: false});
    }
    
})

router.post("/", (req, res) => {
    
})

module.exports = router;