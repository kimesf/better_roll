import { writable, get, type Readable, type Writable } from "svelte/store"
import translations from "./translations"

const DEFAULT_LOCALE = "ptbr"
const missingTranslationFor = (key: string): string => `Translation missing for '${key}'`

type Translations = keyof typeof translations.ptbr
type Available = keyof typeof translations

interface I18nStore extends Readable<string> {
  current: () => string,
  available: () => string[],
  change: (availableLocale: Available) => void,
  t: (key: Translations, options?: any) => string
}

const initStore = (): I18nStore => {
  const locale = writable(DEFAULT_LOCALE)
  const { subscribe, set } = locale
  const current: I18nStore["current"] = () => get(locale)
  const available: I18nStore["available"] = () => Object.keys(translations)

  const change: I18nStore["change"] = (availableLocale) => {
    if(!available().includes(availableLocale)) return

    set(availableLocale)
  }

  const getTranslation: I18nStore["t"] = (key, options) => {
    let translation = translations[current()][key] || missingTranslationFor(key)

    options && Object.keys(options).map((k) => {
      const regex = new RegExp(`{{${k}}}`, "g");

      translation = translation.replace(regex, options[k]);
    })

    return translation
  }

  return {
    subscribe,
    available,
    change,
    current,
    t: getTranslation
  }
}

export const i18n = initStore()
