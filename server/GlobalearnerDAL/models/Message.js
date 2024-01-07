const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Message = sequelize.define("Message", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          message: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          userId: {
            type: DataTypes.INTEGER,
            primaryKey: false,
            allowNull: false,
          },
          chatId: {
            type: DataTypes.INTEGER,
            primaryKey: false,
            allowNull: false,
          },
          
    })

    return Message;
}