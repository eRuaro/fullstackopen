const { DataTypes } = require("sequelize");

module.exports = {
    // defines how the database should be modified when migration is performed
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable("notes", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            important: {
                type: DataTypes.BOOLEAN
            },
            date: {
                type: DataTypes.DATE
            },
        })
        await queryInterface.createTable("users", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        })
        // adds foreign key to "notes" table called "user_id" that references the creator of a note
        await queryInterface.addColumn("notes", "user_id", {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id"
            },
        })
    },
    // tells how to undo the migration if there is a need to do so
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable("notes")
        await queryInterface.dropTable("users")
    },
}