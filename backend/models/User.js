const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: [true, 'Please add a name value'] },
    username: { type: String, required: [true, 'Please add a username value'], unique: true },
    password: { type: String, required: [true, 'Please add a password value'] },
    email: { type: String, required: [true, 'Please add a email value'], unique: true },
    birthday: Date,
}, {
    timestamps: true,
})

module.exports = mongoose.model('User', userSchema);