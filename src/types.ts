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
}
