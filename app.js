const express = require('express');
const { port } = require('./config');
const videoRouter = require('./routes/videos');

const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: 'success' });
});

app.use('/videos', videoRouter);

app.listen(port);
