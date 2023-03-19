import { join, resolve } from 'path'
import { readFile, writeFile } from 'fs/promises'

// console.log(filename)

async function fetchData() {
    const filename = resolve(join('src', 'data', 'videos.json'))
    const data = await readFile(filename)
    return JSON.parse(data)
}

async function writeData(object) {
    const filename = resolve(join('src', 'data', 'videos.json'))
    await writeFile(resolve(filename), JSON.stringify(object))
}

export { fetchData, writeData }
