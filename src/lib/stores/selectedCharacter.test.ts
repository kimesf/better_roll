import { describe, it, expect } from 'vitest'
import { get } from 'svelte/store'
import { selectedCharacter } from './selectedCharacter'
import devCharacter from './devCharacter'

const createCharacter = () => devCharacter
const loadStoreValue = () => get(selectedCharacter)

describe.concurrent('Selected Character Store', () => {
    it('#select changes selected characters', async () => {
        const initialState = loadStoreValue()

        expect(initialState).toBe(null)

        const newState = createCharacter()
        newState.name = 'Jake'
        selectedCharacter.select(newState)
        const finalState = loadStoreValue()

        expect(finalState).toBeTruthy()
        expect(finalState.name).toBe('Jake')
    })
})
