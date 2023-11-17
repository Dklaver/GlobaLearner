const express = require('express');
const { User } = require('../../GlobalearnerDAL/models');


class UserController {

    constructor(userManager) {
        this.userManager = userManager;
        this.router = express.Router();

        this.router.get("/get", async (req, res) => {
            try {
                let users = await this.userManager.GetUser();
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
        
        this.router.get('/register', async (req, res) => {
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

                const token = this.userManager.getUserByName(user, password);
                res.status(201).json({ message: 'Succesfully validated user login' });
                console.log(token);
                return token;
                
                
            } catch (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

    }
}

// Export the router instance directly
module.exports = UserController;
