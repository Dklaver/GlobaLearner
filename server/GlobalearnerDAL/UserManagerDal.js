const { Sequelize, DataTypes } = require("sequelize");
const UserModel = require("./models/User");
const iUserManagerDal = require("../InterfaceLayer/iUserManagerDal");

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
                attributes: ['name', 'password'],
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
            // if (result){
            //     succes = true;
            //     console.log("succes")
            //     return result, succes;
            // }else{
            //     const message = "user not found"
            //     console.log(message)
            //     return err, succes;
            // }   
        } catch (error) {
            throw error;
        }
    }
};



