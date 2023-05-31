import { describe, it, expect, afterAll, afterEach } from "vitest"
import { i18n } from "./i18n"
import { get } from "svelte/store"

const default_locale = i18n.current()
const loadStoreValue = () => get(i18n)

// TODO: mock translations for testing
describe("i18n store", () => {
  afterEach(() => i18n.change(default_locale))

  describe("#current", () => {
    it("returns current locale", () => {
      expect(i18n.current()).toEqual("ptbr")
    })
  })

  describe("#available", () => {
    it("lists all locales available", () => {
      expect(i18n.available()).toEqual(["ptbr", "en"])
    })
  })

  describe("#change", () => {
    it("change current locale", () => {
      expect(loadStoreValue()).toEqual("ptbr")

      i18n.change("en")

      expect(loadStoreValue()).toEqual("en")
    })

    it("does not change when given locale is not available", () => {
      expect(loadStoreValue()).toEqual("ptbr")

      i18n.change("inexistentLocale")

      expect(loadStoreValue()).toEqual("ptbr")
    })
  })

  describe("#t", () => {
    it("returns translation with given key", () => {
      expect(i18n.t("selection.title")).toEqual("Selecione seu personagem")
    })

    it("returns 'translation missing' when invalid key", () => {
      // @ts-expect-error
      expect(i18n.t("non.existent.key")).toEqual("Translation missing for 'non.existent.key'")
    })
  })
})


