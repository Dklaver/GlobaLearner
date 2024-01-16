const iUserManager = require("../../InterfaceLayer/iUserManager")
const bcrypt = require('bcrypt');
require("dotenv").config();

const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
    const createToken = (id) => {
        return jwt.sign({id}, process.env.JWT_SECRET_KEY, {
            expiresIn: maxAge
        });
    }

module.exports = class UserManager extends iUserManager{
    constructor(UserManagerDal){
        super();
        this.UserManagerDal = UserManagerDal
    }
    
    async createUser(user, password){
        const saltRounds = await bcrypt.genSalt();
        const hashpassword = await bcrypt.hash(password, saltRounds);

        return this.UserManagerDal.create(user, hashpassword);

    }
    async GetUsers(){
        return this.UserManagerDal.getAll();
    }
    async getUserByName(user, password){
        try{
            const userData = await this.UserManagerDal.getUserByName(user)
            console.log("userData: " + JSON.stringify(userData));
        if (!userData) {
            console.log('no userdata found');
            return { success: false, message: 'No user found' };
        }
        const hashedpassword = userData.password;
        const passwordMatch = await bcrypt.compare(password, hashedpassword);
        console.log("passwordMatch: " + passwordMatch);
        if (passwordMatch){
            const token = createToken(userData.id);

            return {success: true, token, message: "success!"};
        }else {
            return { success: false, message: 'Invalid password' };
        }
        }catch (err) {
            return {message: err}
        }
    } 
    
    async findUserById(id){
        try{
            const user = await this.UserManagerDal.findUserById(id)
            console.log(user)
            return user;
        }catch (err){
            return {message: err}
        }
    }

    async getUsersByChatId(chatId, userId) {
        try {
          const users = await this.UserManagerDal.getUsersByChatId(chatId);
          console.log("users: " + JSON.stringify(users));
      
          if (users.length >= 2 ) {
            if (users.some(user => user.id === userId)){
                return users;
            }else{
                return({lobbyFull: true})
            }
          } else {
            return users;
          }
        } catch (err) {
          throw err;
        }
      }
}
