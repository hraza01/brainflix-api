import express from 'express'
import { randomUUID } from 'crypto'
import { DB } from '#app/config.js'
import { fetchData, writeData } from '#app/utils/reader.js'

const videoRouter = express.Router()

videoRouter
    .get('/', async (req, res) => {
        try {
            const data = await fetchData(DB)
            const videos = data.map(({ id, title, channel, image }) => {
                return { id, title, channel, image }
            })

            res.json(videos)
        } catch (e) {
            console.error(e)
        }
    })
    .post('/', async (req, res) => {
        try {
            if (req.body.title && req.body.description) {
                // refactor this into a helper function
                const video = {
                    id: randomUUID(),
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
                }

                const videos = await fetchData(DB)
                videos.push(video)
                await writeData(DB, videos)

                res.sendStatus(200)
            } else {
                res.sendStatus(400)
            }
        } catch (e) {
            console.error(e)
        }
    })

videoRouter.get('/:videoId', async (req, res) => {
    try {
        const videos = await fetchData(DB)
        const video = videos.find((vid) => vid.id === req.params.videoId)

        res.json(video)
    } catch (e) {
        console.error(e)
    }
})

export default videoRouter
