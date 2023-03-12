const { readFile, writeFile } = require('fs').promises;

async function jsonReader(file) {
    const data = await readFile(file, 'utf-8');
    return JSON.parse(data);
}

async function jsonWriter(file, object) {
    await writeFile(file, JSON.stringify(object));
}

module.exports = {
    jsonReader,
    jsonWriter,
};
