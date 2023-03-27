import { Router } from 'express'
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '#app/services/firebase.js'

const streamRouter = Router()

streamRouter.get('/', async (req, res) => {
    const video = ref(storage, 'BrainStation-Sample-Video.mp4')
    const url = await getDownloadURL(video)
    res.redirect(url)
})

export default streamRouter
