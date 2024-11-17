const mongoose = require('mongoose');


// let Users= [
//    {username: "Aliyu", email:"ali@gmail.com", password:"122"} 
// ]
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
    activities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
});

module.exports = mongoose.model('User', userSchema, 'Users');

// module.exports= {Users};
// ============================================================
// models/User.js

// Temporary in-memory storage
// const users = [];

// // Function to find a user by email
// const findUserByEmail = (email) => {
//     return users.find((user) => user.email === email);
// };

// // Function to save a new user
// const saveUser = (user) => {
//     users.push(user);
//     return user;
// };

// // Export the functions
// module.exports = { findUserByEmail, saveUser, users };
