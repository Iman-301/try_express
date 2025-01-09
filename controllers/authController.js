const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  // Fixed typo
const User = require('../models/User');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }
        user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.status(201).json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email not found" });  // Added return
        }
        const isMatch = await bcrypt.compare(password, user.password); // Fixed typo
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,  // Fixed to use process.env
        });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).send('Server error');
    }
}