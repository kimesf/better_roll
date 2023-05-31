import { describe, it, expect } from "vitest"
import { get } from "svelte/store"
import { selectedCharacter } from "./selectedCharacter"
import devCharacter from "./devCharacter"

const createCharacter = () => devCharacter
const loadStoreValue = () => get(selectedCharacter)

describe.concurrent("#select", () => {
  it("changes selected characters", async () => {
    const initialState = loadStoreValue()

    expect(initialState).toBe(null)

    let newState = createCharacter()
    newState.name = "Jake"
    selectedCharacter.select(newState)
    const finalState = loadStoreValue()

    expect(finalState).toBeTruthy()
    expect(finalState.name).toBe("Jake")
  })
})
