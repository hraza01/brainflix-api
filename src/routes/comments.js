import express from 'express'
import { randomUUID } from 'crypto'
import { DB } from '#app/config.js'
import { fetchData, writeData } from '#app/utils/reader.js'

// Params merging is required as this is a nested route
const commentRouter = express.Router({ mergeParams: true })

commentRouter.post('/', async (req, res) => {
    try {
        if (req.body.name && req.body.comment) {
            // utilize a helper function to generate a new comment
            const comment = {
                id: randomUUID(),
                name: req.body.name,
                comment: req.body.comment,
                likes: 0,
                timestamp: Date.now(),
            }

            const videos = await fetchData(DB)
            const videoIndex = videos.findIndex(
                (vid) => vid.id === req.params.id
            )
            videos[videoIndex].comments.push(comment)
            await writeData(DB, videos)

            res.json(comment)
        }
    } catch (e) {
        console.error(e)
    }
})

commentRouter.delete('/:commentId', async (req, res) => {
    try {
        const videos = await fetchData(DB)
        const videoIndex = videos.findIndex((vid) => vid.id === req.params.id)
        const commentIndex = videos[videoIndex].comments.findIndex(
            (comment) => comment.id === req.params.commentId
        )
        const comment = videos[videoIndex].comments[commentIndex]
        videos[videoIndex].comments.splice(commentIndex, 1)
        await writeData(DB, videos)

        res.json(comment)
    } catch (e) {
        console.error(e)
    }
})

export default commentRouter
