const { DataTypes } = require("sequelize");
const { sequelize } = require(".");



module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define("Chat", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    })

    return Chat;
}