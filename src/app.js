import express from 'express'
import cors from 'cors'
import routes from '#routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('files'))

// You can send a response right here and *not* call next() if you don't want to proceed.
// app.use((req, res, next) => {
//     if (
//         req.method === 'POST' &&
//         req.headers['content-type'] !== 'application/json'
//     ) {
//         return res.status(400);
//     }
//
//     next();
// });
app.use(routes)

export default app
