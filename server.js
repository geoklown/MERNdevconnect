const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('hello'));
const port = process.env.Port || 5000;
app.listen(port, () => consolelog(`server running on port ${port}`));