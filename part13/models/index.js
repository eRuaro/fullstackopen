const Note = require("./note");
const User = require("./user");

// there is a one to many relationship between users and notes
User.hasMany(Note);
Note.belongsTo(User);
Note.sync({ alter:true });
User.sync({ alter: true });

module.exports = {
    Note, 
    User
}