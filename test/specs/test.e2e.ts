import { browser, $, expect } from '@wdio/globals'

describe('Nuxt Service', () => {
    it('should have started server', async () => {
        await browser.url('/')
        await expect(browser).toHaveTitle('Create Next App')
        await expect($('aria/Create Next App')).toBePresent()
    })

    it('loads TailwindCSS properly', async () => {
        await expect($('main')).toHaveStyle({ padding: '96px' })
    })
})
