const express = require("express");
const router = express.Router();

const { User } = require("../models")

router.get("/", (req, res) => {
    User.findAll().then((users)=> {
        res.send(users);
    }).catch((err)=> {
        console.log(err);
    });
});

router.get("/create", (req, res) => {
    User.create({
        name: "Daniel",
        country: "Netherlands",
        email: "Daniel@gmail.com",
        password: "password"
    }).catch((err) =>{
        if (err) {
            console.log(err);
        }
    });
    res.send("insert");
})

router.get("/delete", (req,res) => {
    User.destroy({ where: {id: 4} })
    res.send("delete");
})

module.exports = router; 