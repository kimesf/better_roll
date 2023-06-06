import { describe, it, expect } from 'vitest'
import { get } from 'svelte/store'
import { character, type Character } from './character'
import devCharacter from './devCharacter'

const createCharacter = () => devCharacter as Character
const loadStoreValue = () => get(character)

describe.concurrent('Character Store', () => {
    it('#select changes current character', async () => {
        const initialState = loadStoreValue()
        expect(initialState.current).toBe(null)

        const newCharacter = createCharacter()
        newCharacter.name = 'Jake'
        character.select(newCharacter)

        const finalState = loadStoreValue()
        expect(finalState).toBeTruthy()
        expect(finalState.current.name).toBe('Jake')
    })
})
