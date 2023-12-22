const { Sequelize, DataTypes } = require("sequelize");
const MessageModel = require("./models/Message");

module.exports = class MessageManagerDal{
    constructor(){
        this.sequelize = new Sequelize({
            dialect: "mysql",
            host: "studmysql01.fhict.local",
            username: "dbi512957",
            password: "admin",
            database: "dbi512957"
        });

        this.Message = MessageModel(this.sequelize, DataTypes);
    }
}