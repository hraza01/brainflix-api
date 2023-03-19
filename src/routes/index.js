import express from 'express'
import videosRoute from './videos.js'
import commentRoute from './comments.js'

const routes = express.Router()

// All possible routes are listed here
routes.use('/videos', videosRoute)
routes.use('/videos/:id/comments', commentRoute)

export default routes
