const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.get('/', (req, res) => res.send('hi!'));
// DB Config
const db = require('./config/keys').mongoURI;
// Connect to MongoDB
mongoose.connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));
const port = process.env.Port || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));