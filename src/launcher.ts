import path from 'node:path'
import url from 'node:url'
import cp from 'node:child_process'

import logger from '@wdio/logger'
import getPort from 'get-port'
import type { NextServer } from 'next/dist/server/next.js'

import { pkg } from './constants.js'
import { lookupNextConfig } from './utils.js'
import type { NextServiceOptions } from './types.js'

const log = logger('wdio-next-service')

export class NuxtServiceLauncher {
    #options: Required<NextServiceOptions>
    #server?: NextServer

    constructor (options: NextServiceOptions) {
        log.info(`Initiate Next Service (v${pkg.version})`)
        this.#options = <Required<NextServiceOptions>>{
            rootDir: process.cwd(),
            dotenv: '.env',
            hostname: 'localhost',
            ...options
        }
    }

    public async onPrepare () {
        const isDev = process.env.NODE_ENV !== 'production'
        const nextjsConfigPath = await lookupNextConfig(this.#options.rootDir || process.cwd())
        if (!nextjsConfigPath) {
            throw new Error(
                'Could not find a Next.js project, please provide a `rootDir` option in the service configuration'
            )
        }

        const port = (
            this.#options.port
            || (process.env.NEXT_PORT ? parseInt(process.env.NEXT_PORT, 10) : undefined)
            || await getPort()
        )

        log.info(`Start Next.js dev server on ${this.#options.hostname}:${port}`)
        const startServerPath = import.meta.resolve('next/dist/server/lib/start-server.js')
        const child = cp.fork(url.fileURLToPath(startServerPath), {
            stdio: 'inherit',
            cwd: path.dirname(nextjsConfigPath),
            env: {
                ...process.env,
                WDIO_NEXT_SERVICE: '1',
                NEXT_PRIVATE_WORKER: '1'
            }
        })

        await new Promise<void>((resolve) => {
            let resolved = false
            const nextWorkerOptions = {
                port,
                dir: path.dirname(nextjsConfigPath),
                allowRetry: true,
                isDev
            }
            child.on('message', (msg: any) => {
                if (msg && typeof msg === 'object') {
                    if (msg.nextWorkerReady) {
                        child.send({ nextWorkerOptions })
                    } else if (msg.nextServerReady && !resolved) {
                        resolved = true
                        resolve()
                    }
                }
            })
            child.on('error', (err) => {
                log.error('Failed to start Next.js server', err)
            })
            child.on('exit', (code, signal) => {
                log.info(`Next.js dev server stopped with exit code ${code} and signal ${signal}`)
            })
        })

        process.env.WDIO_BASE_URL = `http://${this.#options.hostname}:${port}`
    }

    public async onComplete () {
        log.info('Stop Next.js dev server')
        if (this.#server) {
            await this.#server.close()
        }
    }
}
