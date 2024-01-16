const express = require('express');
const {GetUserId, verifyAccessToken} = require ('../middleware/validateJWT')



class UserController {

    constructor(userManager) {
        this.userManager = userManager;
        this.router = express.Router();

        this.router.get("/", async (req, res) => {
            try {
                let users = await this.userManager.GetUsers();
                res.status(200).json(users);
                console.log(users);
                
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
        
        this.router.get("/delete", async (req, res) => {
            try {
                // Your deletion logic here
                res.status(200).json({ message: 'User deleted successfully' });
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
        
        this.router.post('/register', async (req, res) => {
            try {
                const { user, password } = req.body;
                console.log('Received data:', { user, password });
                
                this.userManager.createUser(user, password);
                
                res.status(201).json({ message: 'User registered successfully' });
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        this.router.post("/login", async (req, res) => {
            try {
                const { user, password } = req.body;
                console.log('Received data:', { user, password });

                const result = await this.userManager.getUserByName(user, password);
                console.log("Sending Data:" + JSON.stringify(result))
                res.status(201).json({ result });
                
                
                
                
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        this.router.get("/getById", GetUserId, async (req, res) => {
            try{
                const userId = req.userId;
                const user = await this.userManager.findUserById(userId);
                console.log('user: ' + user);
                res.status(201).json({user});
            }catch{
                res.status(500).json({error: 'internal Server Error'})
            }
        })

        this.router.get("/getByChatId",verifyAccessToken, GetUserId, async (req,res) => {
            try{
                const userId = req.userId;
                const chatId = req.query.chatId;
                const users = await this.userManager.getUsersByChatId(chatId, userId)
                res.status(201).json({users})
            }catch (err){
                console.log(err)
                res.status(500).json( {succes: false})
            }
        })

    }
}

// Export the router instance directly
module.exports = UserController;
