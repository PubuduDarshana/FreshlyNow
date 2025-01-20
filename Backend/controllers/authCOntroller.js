const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Register User
exports.signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'Email already in use' });

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        res.status(400).json({ error: 'Registration failed', details: error.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found!' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid Credentials!' });

        const token = jwt.sign({ id: user._id, role: user.role, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' });
        res.status(200).json({ message: 'Login Successful!', token });

    } catch {
        res.status(500).json({ message: 'Login failed!' });
    }
};
