const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { jsonReader, jsonWriter } = require('../utils/reader');
const { file } = require('../config');

const router = express.Router();
router.get('/', async (req, res) => {
    const data = await jsonReader(file);
    const videos = data.map(({ id, title, channel, image }) => {
        return { id, title, channel, image };
    });
    res.json(videos);
});

router.post('/', async (req, res) => {
    if (req.body.title && req.body.description) {
        const videos = await jsonReader(file);

        const video = {
            id: uuidv4(),
            title: req.body.title,
            channel: 'BrainStation',
            image: 'https://i.imgur.com/l2Xfgpl.jpg',
            description: req.body.description,
            views: '0',
            likes: '0',
            duration: '4:01',
            video: 'https://project-2-api.herokuapp.com/stream',
            timestamp: Date.now(),
            comments: [],
        };

        videos.push(video);
        await jsonWriter(file, videos);
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
});

router.get('/:id', async (req, res) => {
    const videos = await jsonReader(file);
    const video = videos.find((vid) => vid.id === req.params.id);
    res.json(video);
});

router.post('/:id/comments', async (req, res) => {
    if (req.body.name && req.body.comment) {
        const videos = await jsonReader(file);

        const comment = {
            id: uuidv4(),
            name: req.body.name,
            comment: req.body.comment,
            likes: 0,
            timestamp: Date.now(),
        };

        const videoIndex = videos.findIndex((vid) => vid.id === req.params.id);
        videos[videoIndex].comments.push(comment);
        await jsonWriter(file, videos);

        res.json(comment);
    }
});

router.delete('/:id/comments/:commentId', async (req, res) => {
    const videos = await jsonReader(file);
    const videoIndex = videos.findIndex((vid) => vid.id === req.params.id);
    const commentIndex = videos[videoIndex].comments.findIndex(
        (comment) => comment.id === req.params.commentId
    );
    const comment = videos[videoIndex].comments[commentIndex];
    videos[videoIndex].comments.splice(commentIndex, 1);
    await jsonWriter(file, videos);
    res.json(comment);
});

module.exports = router;
