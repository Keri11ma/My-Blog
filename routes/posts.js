const express = require('express');
const jwt = require('jsonwebtoken');
const Post = require('../models/Post');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = 'some_super_secret_key';

router.post('/', async (req, res) => {
    const { title, content } = req.body;
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) return res.json({ status: 'error', error: 'Unauthorized' });

    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);
        const post = new Post({ title, content, author: user._id });
        await post.save();
        res.json({ status: 'ok', post });
    } catch (error) {
        res.json({ status: 'error', error: 'Unauthorized' });
    }
});

module.exports = router;

router.get('/', async (req, res) => {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
});

