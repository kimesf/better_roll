import { loadConfigFromFile } from 'vite'
import i18n from './i18n'
import { get } from 'svelte/store'

vi.mock('../../../config/locales', () => {
    const locales = {
        ptbr: {
            hi: 'hey',
            welcome: 'welcome {{name}}',
        },
        other: {},
    }

    return { default: locales }
})

const default_locale = i18n.current()
const loadStoreValue = () => get(i18n)

describe('i18n store', () => {
    afterEach(() => i18n.change(default_locale))

    it('default is ptbr', () => {
        expect(loadStoreValue()).toEqual('ptbr')
    })

    describe('#current', () => {
        it('returns current locale', () => {
            expect(i18n.current()).toEqual(loadStoreValue())
        })
    })

    describe('#available', () => {
        it('lists all locales available', () => {
            expect(i18n.available()).toEqual(['ptbr', 'other'])
        })
    })

    describe('#change', () => {
        it('change current locale', () => {
            expect(loadStoreValue()).toEqual('ptbr')

            // @ts-expect-error
            i18n.change('other')

            expect(loadStoreValue()).toEqual('other')
        })

        it('does not change when given locale is not available', () => {
            expect(loadStoreValue()).toEqual('ptbr')

            // @ts-expect-error
            i18n.change('inexistentLocale')

            expect(loadStoreValue()).toEqual('ptbr')
        })
    })

    describe('#t', () => {
        it('returns translation with given key', () => {
            // @ts-expect-error
            expect(i18n.t('hi')).toEqual('hey')
        })

        it('returns translation with given key and options', () => {
            // @ts-expect-error
            expect(i18n.t('welcome', { name: 'Joe' })).toEqual('welcome Joe')
        })

        it("returns 'translation missing' when invalid key", () => {
            // @ts-expect-error
            expect(i18n.t('non.existent.key')).toEqual("Translation missing for 'non.existent.key'")
        })
    })
})
