import { Router } from 'express'

const streamRouter = Router()

streamRouter.get('/', async (req, res) => {
    const url = new URL(
        'https://firebasestorage.googleapis.com/v0/b/dice-game-c5749.appspot.com/o/BrainStation-Sample-Video.mp4?alt=media&token=1026254e-71a6-4145-9b3c-f5da7fa7b98c'
    )
    res.redirect(url)
})

export default streamRouter
