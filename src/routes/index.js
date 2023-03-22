import { Router } from 'express'
import videos from '#app/routes/videos.js'
import comments from '#app/routes/comments.js'
import stream from '#app/routes/stream.js'
import { findVideo, findComment } from '#app/utils/helpers.js'

const routes = Router()

async function verifyVideoToken(_req, _res, next) {
    const { video } = await findVideo(_req.params.videoId)

    if (!video) {
        _res.status(404).send('Invalid video token')
    } else {
        next()
    }
}

async function verifyCommentToken(_req, _res, next) {
    const { video } = await findVideo(_req.params.videoId)
    const { comment } = await findComment(
        _req.params.videoId,
        _req.params.commentId
    )

    if (!video || !comment) {
        _res.status(404).send('Invalid video and/or comment token')
    } else {
        next()
    }
}
// filtering requests with bad tokens
routes.use('/videos/:videoId', verifyVideoToken)
routes.use('/videos/:videoId/comments', verifyVideoToken)
routes.use('/videos/:videoId/comments/:commentId', verifyCommentToken)

// All possible routes are listed here
routes.use('/videos', videos)
routes.use('/videos/:videoId/comments', comments)
routes.use('/stream', stream)

export default routes
