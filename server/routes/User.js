const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree"]})
})

router.post("/", (req, res) => {

})

module.exports = router; 