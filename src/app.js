import express from 'express'
import cors from 'cors'
import routes from '#routes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('files'))
app.use(routes)

export default app
