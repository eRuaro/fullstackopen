const Sequelize = require("sequelize");
const { DATABASE_URL } = require("./config");

const sequelize = new Sequelize(DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    },  
});

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection to database successful");
    } catch (err) {
        console.log("Error connecting to database: ", err);
        return process.exit(1);
    }

    return null;
}

module.exports = {
    connectToDatabase,
    sequelize,
}