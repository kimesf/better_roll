import { writable, get, type Readable, type Writable } from 'svelte/store'
import translations from './translations'

const DEFAULT_LOCALE = 'ptbr'
const missingTranslationFor = (key: string): string => `Translation missing for '${key}'`

type Translations = keyof typeof translations.ptbr
type Available = keyof typeof translations

interface I18nStore extends Readable<string> {
    current: () => Available
    available: () => string[]
    change: (availableLocale: Available) => void
    t: (key: Translations, options?: { [key: string]: string }) => string
}

const initStore = (): I18nStore => {
    const locale: Writable<Available> = writable(DEFAULT_LOCALE)
    const { subscribe, set } = locale
    const current: I18nStore['current'] = () => get(locale)
    const available: I18nStore['available'] = () => Object.keys(translations)

    const change: I18nStore['change'] = (availableLocale) => {
        if (!available().includes(availableLocale)) return

        set(availableLocale)
    }

    const getTranslation: I18nStore['t'] = (key, options): string => {
        let translation = translations[current()][key] || missingTranslationFor(key)

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

// TODO: export default
export const i18n = initStore()
