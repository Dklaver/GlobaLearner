const { Sequelize } = process.env.NODE_ENV === 'test' ? require('./sequelize-mock') : require('sequelize');
const { DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: "mysql",
    host: "studmysql01.fhict.local",
    username: "dbi512957",
    password: "admin",
    database: "dbi512957"
});

const User = sequelize.define("User", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const createUser = async (user, password) => {
    try {
        const newUser = await User.create({
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

module.exports = {
    createUser,
    
    User
}