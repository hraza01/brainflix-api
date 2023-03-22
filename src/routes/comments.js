import { Router } from 'express'
import { createComment } from '#app/utils/helpers.js'
import {
    addComment,
    deleteComment,
    likeComment,
} from '#app/controllers/commentController.js'

// Params merging is required as this is a nested route
const commentRouter = Router({ mergeParams: true })

commentRouter
    .post('/', async (req, res) => {
        try {
            if (req.body.name && req.body.comment) {
                const comment = createComment(req.body.name, req.body.comment)
                await addComment(req.params.videoId, comment)
                res.json(comment)
            }
        } catch (e) {
            console.error(e)
        }
    })
    .delete('/:commentId', async (req, res) => {
        try {
            const comment = await deleteComment(
                req.params.videoId,
                req.params.commentId
            )
            res.json(comment)
        } catch (e) {
            console.error(e)
        }
    })
    .put('/:commentId/like', async (req, res) => {
        try {
            const comment = await likeComment(
                req.params.videoId,
                req.params.commentId
            )
            res.json(comment)
        } catch (e) {
            console.error(e)
        }
    })

export default commentRouter
