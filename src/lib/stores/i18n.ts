import { writable, get, type Readable, type Writable } from 'svelte/store'
import locales from '../../../config/locales'

const DEFAULT_LOCALE = 'ptbr'

type locales = keyof typeof locales.ptbr
type Available = keyof typeof locales

const missingTranslationFor = (key: string): string => {
    return `Translation missing for '${key}'`
}

interface I18nStore extends Readable<string> {
    current: () => Available
    available: () => string[]
    change: (availableLocale: Available) => void
    t: (key: locales, options?: { [key: string]: string }) => string
}

const initStore = (): I18nStore => {
    const locale: Writable<Available> = writable(DEFAULT_LOCALE)
    const { subscribe, set } = locale

    const current: I18nStore['current'] = () => {
        return get(locale)
    }

    const available: I18nStore['available'] = () => {
        return Object.keys(locales)
    }

    const change: I18nStore['change'] = (availableLocale) => {
        if (!available().includes(availableLocale)) return

        set(availableLocale)
    }

    const getTranslation: I18nStore['t'] = (key, options) => {
        let translation = locales[current()][key] || missingTranslationFor(key)

        options &&
            Object.keys(options).map((k) => {
                const regex = new RegExp(`{{${k}}}`, 'g')

                translation = translation.replace(regex, options[k])
            })

        return translation
    }

    return {
        subscribe,
        available,
        change,
        current,
        t: getTranslation,
    }
}

const store = initStore()
const { t } = store

export default store
export { t }
