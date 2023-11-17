const iUserManager = require("../../InterfaceLayer/iUserManager")
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
    const createToken = (id) => {
        return jwt.sign({id}, 'supersecret top secret', {
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
    async GetUser(){
        return this.UserManagerDal.getAll();
    }
    async getUserByName(user, password){
        try{
            const userData = this.UserManagerDal.getUserByName(user)
        
        if (!userData) {
            console.log('no userdata found')
        }
        const hashedpassword = userData.password;
        const passwordMatch = await bcrypt.compare(password, hashedpassword);

        if (passwordMatch){
            const token = createToken(userData.id);

            return {token}
        }else {
            return { success: false, message: 'Invalid password' };
        }
        }catch (err) {
            console.log(err)
        }
    } 
}