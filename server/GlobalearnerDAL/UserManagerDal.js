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
            // Return the created user or any other relevant information
            return newUser.toJSON();
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const allUsers = await this.User.findAll();
            return allUsers.map((user) => user.toJSON());
        } catch (error) {
            throw error;
        }
    }

    async getUserByName(user) {
        try{
            const result = await this.User.findOne({
                where: {
                    name: user
                }
            })
            return result.toJSON();
        } catch (error) {
            throw error;
        }
    }
};



