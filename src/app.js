import express from 'express'
import cors from 'cors'
import routes from '#routes'

const app = express()
app.use((req, res, next) => {
    console.log('->', req.method, req.url)
    next()
})

app.use(cors())
app.use(express.json())
app.use(express.static('src/public'))
app.use(routes)
export default app
