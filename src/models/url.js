    module.exports = (Sequelize, DataTypes) => {
        const URL = Sequelize.define('URL',{

            longURL: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            shortURL: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            createdAt : DataTypes.DATE,

        })
        return URL;
    }