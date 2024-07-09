import fs from 'node:fs/promises'
import path from 'node:path'

function hasAccess (p: string) {
    return fs.access(p).then(() => true, () => false)
}

const POSSIBLE_CONFIGS = ['next.config.js', 'next.config.mjs', 'next.config.cjs', 'next.config.ts']
export async function lookupNextConfig (dir: string): Promise<string | undefined> {
    for (const config of POSSIBLE_CONFIGS) {
        const nextConfig = path.join(dir, config)
        if (await hasAccess(nextConfig)) {
            return nextConfig
        }
    }

    const parentDir = path.dirname(dir)
    if (parentDir === dir) {
        return undefined
    }
    return lookupNextConfig(parentDir)
}
