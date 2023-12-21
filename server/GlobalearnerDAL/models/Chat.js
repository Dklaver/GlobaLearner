const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
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
          language: {
            type: DataTypes.STRING,
            allowNull: false,
          },
    })

    return Chat;
}