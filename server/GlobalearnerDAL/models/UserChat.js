module.exports = (sequelize, DataTypes) => {
    const UserChat = sequelize.define("UserChat", {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'User',
            },
        },
        chatId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'Chat',
            },
        },
        
    });

    return UserChat;
};  