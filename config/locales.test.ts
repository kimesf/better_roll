import locales from './locales'

describe('locales', () => {
    it('all available have same keys', () => {
        const available = Object.keys(locales)
        const expectedKeys = Object.keys(locales[available[0]]).toString()

        const allLocationsHaveSameKeys = available.every((key) => {
            const thisLocaleKeys = Object.keys(locales[key]).toString()

            return thisLocaleKeys === expectedKeys
        })

        expect(allLocationsHaveSameKeys).toBeTruthy()
    })
})
