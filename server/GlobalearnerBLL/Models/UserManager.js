const iUserManager = require("../../InterfaceLayer/iUserManager")

module.exports = class CreateUser extends iUserManager{
    constructor(iUserManager){
        iUserManager = this.UserManager
    }
    async CreateUser(user, password){
        console.log("registering: ", {user, password})

    }
}