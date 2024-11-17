const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const User = require('../models/User');
const User = require('../models/User')
const authMiddleware = require('../middleware/authMiddleWare');


const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists.....' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: newUser });
        // res.status(200).json({message:"register routes" });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});



// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


// user profile routes

router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const activities = await Activity.find({ userId: req.user.id });
        res.status(200).json({ user, activities });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving profile data' });
    }
});



module.exports = router;

// ==============================================
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { findUserByEmail, saveUser } = require('../models/User');
// const dotenv = require('dotenv')
// dotenv.config()
// const router = express.Router();

// // Register route
// router.post('/register', async (req, res) => {
//     console.log('register route hit')
//     const { username, email, password } = req.body;

//     try {
//         // Check if the user already exists
//         const existingUser = findUserByEmail(email);
//         if (existingUser) return res.status(400).json({ message: 'User already exists' });

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 12);

//         // Create new user and save to in-memory storage
//         const newUser = { username, email, password: hashedPassword };
//         saveUser(newUser);

//         // Generate JWT token
//         const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.status(201).json({ token, user: newUser });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // Login route
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Check if the user exists
//         const user = findUserByEmail(email);
//         if (!user) return res.status(400).json({ message: 'User not found' });

//         // Compare passwords
//         const isPasswordCorrect = await bcrypt.compare(password, user.password);
//         if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

//         // Generate JWT token
//         const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

//         res.status(200).json({ token, user });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// module.exports = router;


