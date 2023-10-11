module.exports = (sequelize, DataTypes) => {
    const UserChat = sequelize.define("UserChat", {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        chatId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            references: {
                model: 'Chat',
                key: 'id',
            },
        },
        
    });

    return UserChat;
};