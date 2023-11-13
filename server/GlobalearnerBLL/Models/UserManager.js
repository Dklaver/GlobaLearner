const iUserManager = require("../../InterfaceLayer/iUserManager")

module.exports = class UserManager extends iUserManager{
    constructor(UserManagerDal){
        super();
        this.UserManagerDal = UserManagerDal
    }
    async CreateUser(user, password){
        console.log("registering: ", {user, password})

    }
    async GetUser(){
        return this.UserManagerDal.getAll();
    }
}