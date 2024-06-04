const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = 'some_super_secret_key';

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = new User({ username, password });
        await user.save();
        res.json({ status: 'ok' });
    } catch (error) {
        res.json({ status: 'error', error: 'Duplicate username' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid username/password' });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (isPasswordValid) {
        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        return res.json({ status: 'ok', token });
    } else {
        return res.json({ status: 'error', error: 'Invalid username/password' });
    }
});

module.exports = router;
