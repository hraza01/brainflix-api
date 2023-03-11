const express = require('express');
const path = require('path');
const fs = require('fs');
const { port } = require('./config');

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: 'success' });
});

app.listen(port);
