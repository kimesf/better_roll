import { get } from 'svelte/store'
import { proficiencyBonus } from './currentCharacter'
import characterRepository from './characterRepository'
import devCharacter from './devCharacter'
import { type Character, type Level } from '../types'

// TODO: dup
const createCharacter = () => devCharacter as Character

describe('#proficiencyBonus', () => {
    [
        { levels: [1, 2, 3, 4], expectation: 2 },
        { levels: [5, 6, 7, 8], expectation: 3 },
        { levels: [9, 10, 11, 12], expectation: 4 },
        { levels: [13, 14, 15, 16], expectation: 5 },
        { levels: [17, 18, 19, 20], expectation: 6 },
    ].forEach(({ levels, expectation }) => {
        levels.forEach((level) => {
            it(`equals ${expectation} for level ${level}`, () => {
                let char = createCharacter()
                char.level = level as Level
                characterRepository.select(char)

                expect(get(proficiencyBonus)).toEqual(expectation)
            })
        })
    })
})
