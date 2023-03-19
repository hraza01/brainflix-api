import { join, dirname } from 'path'
import { config } from 'dotenv'

config({ path: join(dirname(process.cwd()), '.env') })

const PORT = process.env.PORT
const DB = join(process.cwd(), 'data', 'videos.json')

export { PORT, DB }
