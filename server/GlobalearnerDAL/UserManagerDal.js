const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("./models/User");
const iUserManagerDal = require("../InterfaceLayer/iUserManagerDal");
const UserChatModel = require("./models/UserChat");

module.exports = class UserDal extends iUserManagerDal {
    constructor() {
        super();

        this.sequelize = new Sequelize({
            dialect: "mysql",
            host: "studmysql01.fhict.local",
            username: "dbi512957",
            password: "admin",
            database: "dbi512957"
        });

        this.User = UserModel(this.sequelize, DataTypes);
        this.UserChat = UserChatModel(this.sequelize, DataTypes);
    }

    async create(user, password) {
        try {
            const newUser = await this.User.create({
                name: user,
                password: password,
            });
            const newUserObject = newUser.toJSON();
            console.log("NEWUSER" + newUserObject);
            // Return the created user or any other relevant information
            return newUserObject;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const allUsers = await this.User.findAll({
                attributes: ['name', 'password', 'id'],
            });
            console.log("ALLUSERS: " + allUsers);

            const plainUsers = allUsers.map((userInstance) => userInstance.toJSON());

            console.log("plain user = " + plainUsers)
            return plainUsers;

        } catch (error) {
            throw error;
        }
    }

    async getUserByName(user) {
        try{
            // const succes = false;
            const result = await this.User.findOne({
                where: {
                    name: user
                }
            })
            const plainResult = result.toJSON();

            console.log(plainResult);
            return plainResult;
        } catch (error) {
            throw error;
        }
    }

    async findUserById(id) {
        try{
            console.log("id: " + id)
            const result = await this.User.findOne({
                where: {
                    id: id
                }
            })
            console.log("result: " + JSON.stringify(result))
            const plainUser = result.toJSON();
            return plainUser
        }catch (err){
            return{message: "there are no users by this id", error: err}
        }
    }

    async getUsersByChatId(chatId) {
        try {
            const uid = await this.UserChat.findAll({
                where: chatId = chatId,
                attributes: ['userId'],
                raw: true,
            });
            console.log("usersByChatId "+ uid)
            
            const userIds = uid.map(result => result.userId);

            if (userIds.length === 0) {
                
                return [];
            }

            const allUsers = await this.User.findAll({
                where: {id: userIds},
                attributes: ['name', 'id']
            })
            return allUsers;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
};



