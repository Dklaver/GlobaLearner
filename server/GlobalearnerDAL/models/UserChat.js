const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const UserChat = sequelize.define("UserChat", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: false,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            },
        },
        chatId: {
            type: DataTypes.INTEGER,
            primaryKey: false,
            allowNull: false,
            references: {
                model: 'Chat',
                key: 'id'
            },
        },
        
    });

    return UserChat;
};  