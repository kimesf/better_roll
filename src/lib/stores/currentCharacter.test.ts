import { charactersMock, setCurrent } from '../../../tests/utils/mockCharacters'
import { get } from 'svelte/store'
import { attributesModifiers, proficiencyBonus, skillsGroupedByAttribute } from './currentCharacter'

vi.mock('./characterRepository', () => charactersMock)

describe('$proficiencyBonus', () => {
    ;[
        { levels: [1, 2, 3, 4], expectation: 2 },
        { levels: [5, 6, 7, 8], expectation: 3 },
        { levels: [9, 10, 11, 12], expectation: 4 },
        { levels: [13, 14, 15, 16], expectation: 5 },
        { levels: [17, 18, 19, 20], expectation: 6 },
    ].forEach(({ levels, expectation }) => {
        levels.forEach((level) => {
            it(`equals ${expectation} for level ${level}`, () => {
                setCurrent({ level })

                expect(get(proficiencyBonus)).toEqual(expectation)
            })
        })
    })
})

describe('$skillsGroupedByAttribute', () => {
    it('groups skills by attribute', () => {
        const skills = [
            { name: 'magic', attribute: 'dreaming' },
            { name: 'paiting', attribute: 'training' },
        ]

        setCurrent({ skills })

        expect(get(skillsGroupedByAttribute)).toEqual({
            dreaming: [{ name: 'magic', attribute: 'dreaming' }],
            training: [{ name: 'paiting', attribute: 'training' }],
        })
    })
})

describe ('$attributesModifiers', () => {
    it('calculates attributes modifiers', () => {
        const attributes = {
            str: 4,
            dex: 7,
            con: 10,
            int: 11,
            wis: 14,
            cha: 23,
        }

        setCurrent({ attributes })

        expect(get(attributesModifiers)).toEqual({
            str: -3,
            dex: -2,
            con: 0,
            int: 0,
            wis: 2,
            cha: 6,
        })
    })
})
