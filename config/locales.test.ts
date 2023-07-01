import { debug } from 'svelte/internal'
import locales from './locales'

describe('locales', () => {
    it('all available have same keys', () => {
        const available = Object.keys(locales)
        const expectedKeys = Object.keys(locales[available[0]]).toString()

        available.forEach((locale) => {
            const thisLocaleKeys = Object.keys(locales[locale]).toString()

            expect(thisLocaleKeys).toEqual(expectedKeys)
        })
    })
})
