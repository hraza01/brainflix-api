import { readFile, writeFile } from 'fs/promises';

async function fetchData(file) {
    const data = await readFile(file, 'utf-8');
    return JSON.parse(data);
}

async function writeData(file, object) {
    await writeFile(file, JSON.stringify(object));
}

export { fetchData, writeData };
