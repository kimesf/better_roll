import { get } from 'svelte/store'
import { proficiencyBonus, skillsGroupedByAttribute } from './currentCharacter'

const mockStore = await vi.hoisted(async () => {
    const { writable } = await vi.importActual<typeof import('svelte/store')>('svelte/store')

    return writable({ current: {}})
})

vi.mock('./characterRepository', () => ({ default: mockStore }))

const setCharacter = (hash) => {
    mockStore.set({ current: hash })
}

describe('$proficiencyBonus', () => {
    [
        { levels: [1, 2, 3, 4], expectation: 2 },
        { levels: [5, 6, 7, 8], expectation: 3 },
        { levels: [9, 10, 11, 12], expectation: 4 },
        { levels: [13, 14, 15, 16], expectation: 5 },
        { levels: [17, 18, 19, 20], expectation: 6 },
    ].forEach(({ levels, expectation }) => {
        levels.forEach((level) => {
            it(`equals ${expectation} for level ${level}`, () => {
                setCharacter({ level })

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

        setCharacter({ skills })

        expect(get(skillsGroupedByAttribute)).toEqual({
            dreaming: [
                { name: 'magic', attribute: 'dreaming' },
            ],
            training: [
                { name: 'paiting', attribute: 'training' },
            ]
        })
    })
})
