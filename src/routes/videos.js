import { Router } from 'express'
import { createVideo, findVideo } from '#app/utils/helpers.js'
import {
    summarizeVideos,
    addVideo,
    viewVideo,
    likeVideo,
} from '#app/controllers/videoController.js'

const videoRouter = Router()

videoRouter
    .get('/', async (req, res) => {
        try {
            const summary = await summarizeVideos()
            res.json(summary)
        } catch (e) {
            console.error(e)
        }
    })
    .post('/', async (req, res) => {
        try {
            if (!req.body.title || !req.body.description) {
                res.status(401).json({
                    message: 'invalid title and/or description',
                })
            } else {
                const video = createVideo(
                    req.body.title,
                    req.body.description,
                    req.body.url
                )
                await addVideo(video)
                console.log(req.body)
                res.json(video)
            }
        } catch (e) {
            console.error(e)
        }
    })

videoRouter.get('/:videoId', async (req, res) => {
    try {
        const { video } = await findVideo(req.params.videoId)
        await viewVideo(req.params.videoId)
        res.json(video)
    } catch (e) {
        console.error(e)
    }
})

videoRouter.put('/:videoId/like', async (req, res) => {
    try {
        const video = await likeVideo(req.params.videoId)
        res.json(video)
    } catch (e) {
        console.error(e)
    }
})

export default videoRouter
