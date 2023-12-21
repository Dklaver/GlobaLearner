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
          userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            },
          },
          chatId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Chat',
                key: 'id'
            },
          },
          
    })

    return Message;
}