const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * @desc Get users
 * @route GET /api/users
 * @access public
 */
const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find()
    res.status(200).json(users)
});

/**
 * @desc Set user
 * @route POST /api/users
 * @access Private
 */
const registerUser = asyncHandler(async(req, res) => {
    const { name, username, password, email } = req.body;

    if (!name || !username || !password || !email) {
        res.status(400);
        throw new Error(JSON.stringify({
            "username": "Please add a username field",
            "password": "Please add a password field",
            "email": "Please add a email field",
            "birthday": "Please add a birthday field"
        }));
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists!')
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
        name,
        username,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid Credentials !');
    }
})

/**
 * @desc Set user
 * @route POST /api/login
 * @access Private
 */
const loginUser = asyncHandler(async(req, res) => {
    const { username, password } = req.body;

    //check for user email
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid User Data');
    }

    res.json({ message: "Login User" })
})


/**
 * @desc Get user data
 * @route POST /api/users/me
 * @access Private
 */
const getMe = asyncHandler(async(req, res) => {
    const { _id, name, username, email } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        username,
        email
    })
})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
}

module.exports = {
    getUsers,
    registerUser,
    loginUser,
    getMe
}