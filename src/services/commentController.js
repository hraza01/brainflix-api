import { writeData } from '#app/data/parser.js'
import { findComment, findVideo } from '#app/utils/helpers.js'

async function addComment(videoId, comment) {
    const { index, videos } = await findVideo(videoId)
    videos[index]?.comments.push(comment)

    await writeData(videos)
}

async function deleteComment(videoId, commentId) {
    const { index, videos } = await findVideo(videoId)
    const { commentIndex, comment } = await findComment(videoId, commentId)

    videos[index].comments.splice(commentIndex, 1)
    await writeData(videos)

    return comment
}

async function likeComment(videoId, commentId) {
    const { index, videos } = await findVideo(videoId)
    const { commentIndex } = await findComment(videoId, commentId)

    videos[index].comments[commentIndex].likes++
    await writeData(videos)

    return videos[index].comments[commentIndex]
}

export { addComment, deleteComment, likeComment }
