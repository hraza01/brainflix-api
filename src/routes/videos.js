import { Router } from 'express'
import { createVideo, findVideo } from '#app/utils/helpers.js'
import {
    summarizeVideos,
    addVideo,
    viewVideo,
    likeVideo,
} from '#app/services/videoController.js'

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
            if (req.body.title && req.body.description) {
                const video = createVideo(req.body.title, req.body.description)
                await addVideo(video)

                res.sendStatus(200).json(video)
            } else {
                res.sendStatus(400)
            }
        } catch (e) {
            console.error(e)
        }
    })

videoRouter
    .get('/:videoId', async (req, res) => {
        try {
            const { video } = await findVideo(req.params.videoId)
            res.json(video)
        } catch (e) {
            console.error(e)
        }
    })
    .put('/:videoId', async (req, res) => {
        try {
            const { video } = await viewVideo(req.params.videoId)
            res.json(video)
        } catch (e) {
            console.error(e)
        }
    })

videoRouter.put('/:videoId/like', async (req, res) => {
    try {
        const video = await likeVideo(req.params.videoId)
        res.sendStatus(200).json(video)
    } catch (e) {
        console.error(e)
    }
})

export default videoRouter
