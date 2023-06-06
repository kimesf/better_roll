import { describe, it, expect } from 'vitest'
import { get } from 'svelte/store'
import { character, type Character } from './character'
import devCharacter from './devCharacter'

const createCharacter = () => devCharacter as Character
const loadStoreValue = () => get(character)

describe('Character Store', () => {
    describe('#select', () => {
        it('changes current character', () => {
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

    describe('#proficiencyBonus', () => {
        [
            { levels: [1, 2, 3, 4],     expectation: 2 },
            { levels: [5, 6, 7, 8],     expectation: 3 },
            { levels: [9, 10, 11, 12],  expectation: 4 },
            { levels: [13, 14, 15, 16], expectation: 5 },
            { levels: [17, 18, 19, 20], expectation: 6 },
        ].forEach(({ levels, expectation }) => {
            levels.forEach(level => {
                it(`equals ${expectation} for level ${level}`, () => {
                    let char = createCharacter()
                    char.level = level
                    character.select(char)
                    expect(character.proficiencyBonus()).toEqual(expectation)
                })
            })
        })
    })
})
