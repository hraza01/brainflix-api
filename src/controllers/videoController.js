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
    const { index, videos } = await findVideo(videoId)
    videos[index].likes++
    await writeData(videos)

    return videos[index]
}

async function viewVideo(videoId) {
    const { index, videos } = await findVideo(videoId)
    videos[index].views++
    await writeData(videos)

    return videos[index]
}

export { summarizeVideos, addVideo, likeVideo, viewVideo }
