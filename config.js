const dotenv = require('dotenv');
const path = require('path');
const file = path.join(process.env.PWD, 'data', 'videos.json');

dotenv.config();

module.exports = {
    port: process.env.PORT,
    file,
};
