const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/my_blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

app.use('/api', authRoutes);
app.use('/api/posts', postRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
