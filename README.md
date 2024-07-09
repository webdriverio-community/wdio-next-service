<p align="center">
    <a href="https://webdriver.io/">
        <img alt="WebdriverIO loves Next.js" src="https://raw.githubusercontent.com/webdriverio-community/wdio-next-service/main/.github/assets/banner.png">
    </a>
</p>

# WDIO Next.js Service [![Tests](https://github.com/webdriverio-community/wdio-next-service/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/webdriverio-community/wdio-next-service/actions/workflows/test.yml)

This service helps you to launch your application when using [Next.js](https://nextjs.org/). It is a tiny wrapper around the `next dev` command that automatically starts the Next.js dev-server using your `next.conf.js` before launching the test.

## Installation

If you are getting started with WebdriverIO you can use the configuration wizard to set everything up:

```sh
npm init wdio@latest .
```

It will detect your project as a Next.js project and will install all necessary plugins for you. If you are adding this service to an existing setup, you can always install it via:

```bash
npm install wdio-next-service --save-dev
```

## Configuration

To enable the service, just add it to your `services` list in your `wdio.conf.js` file, e.g.:

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['next'],
    // ...
};
```

You can apply a service option by passing in an array with a config object, e.g.:

```js
// wdio.conf.js
export const config = {
    // ...
    services: [
        ['next', {
            rootDir: './packages/next-app'
        }]
    ],
    // ...
};
```

If you need custom Next.js configurations for your WebdriverIO tests you can use the `WDIO_NEXT_SERVICE` environment variable to modify your Next.js setup, e.g.:

```js title="next.config.mjs"
/** @type {import('next').NextConfig} */
const nextConfig = {};

if (process.env.WDIO_NEXT_SERVICE) {
    // add custom Next.js configuration for testing here
    // ...
}

export default nextConfig;
```

## Usage

If your config is set up accordingly, the service will set the [`baseUrl`](https://webdriver.io/docs/configuration#baseurl) option to point to your application. You can navigate to it via the [`url`](https://webdriver.io/docs/api/browser/url) command, e.g.:

```ts
await browser.url('/')
await expect(browser).toHaveTitle('Create Next App')
await expect($('aria/Create Next App')).toBePresent()
```

## Options

### `rootDir`

Root directory of the project.

Type: `string`<br />
Default: `process.cwd()`

### `hostname`

Hostname to start the server on.

Type: `string`<br />
Default: `localhost`

### `port`

Port to start the server on.

Type: `number`<br />
Default: `process.env.NUXT_PORT || config.devServer.port`

----

For more information on WebdriverIO see the [homepage](https://webdriver.io).
