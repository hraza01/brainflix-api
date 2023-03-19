import { findVideo } from '#app/utils/helpers.js'
import { fetchData, writeData } from '#app/data/parser.js'

async function summarizeVideos() {
    const videos = await fetchData()

    return videos.map(({ id, title, channel, image }) => {
        return { id, title, channel, image }
    })
}
async function addVideo(video) {
    const videos = await fetchData()
    videos.push(video)
    await writeData(videos)
}

async function likeVideo(videoId) {
    const videos = await fetchData()
    const { index } = await findVideo(videoId)

    if (!index) {
        throw ReferenceError(`video ${videoId} not found`)
    }

    videos[index].likes++
    await writeData(videos)

    return videos[index]
}

async function viewVideo(videoId) {
    const videos = await fetchData()
    const { index } = await findVideo(videoId)

    if (!index) {
        throw ReferenceError(`video ${videoId} not found`)
    }

    videos[index].views++
    await writeData(videos)

    return videos[index]
}

export { summarizeVideos, addVideo, likeVideo, viewVideo }
