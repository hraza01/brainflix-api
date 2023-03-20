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

function createVideo(title, desc) {
    return {
        id: randomUUID(),
        title: title,
        channel: 'BrainStation',
        image: 'https://i.imgur.com/l2Xfgpl.jpg',
        description: desc,
        views: 0,
        likes: 0,
        duration: '4:01',
        video: 'https://project-2-api.herokuapp.com/stream',
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
