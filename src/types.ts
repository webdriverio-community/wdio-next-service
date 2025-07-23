export interface NextServiceOptions {
    /**
     * root dir of the project
     * @default process.cwd()
     */
    rootDir?: string
    /**
     * hostname to start the server on
     * @default localhost
     */
    hostname?: string
    /**
     * port to start the server on (random port picked if none provided)
     * @default process.env.NUXT_PORT || config.devServer.port
     */
    port?: number
    /**
     * Whether to use the new turbopack  https://nextjs.org/docs/app/api-reference/turbopack incremental bundler
     * @default false
     */
    turbopack?: boolean
}
