const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const app = express();
app.get('/', (req, res) => res.send('Server is running "Live"!'));
// DB Config
const db = require('./config/keys').mongoURI;
// Connect to MongoDB
mongoose.connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
const port = process.env.Port || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));