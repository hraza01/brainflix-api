import app from '#app/app.js'
import { PORT } from '#app/config.js'

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
