import { fetchData } from '#app/data/parser.js'
import { randomUUID } from 'crypto'

function createComment(name, value) {
    return {
        id: randomUUID(),
        name: name,
        comment: value,
        likes: 0,
        timestamp: Date.now(),
    }
}

function createVideo(title, desc, url = null) {
    return {
        id: randomUUID(),
        title: title,
        channel: 'BrainStation',
        image: url || 'https://i.imgur.com/ZYcodqt.jpg',
        description: desc,
        views: 0,
        likes: 0,
        duration: '00:20',
        video: 'https://firebasestorage.googleapis.com/v0/b/dice-game-c5749.appspot.com/o/BrainStation-Sample-Video.mp4?alt=media&token=1026254e-71a6-4145-9b3c-f5da7fa7b98c',
        timestamp: Date.now(),
        comments: [],
    }
}

async function findVideo(videoId) {
    const videos = await fetchData()
    const index = videos.findIndex((vid) => vid.id === videoId)
    const video = videos[index]

    return { index, video, videos }
}

async function findComment(videoId, commentId) {
    const videos = await fetchData()
    const index = videos.findIndex((vid) => vid.id === videoId)
    const commentIndex = videos[index].comments.findIndex(
        (comment) => comment.id === commentId
    )
    const comment = videos[index].comments[commentIndex]

    return { commentIndex, comment, index, videos }
}

export { createVideo, createComment, findVideo, findComment }
