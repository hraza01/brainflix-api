import app from '#app/app.js'
import dotenv from 'dotenv'

dotenv.config()

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`)
})
