import fs from 'node:fs'
import url from 'node:url'
import path from 'node:path'

const dirname = url.fileURLToPath(new URL('.', import.meta.url))
const packageJSONContent = fs.readFileSync(path.resolve(dirname, '..', 'package.json')).toString()
export const pkg = JSON.parse(packageJSONContent)
export const PHASE = 'phase-development-server'
