import { describe, it, expect } from "vitest";
import translations from "./translations";

describe("translations", () => {
  it("all available have same keys", () => {
    const available = Object.keys(translations)
    const expectedKeys = Object.keys(translations[available[0]]).toString()

    const allLocationsHaveSameKeys = available.every((key) => {
      const thisLocaleKeys = Object.keys(translations[key]).toString()

      return thisLocaleKeys  === expectedKeys
    })

    expect(allLocationsHaveSameKeys).toBeTruthy()
  })
})
